import {Component, OnInit, ElementRef} from "@angular/core";
import {VgPlayer, VgMedia, Vg360, IHotSpot, VgAPI} from "videogular2/core";
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
    selector: 'video-360-player',
    templateUrl: 'src/video-360-player.html',
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
        VgFullscreen,
        Vg360
    ]
})
export class Video360Player implements OnInit {
    elem:any;
    dialog:any;
    hotSpots:Array<IHotSpot>;
    showPointer:boolean = true;
    isActive:boolean = false;

    constructor(ref:ElementRef) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.hotSpots = [];

        this.dialog = this.elem.querySelector('.info-dialog');

        var hs:IHotSpot = <IHotSpot>{};
        hs.element = this.dialog;
        hs.position = {
            x: -500,
            y: 0,
            z: 150
        };

        hs.rotation = {
            x: 0,
            y: 46,
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
