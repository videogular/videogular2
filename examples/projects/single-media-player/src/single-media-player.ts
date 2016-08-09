import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {NgFor} from "@angular/common";
import {VgPlayer, VgMedia, VgAPI} from "videogular2/core";
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
    selector: 'single-media-player',
    templateUrl: 'src/single-media-player.html',
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
        NgFor
    ]
})
export class SingleMediaPlayer {
    sources:Array<Object>;

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
}

bootstrap(SingleMediaPlayer, []);
