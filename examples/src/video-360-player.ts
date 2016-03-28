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

    ngOnInit() {
        this.hotSpots = [];

        for ( var i = 0; i < 10; i ++ ) {
            var element = document.createElement( 'div' );
            element.style.width = '100px';
            element.style.height = '100px';
            element.style.backgroundColor = '#FF0000';

            var hs:IHotSpot = <IHotSpot>{};
            hs.element = element;
            hs.position = {
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                z: Math.random() * 200 - 100
            };

            hs.rotation = {
                x: Math.random(),
                y: Math.random(),
                z: Math.random()
            };
        }
    }
}
