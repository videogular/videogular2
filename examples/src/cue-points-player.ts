import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {NgFor, NgIf} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {VgPlayer, VgMedia, VgCuePoints} from 'videogular2/core';
import {VgControls, VgTimeDisplay, VgPlayPause, VgPlaybackButton, VgScrubBar, VgScrubBarCurrentTime, VgScrubBarBufferingTime, VgScrubBarCuePoints, VgMute, VgFullscreen} from 'videogular2/controls';
import {VgOverlayPlay} from 'videogular2/overlay-play';

@Component({
    selector: 'cue-points-player',
    templateUrl: 'src/cue-points-player.html',
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
        VgScrubBarCuePoints,
        VgMute,
        VgFullscreen,
        VgCuePoints,
        NgFor,
        NgIf
    ]
})
export class CuePointsPlayer {
    sources:Array<Object>;
    cuePointData:Object = {};

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
    }

    onEnterCuePoint($event) {
        this.cuePointData = JSON.parse($event.text);
    }

    onExitCuePoint($event) {
        this.cuePointData = {};
    }
}
