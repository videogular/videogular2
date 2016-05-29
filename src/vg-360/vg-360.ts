import {Component, ElementRef, OnInit, Input, Output, EventEmitter} from "angular2/core";
import {VgAPI} from "../services/vg-api";
import {VgUtils} from "../services/vg-utils";
import Object3D = THREE.Object3D;
import {IHotSpot} from "./i-hot-spot";

@Component({
    selector: 'vg-360',
    template: `
        <div id="container">
            <span class="left-pointer" [style.display]="(pointer) ? 'inherit' : 'none'" [class.vr]="vr"></span>
            <span class="right-pointer" [style.display]="(pointer && vr) ? 'inherit' : 'none'"></span>
            <div id="css-container"></div>
        </div>
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            display: flex;
            align-items: center;
        }

        #container {
            width: 100%;
            height: auto;
        }
        
        #css-container {
            position: absolute;
        }
        
        .left-pointer {
            width: 6px;
            height: 6px;
            position: absolute;
            display: block;
            top: calc(50% - 3px);
            left: calc(50% - 3px);
            background-color: #FFFFFF;
            opacity: 0.5;
            z-index: 1;
            
            border-radius: 3px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
        }
        
        .left-pointer.vr {
            left: calc(25% - 3px);
        }
        
        .right-pointer {
            width: 6px;
            height: 6px;
            position: absolute;
            display: block;
            top: calc(50% - 3px);
            left: calc(75% - 3px);
            background-color: #FFFFFF;
            opacity: 0.5;
            z-index: 1;
            
            border-radius: 3px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
        }
    `]
})
export class Vg360 implements OnInit {
    elem:HTMLElement;
    api:VgAPI;

    raycaster:THREE.Raycaster;
    camera:THREE.PerspectiveCamera;
    scene:THREE.Scene;
    leftScene:THREE.Scene;
    rightScene:THREE.Scene;
    renderer:THREE.WebGLRenderer;
    leftRenderer:THREE.CSS3DRenderer;
    rightRenderer:THREE.CSS3DRenderer;
    container:any;
    cssContainer:any;
    controls:any;
    effect:any;
    intersected:any;
    objects:Array<any> = [];

    onPointerDownPointerX:number = 0;
    onPointerDownPointerY:number = 0;
    onPointerDownLon:number = 0;
    onPointerDownLat:number = 0;
    lat:number = 0;
    lon:number = 0;
    phi:number = 0;
    theta:number = 0;
    distance:number = 500;

    renderWidth:number = 1;
    renderHeight:number = 1;

    isUserInteracting:boolean = false;

    @Input('vr') vr:boolean = false;
    @Input('media') media:any = false;
    @Input('pointer') pointer:boolean = false;
    @Input('hotSpots') hotSpots:Array<IHotSpot>;

    @Output() onEnterHotSpot:EventEmitter<IHotSpot> = new EventEmitter();
    @Output() onLeaveHotSpot:EventEmitter<IHotSpot> = new EventEmitter();

    constructor(ref:ElementRef, api:VgAPI) {
        this.api = api;
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.createContainer();
        this.createScene();
        this.createHotSpots();
        this.createControls();
        this.createVR();

        this.animate();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    createContainer() {
        this.container = this.elem.querySelector('#container');
        this.cssContainer = this.elem.querySelector('#css-container');
        this.media.onloadedmetadata = this.onLoadMetadata.bind(this);
        this.media.parentElement.removeChild(this.media);
    }

    createScene() {
        var texture:THREE.VideoTexture = new THREE.VideoTexture(this.media);
        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        var material:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: texture});

