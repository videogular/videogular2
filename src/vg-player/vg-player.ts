import {Component, EventEmitter, ElementRef, OnInit} from 'angular2/core';

import {VgAPI} from '../services/vg-api';

@Component({
    selector: 'vg-player',
    bindings: [VgAPI],
    outputs: ['onPlayerReady', 'onMediaReady'],
    template: `<ng-content></ng-content>`,
    styles: [`
        @font-face {
            font-family: 'videogular';
            src: url('node_modules/videogular2/src/fonts/videogular.eot');
            src: url('node_modules/videogular2/src/fonts/videogular.eot?#iefix') format('embedded-opentype'),
                 url('node_modules/videogular2/src/fonts/videogular.woff') format('woff'),
                 url('node_modules/videogular2/src/fonts/videogular.ttf') format('truetype'),
                 url('node_modules/videogular2/src/fonts/videogular.svg#videogular') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        :host {
            font-family: 'videogular';
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
        }

        :host video {
            width: 100%;
            height: 100%;
        }
    `]
})
export class VgPlayer implements OnInit {
    elem:HTMLElement;
    API:VgAPI;

    onPlayerReady:EventEmitter<any> = new EventEmitter();
    onMediaReady:EventEmitter<any>= new EventEmitter();

    constructor(ref:ElementRef, API:VgAPI) {
        this.API = API;
        this.elem = ref.nativeElement;

        this.API.registerElement(this.elem);
    }

    ngOnInit() {
        var slice:Function = Array.prototype.slice;
        var videos:Array<any> = slice.call(this.elem.querySelectorAll("video"));
        var audios:Array<any> = slice.call(this.elem.querySelectorAll("audio"));
        var medias:Array<any> = videos.concat(audios);

        for (var i=0, l=medias.length; i<l; i++) {
            this.API.registerMedia(medias[i]);
        }

        this.onPlayerReady.next(this.API);
    }
}
