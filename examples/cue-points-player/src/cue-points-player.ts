import {Component} from "@angular/core";

@Component({
    selector: 'cue-points-player',
    templateUrl: 'src/cue-points-player.html'
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
