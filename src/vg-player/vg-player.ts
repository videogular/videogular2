import {Component, View, bootstrap, EventEmitter, ElementRef, ViewEncapsulation, OnInit} from 'angular2/angular2';

import {VgAPI} from '../api';

@Component({
    selector: 'vg-player',
    bindings: [VgAPI],
    outputs: ['onPlayerReady', 'onMediaReady']
})
@View({
    templateUrl: './vg-player.html',
    styleUrls: ['./vg-player.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VgPlayer implements OnInit {
    elem:HTMLElement;
    API:VgAPI;

    onPlayerReady:EventEmitter = new EventEmitter();
    onMediaReady:EventEmitter = new EventEmitter();

    constructor(ref:ElementRef, API:VgAPI) {
        this.API = API;
        this.elem = ref.nativeElement;

        this.API.registerElement(this.elem);

        var slice:Function = Array.prototype.slice;
        var videos:Array<HTMLVideoElement> = slice.call(this.elem.querySelectorAll("video"));
        var audios:Array<HTMLAudioElement> = slice.call(this.elem.querySelectorAll("audio"));
        var medias:Array<HTMLVideoElement|HTMLAudioElement> = videos.concat(audios);

        for (var i=0, l=medias.length; i<l; i++) {
            this.API.registerMedia(medias[i]);
        }
    }

    onInit() {
        this.onPlayerReady.next(this.API);
    }

    onVgMediaReady(event) {
        this.onMediaReady.next(this.API);
    }
}
