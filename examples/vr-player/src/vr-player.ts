import {Component, OnInit, ElementRef} from "@angular/core";
import {VgFullscreenAPI} from "videogular2/core";

@Component({
    selector: 'vr-player',
    templateUrl: 'src/vr-player.html'
})
export class VRPlayer implements OnInit {
    elem:any;
    aframe:any;
    dialog:any;
    progress:any;
    color:number = 34034;
    lastTime:number = 0;
    hexColor:string = '#0084f2';
    videoUrl:string = 'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/';

    constructor(ref:ElementRef) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.dialog = this.elem.querySelector('.info-dialog');
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
        this.progress = requestAnimationFrame(currentTime => this.onProgress(currentTime, $event));
    }

    onProgress(currentTime, $event) {
        if (!this.lastTime) this.lastTime = currentTime;

        let elapsedTime:number = currentTime - this.lastTime;


        if (elapsedTime > 3000) {
            cancelAnimationFrame(this.progress.data.handleId);
            this.lastTime = 0;
        }
        else {
            let hexNum = Number(this.color).toString(16);

            this.progress = requestAnimationFrame(currentTime => this.onProgress(currentTime, $event));
            this.color += 1;
            this.hexColor = '#' + Array(6 - hexNum.length + 1).join('0') + hexNum;
            $event.target.setAttribute('color', this.hexColor);
        }
    }
}
