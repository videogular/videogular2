import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';
import {VgFullscreenAPI} from "../../core/services/vg-fullscreen-api";


@Component({
    selector: 'vg-fullscreen',
    template:
        `<div class="icon"
             [class.vg-icon-fullscreen]="!isFullscreen"
             [class.vg-icon-fullscreen_exit]="isFullscreen">
        </div>`,
    styles: [`
        :host {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            height: 50px;
            width: 50px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }

        :host .icon {
            pointer-events: none;
        }
    `]
})
export class VgFullscreen implements OnInit {
    elem:HTMLElement;
    vgFor:string;
    target:Object;
    isFullscreen:boolean = false;

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
        VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    onChangeFullscreen(fsState:boolean) {
        this.isFullscreen = fsState;
    }

    @HostListener('click')
    onClick() {
        let element = this.target;

        if (this.target instanceof VgAPI) {
            element = null;
        }

        VgFullscreenAPI.toggleFullscreen(element);
    }
}
