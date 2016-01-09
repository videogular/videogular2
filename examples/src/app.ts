import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {VgPlayer, VgOverlayPlay, VgControls, VgPlayPause, VgPlaybackButton, VgScrubBar, VgScrubBarCurrentTime, VgScrubBarBufferingTime, VgMute, VgFullscreen} from 'videogular2/videogular2';

@Component({
    selector: 'vg-demo',
    templateUrl: './src/app.html',
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
        NgFor
    ]
})
class VgDemo {
    sources:Array<Object>;
    controls:boolean = false;
    autoplay:boolean = false;
    loop:boolean = false;
    preload:string = 'auto';

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

    onPlayerReady(API) {
        console.log("player ready");
        console.log(API);
    }

    onMediaReady(API) {
        console.log("media ready");
        // pipVideo
        API.seekTime("pipVideo", 50, true);
    }
}

bootstrap(VgDemo);
