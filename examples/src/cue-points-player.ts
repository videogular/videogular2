import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {VgPlayer, VgCuePoints, ICuePoint, CuePointEvent} from 'videogular2/core';
import {VgControls, VgPlayPause, VgPlaybackButton, VgScrubBar, VgScrubBarCurrentTime, VgScrubBarBufferingTime, VgScrubBarCuePoints, VgMute, VgFullscreen} from 'videogular2/controls';
import {VgOverlayPlay} from 'videogular2/overlay-play';

@Component({
    selector: 'cue-points-player',
    templateUrl: 'src/cue-points-player.html',
    directives: [
        VgPlayer,
        VgOverlayPlay,
        VgControls,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarCurrentTime,
        VgScrubBarBufferingTime,
        VgScrubBarCuePoints,
        VgMute,
        VgFullscreen,
        VgCuePoints,
        NgFor
    ]
})
export class CuePointsPlayer {
    sources:Array<Object>;
    cuePoints:Array<ICuePoint>;

    constructor() {
        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ];

        this.cuePoints = [];

        for (var i:number=0, l:number=5; i<l; i++) {
            var cp:ICuePoint = <ICuePoint>{};
            cp.start = i * 10;
            cp.end = cp.start + 5;
            cp.params = {
                id: i,
                text: 'cue point #' + i
            };

            this.cuePoints.push(cp);
        }
    }

    onEnterCuePoint($event:CuePointEvent) {
        console.log('enter', $event);
    }

    onUpdateCuePoint($event:CuePointEvent) {
        console.log('update', $event);
    }

    onLeaveCuePoint($event:CuePointEvent) {
        console.log('leave', $event);
    }

    onCompleteCuePoint($event:CuePointEvent) {
        console.log('complete', $event);
    }
}
