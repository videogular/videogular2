import {Component} from "@angular/core";
import {NgFor} from "@angular/common";

@Component({
    selector: 'audio-player',
    templateUrl: 'src/audio-player.html'
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
