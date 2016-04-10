import {Component, OnInit} from "angular2/core";
import {VgPlayer, Vg360, IHotSpot} from "videogular2/core";
import {
    VgControls,
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
    directives: [
        VgPlayer,
        VgOverlayPlay,
        VgControls,
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
    hotSpots:Array<IHotSpot>;
    showPointer:boolean = true;

    ngOnInit() {
        this.hotSpots = [];

        for ( var i = 0; i < 1; i ++ ) {
            var element = document.createElement( 'div' );
            element.style.width = '100px';
            element.style.height = '100px';
            element.style.backgroundColor = '#FF0000';

            var hs:IHotSpot = <IHotSpot>{};
            hs.element = element;
            hs.position = {
                x: -300,
                y: 0,
                z: 0
            };

            hs.rotation = {
                x: 0,
                y: 90,
                z: 0
            };

            this.hotSpots.push(hs);
        }
    }

    onEnterHotSpot(object:IHotSpot) {
        console.log('enter', object);
    }

    onLeaveHotSpot(object:IHotSpot) {
        console.log('leave', object);
    }
}
