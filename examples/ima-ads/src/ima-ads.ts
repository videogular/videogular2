import {Component} from "@angular/core";

@Component({
    selector: 'ima-ads',
    templateUrl: 'src/ima-ads.html',
    styles: [`
        #demo-player {
            position: absolute;
            width: 100%;
            height: calc(100% - 90px);
        }
        .companionAd {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 90px;
        }
        .skipButton {
            display: none;
        }
    `]
})
export class ImaAds {
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
