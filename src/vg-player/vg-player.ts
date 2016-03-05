///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {Output, Component, EventEmitter, ElementRef, OnInit, ContentChild, HostBinding} from 'angular2/core';

import {VgAPI} from '../services/vg-api';
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";
import {VgUtils} from "../services/vg-utils";

@Component({
    selector: 'vg-player',
    bindings: [VgAPI],
    template: `<ng-content></ng-content>`,
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
            background-color: black;
        }

        :host video {
            width: 100%;
            height: 100%;
        }

        :host.fullscreen {
            position: fixed;
            left: 0;
            top: 0;
        }
    `]
})
export class VgPlayer implements OnInit {
    elem:HTMLElement;
    api:VgAPI;

    @HostBinding('class.fullscreen') isFullscreen:boolean = false;
    @HostBinding('style.z-index') zIndex:string;

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

        VgFullscreenAPI.init(this.elem, medias);
        VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    }

    onChangeFullscreen(fsState) {
        if (!VgFullscreenAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? VgUtils.getZIndex().toString() : 'auto';
        }
    }
}
