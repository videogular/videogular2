import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {VgPlayer, VgMedia, VgAPI} from "videogular2/core";
import {VgSlides, SlideModel} from "videogular2/image";
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

@Component({
    selector: 'slides-player',
    templateUrl: 'src/slides-player.html',
    providers: [VgAPI],
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
        VgSlides
    ]
})
export class SlidesPlayer {
    sources:Array<Object>;
    slides:Array<SlideModel> = [
        {
            src: 'http://static.videogular.com/assets/images/videogular.png',
            start: 0,
            end: 5
        },
        {
            src: 'http://static.videogular.com/assets/images/bbb-splash.png',
            start: 5,
            end: 15
        },
        {
            src: 'http://static.videogular.com/assets/images/earth.png',
            start: 15,
            end: 30
        }
    ];

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

bootstrap(SlidesPlayer, []);