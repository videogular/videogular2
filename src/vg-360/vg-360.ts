///<reference path='../../node_modules/angular2/typings/browser.d.ts'/>
///<reference path='../../typings/browser/ambient/three/index.d.ts'/>
///<reference path='three.addons.d.ts'/>

import {Component, ElementRef, OnInit, Input} from "angular2/core";
import {VgAPI} from "../services/vg-api";
import {VgUtils} from "../services/vg-utils";
import Object3D = THREE.Object3D;
import {IHotSpot} from "./i-hot-spot";

@Component({
    selector: 'vg-360',
    template: `
        <div id='container'></div>
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            display: flex;
            align-items: center;
        }

        :host #container {
            width: 100%;
            height: auto;
        }
    `]
})
export class Vg360 implements OnInit {
    elem:HTMLElement;
    video:any;
    api:VgAPI;

    camera:THREE.PerspectiveCamera;
    scene:THREE.Scene;
    hotSpotsScene:THREE.Scene;
    renderer:THREE.WebGLRenderer;
    hotSpotRenderer:THREE.CSS3DRenderer;
    controls:any;
    effect:any;

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
    @Input('hotSpots') hotSpots:Array<IHotSpot>;

    constructor(ref:ElementRef, api:VgAPI) {
        this.api = api;
        this.elem = ref.nativeElement;
    }

    ngOnInit() {

        var container = this.elem.querySelector('#container');
        this.video = this.elem.querySelector('video');
        this.video.onloadedmetadata = this.onLoadMetadata.bind(this);
        this.elem.removeChild(this.video);

        var texture:THREE.VideoTexture = new THREE.VideoTexture(this.video);
        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        var material:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: texture});
        var objMaterial:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide});

        this.camera = new THREE.PerspectiveCamera(75, 640 / 360, 1, 1100);

        // Seems that .target property is not available on three.d.ts
        (<any>this.camera).target = new THREE.Vector3(0, 0, 0);

        this.scene = new THREE.Scene();
        this.hotSpotsScene = new THREE.Scene();

        var mesh:THREE.Mesh = new THREE.Mesh(geometry, material);

        if (this.hotSpots) {
            for (var i=0, l=this.hotSpots.length; i<l; i++) {
                var obj:THREE.CSS3DObject = new THREE.CSS3DObject(this.hotSpots[i]);
                obj.position.set(
                    this.hotSpots[i].position.x,
                    this.hotSpots[i].position.y,
                    this.hotSpots[i].position.z
                );
                obj.rotation.x = this.hotSpots[i].rotation.x;
                obj.rotation.y = this.hotSpots[i].rotation.y;
                obj.rotation.z = this.hotSpots[i].rotation.z;

                this.hotSpotsScene.add(<Object3D>obj);

                var objGeo = new THREE.PlaneGeometry(100, 100);
                var objMesh:THREE.Mesh = new THREE.Mesh(objGeo, objMaterial);
                objMesh.position.copy(obj.position);
                objMesh.rotation.copy(obj.rotation);
                objMesh.scale.copy(obj.scale);
                this.scene.add(objMesh);
            }

            this.hotSpotRenderer = new THREE.CSS3DRenderer();
            this.hotSpotRenderer.setSize(this.renderWidth, this.renderHeight);
            this.hotSpotRenderer.domElement.style.position = 'absolute';
            this.hotSpotRenderer.domElement.style.top = 0;
            container.appendChild(this.hotSpotRenderer.domElement);
        }

        this.scene.add(mesh);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.renderWidth, this.renderHeight);

        container.appendChild(this.renderer.domElement);

        if (VgUtils.isMobileDevice()) {
            this.controls = new THREE.DeviceOrientationControls(this.camera, true);
            this.controls.update();
        }
        else {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.target.set(
                this.camera.position.x + 15,
                this.camera.position.y,
                this.camera.position.z
            );
            this.controls.enableZoom = false;
        }

        if (this.vr) {
            this.effect = new THREE.CardboardEffect(this.renderer);
            this.effect.setSize(this.renderWidth, this.renderHeight);
        }

        this.animate();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    onLoadMetadata() {
        this.scaleRender();
    }

    scaleRender() {
        var scaleRatio:number = this.api.videogularElement.clientWidth / this.video.videoWidth;

        this.renderWidth = this.api.videogularElement.clientWidth;
        this.renderHeight = this.video.videoHeight * scaleRatio;

        this.renderer.setSize(this.renderWidth, this.renderHeight);

        if (this.vr) this.effect.setSize(this.renderWidth, this.renderHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.controls.update();

        this.renderer.render(this.scene, this.camera);
        if (this.hotSpots) this.hotSpotRenderer.render(this.hotSpotsScene, this.camera);

        if (this.vr) this.effect.render(this.scene, this.camera);
    }

    onResize() {
        this.scaleRender();
    }
}
