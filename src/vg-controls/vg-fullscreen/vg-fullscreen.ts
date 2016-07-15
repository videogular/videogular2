import {Component, Input, ElementRef} from '@angular/core';

import {VgAPI} from '../../services/vg-api';
import {VgFullscreenAPI} from "../../services/vg-fullscreen-api";
import {VgAbstractControl} from '../vg-abstractControl';

@Component({
    selector: 'vg-fullscreen',
    host: {
        '(click)': 'onClick()'
    },
    template:
        `<div class="icon"
             [class.normal]="!fsAPI.isFullscreen"
             [class.fullscreen]="fsAPI.isFullscreen">
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

        :host .icon.normal:before {
            content: "\\e007";
        }

        :host .icon.fullscreen:before {
            content: "\\e008";
        }
    `]
})
export class VgFullscreen extends VgAbstractControl {
    elem:HTMLElement;
    vgFor:string;
    target:Object;
    fsAPI:VgFullscreenAPI;

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
        this.fsAPI = VgFullscreenAPI;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }

    onClick() {
        var element = this.target;

        if (this.target instanceof VgAPI) {
            element = null;
        }

        VgFullscreenAPI.toggleFullscreen(element);
    }
}
