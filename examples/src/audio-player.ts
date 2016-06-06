import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {VgPlayer, VgMedia} from 'videogular2/core';
import {VgControls, VgTimeDisplay, VgPlayPause, VgPlaybackButton, VgScrubBar, VgScrubBarCurrentTime, VgScrubBarBufferingTime, VgMute, VgFullscreen} from 'videogular2/controls';

@Component({
    selector: 'vg-demo',
    templateUrl: 'src/audio-player.html',
    directives: [
        VgPlayer,
        VgMedia,
        VgControls,
        VgTimeDisplay,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarCurrentTime,
        VgScrubBarBufferingTime,
        VgMute,
        VgFullscreen,
        NgFor
    ]
})
export class AudioPlayer {
    sources:Array<Object>;

    constructor() {
        this.sources = [
            {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3"
            }
        ];
    }
}
