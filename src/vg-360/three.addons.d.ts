declare namespace THREE {
    export class CardboardEffect {
        constructor(renderer: WebGLRenderer);
    }

    export class OrbitControls {
        constructor(camera: PerspectiveCamera, element: any);
    }

    export class DeviceOrientationControls {
        constructor(camera: PerspectiveCamera, element: any);
    }

    export class CSS3DObject {
        position:any;
        rotation:any;
        scale:any;

        constructor(element: any);
    }

    export class CSS3DRenderer {
        domElement:any;

        constructor();
        setSize(w:number, h:number);
        render(scene:THREE.Scene, camera:THREE.PerspectiveCamera);
    }
}