        this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 1, 1100);

        this.scene = new THREE.Scene();

        var mesh:THREE.Mesh = new THREE.Mesh(geometry, material);

        this.scene.add(mesh);

        this.renderer = new THREE.WebGLRenderer({alpha:true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.renderWidth, this.renderHeight);

        this.container.appendChild(this.renderer.domElement);
    }

    createHotSpots() {
        if (this.hotSpots) {
            var objMaterial:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});

            this.raycaster = new THREE.Raycaster();

            this.leftScene = new THREE.Scene();
            this.rightScene = new THREE.Scene();

            for (var i=0, l=this.hotSpots.length; i<l; i++) {
                var item = this.createCSS3DObject(this.hotSpots[i], true);

                if (this.vr) {
                    this.rightScene.add(this.createCSS3DObject(this.hotSpots[i], true));
                }

                this.leftScene.add(this.createCSS3DObject(this.hotSpots[i]));

                var objGeo = new THREE.PlaneGeometry(100, 100);
                var objMesh:THREE.Mesh = new THREE.Mesh(objGeo, objMaterial);
                objMesh.position.copy(item.position);
                objMesh.rotation.copy(item.rotation);
                objMesh.scale.copy(item.scale);
                (<any>objMesh).hotSpot = this.hotSpots[i];
                this.scene.add(objMesh);

                this.objects.push(objMesh);
            }

            this.leftRenderer = new THREE.CSS3DRenderer();
            this.leftRenderer.setSize(this.renderWidth, this.renderHeight);
            this.leftRenderer.domElement.style.position = 'absolute';
            this.leftRenderer.domElement.style.top = 0;
            this.leftRenderer.domElement.style.pointerEvents = 'none';

            this.cssContainer.appendChild(this.leftRenderer.domElement);

            if (this.vr) {
                this.rightRenderer = new THREE.CSS3DRenderer();
                this.rightRenderer.setSize(this.renderWidth, this.renderHeight);
                this.rightRenderer.domElement.style.position = 'absolute';
                this.rightRenderer.domElement.style.top = 0;
                this.rightRenderer.domElement.style.left = this.renderWidth / 2 + 'px';
                this.rightRenderer.domElement.style.pointerEvents = 'none';

                this.cssContainer.appendChild(this.rightRenderer.domElement);
            }
        }
    }

    createCSS3DObject(hs:IHotSpot, clone:boolean = false):Object3D {
        var obj:THREE.CSS3DObject;

        if (clone) {
            if (hs.elementClone) {
                obj = new THREE.CSS3DObject(hs.elementClone);
            }
            else {
                obj = new THREE.CSS3DObject(hs.element.cloneNode(true));
            }
        }
        else {
            obj = new THREE.CSS3DObject(hs.element);
        }

        obj.position.set(
            hs.position.x,
            hs.position.y,
            hs.position.z
        );
        obj.rotation.x = hs.rotation.x;
        obj.rotation.y = hs.rotation.y;
        obj.rotation.z = hs.rotation.z;

        return <Object3D>obj;
    }

    createControls() {
        if (VgUtils.isMobileDevice()) {
            this.controls = new THREE.DeviceOrientationControls(this.camera, true);
            this.controls.update();
        }
        else {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.target.set(
                this.camera.position.x + 1,
                this.camera.position.y,
                this.camera.position.z
            );

            this.camera.lookAt(new THREE.Vector3(0,180,0));

            this.controls.enableZoom = false;
        }
    }

    createVR() {
        if (this.vr) {
            this.effect = new THREE.CardboardEffect(this.renderer);
            this.effect.setSize(this.renderWidth, this.renderHeight);
        }
    }

    onLoadMetadata() {
        this.scaleRender();
    }

    scaleRender() {
        var scaleRatio:number = this.api.videogularElement.clientWidth / this.media.videoWidth;

        this.renderWidth = this.api.videogularElement.clientWidth;
        this.renderHeight = this.media.videoHeight * scaleRatio;

        this.renderer.setSize(this.renderWidth, this.renderHeight);

        if (this.hotSpots) {
            let w:number = this.renderWidth;

            if (this.vr) {
                w = this.renderWidth / 2;

                this.rightRenderer.setSize(w, this.renderHeight);
                this.rightRenderer.domElement.style.left = this.renderWidth / 2 + 'px';
            }

            this.leftRenderer.setSize(w, this.renderHeight);
        }

        if (this.vr) this.effect.setSize(this.renderWidth, this.renderHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.controls.update();

        this.renderer.render(this.scene, this.camera);

        if (this.hotSpots) {
            this.leftRenderer.render(this.leftScene, this.camera);
            if (this.vr) this.rightRenderer.render(this.rightScene, this.camera);

            this.raycaster.setFromCamera(
                {
                    x: 0,
                    y: 0
                },
                this.camera
            );

            let intersections = this.raycaster.intersectObjects(this.objects);
            
            if (intersections.length) {
                if (this.intersected != intersections[0].object) {
                    this.intersected = intersections[0].object;
                    this.onEnterHotSpot.next(<IHotSpot>((<any>intersections[0].object).hotSpot));
                }
            }
            else {
                if (this.intersected) this.onLeaveHotSpot.next(<IHotSpot>(this.intersected.hotSpot));
                this.intersected = null;
            }
        }

        if (this.vr) this.effect.render(this.scene, this.camera);
    }

    onResize() {
        this.scaleRender();
    }
}
