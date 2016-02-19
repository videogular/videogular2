///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {Output, Component, EventEmitter, ElementRef, OnInit, ContentChild} from 'angular2/core';

import {VgAPI} from '../services/vg-api';

@Component({
    selector: 'vg-player',
    bindings: [VgAPI],
    template: `<ng-content></ng-content>`,
    host: {
        '(mouseenter)': 'showControls()',
        '(mouseleave)': 'hideControls()'
    },
    styles: [`
        @font-face {
            font-family: 'videogular';
            src: url('node_modules/videogular2/fonts/videogular.eot');
            src: url('node_modules/videogular2/fonts/videogular.eot?#iefix') format('embedded-opentype'),
                 url('node_modules/videogular2/fonts/videogular.woff') format('woff'),
                 url('node_modules/videogular2/fonts/videogular.ttf') format('truetype'),
                 url('node_modules/videogular2/fonts/videogular.svg#videogular') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        :host {
            font-family: 'videogular';
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        :host video {
            width: 100%;
            height: 100%;
        }
    `]
})
export class VgPlayer implements OnInit {
    elem:HTMLElement;
    api:VgAPI;

    @Output()
    onPlayerReady:EventEmitter<VgAPI> = new EventEmitter();

    @Output()
    onMediaReady:EventEmitter<any> = new EventEmitter();

    constructor(ref:ElementRef, api:VgAPI) {
        this.api = api;
        this.elem = ref.nativeElement;

        this.api.registerElement(this.elem);
    }

    ngOnInit() {
        var slice:Function = Array.prototype.slice;
        var videos:Array<any> = slice.call(this.elem.querySelectorAll("video"));
        var audios:Array<any> = slice.call(this.elem.querySelectorAll("audio"));
        var medias:Array<any> = videos.concat(audios);

        for (var i=0, l=medias.length; i<l; i++) {
            this.api.registerMedia(medias[i]);
        }

        this.onPlayerReady.next(this.api);
    }
}
