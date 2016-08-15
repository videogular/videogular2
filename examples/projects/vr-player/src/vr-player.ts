import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component, OnInit, ElementRef} from "@angular/core";
import {VgPlayer, VgMedia, IHotSpot, VgAPI, VgFullscreenAPI} from "videogular2/core";
import {
    VgControls,
    VgTimeDisplay,
    VgPlayPause,
    VgPlaybackButton,
    VgScrubBar,
    VgScrubBarCurrentTime,
    VgScrubBarBufferingTime,
    VgMute,
    VgFullscreen
} from "videogular2/controls";
import {VgOverlayPlay} from "videogular2/overlay-play";

@Component({
    selector: 'vr-player',
    templateUrl: 'src/vr-player.html',
    styles: [`
        vg-player { height: 350px; }
    `],
    providers: [VgAPI],
    directives: [
        VgPlayer,
        VgMedia,
        VgOverlayPlay,
        VgControls,
        VgTimeDisplay,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarCurrentTime,
        VgScrubBarBufferingTime,
        VgMute,
        VgFullscreen
    ]
})
export class VRPlayer implements OnInit {
    elem:any;
    aframe:any;
    dialog:any;
    progress:any;
    color:number = 34034;
    lastTime:number = 0;
    hexColor:string = '#0084f2';

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


bootstrap(VRPlayer, []);
