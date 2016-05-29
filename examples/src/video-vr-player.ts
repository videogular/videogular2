import {Component, OnInit, ElementRef} from "angular2/core";
import {VgPlayer, VgMedia, Vg360, IHotSpot} from "videogular2/core";
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
    selector: 'video-vr-player',
    templateUrl: 'src/video-vr-player.html',
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
        VgFullscreen,
        Vg360
    ]
})
export class VideoVrPlayer  implements OnInit {
    elem:any;
    dialog:any;
    dialogClone:any;
    hotSpots:Array<IHotSpot>;
    showPointer:boolean = true;
    isActive:boolean = false;

    constructor(ref:ElementRef) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.hotSpots = [];

        this.dialog = this.elem.querySelector('.info-dialog');
        this.dialogClone = this.elem.querySelector('.clone.info-dialog');

        var hs:IHotSpot = <IHotSpot>{};
        hs.element = this.dialog;
        hs.elementClone = this.dialogClone;
        hs.position = {
            x: -200,
            y: 0,
            z: 150
        };

        hs.rotation = {
            x: 0,
            y: 47,
            z: 0
        };

        this.hotSpots.push(hs);
    }

    onEnterHotSpot(object:IHotSpot) {
        console.log('enter', object);
        this.isActive = true;
    }

    onLeaveHotSpot(object:IHotSpot) {
        console.log('leave', object);
        this.isActive = false;
    }
}
