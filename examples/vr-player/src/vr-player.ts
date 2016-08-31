import {Component, OnInit, ElementRef} from "@angular/core";
import {VgFullscreenAPI} from "videogular2/core";

@Component({
    selector: 'vr-player',
    templateUrl: 'src/vr-player.html'
})
export class VRPlayer implements OnInit {
    elem:any;
    aframe:any;
    videoUrls:Array<string> = [
        'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/',
        'http://static.videogular.com/assets/videos/vr-demo.mp4'
    ];
    videoUrl:string;
    spinning:boolean;

    constructor(ref:ElementRef) {
        this.elem = ref.nativeElement;
        this.videoUrl = this.videoUrls[0];
        this.spinning = false;
    }

    ngOnInit() {
        this.aframe = this.elem.querySelector('a-scene');
        VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    }

    onChangeFullscreen(fsState) {
        if (fsState) {
            this.aframe.setStereoRenderer();
            this.aframe.addState('vr-mode');
        }
    }

    onMouseEnter($event) {
        if(!this.spinning) {
            this.spinning = true;
            document.querySelector('#infoImage')['emit']('startSpinning');
            setTimeout( () => {
                this.videoUrl = this.videoUrls.reverse()[0]
                this.spinning = false;
            }, 1250 );
        }
    }
}
