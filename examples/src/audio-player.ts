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

@Component({
    selector: 'vg-demo',
    templateUrl: 'src/audio-player.html',
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
