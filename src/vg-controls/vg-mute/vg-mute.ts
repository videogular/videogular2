import {Component, Input, ElementRef} from '@angular/core';

import {VgAPI} from '../../services/vg-api';
import {VgAbstractControl} from '../vg-abstractControl';

@Component({
    selector: 'vg-mute',
    host: {
        '(click)': 'onClick()'
    },
    template:
        `<div class="icon"
             [class.level3]="getVolume() >= 0.75"
             [class.level2]="getVolume() >= 0.5 && getVolume() < 0.75"
             [class.level1]="getVolume() >= 0.25 && getVolume() < 0.5"
             [class.level0]="getVolume() > 0 && getVolume() < 0.25"
             [class.mute]="getVolume() === 0">
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

        :host .icon.level3:before {
            content: "\\e002";
        }

        :host .icon.level2:before {
            content: "\\e003";
        }

        :host .icon.level1:before {
            content: "\\e004";
        }

        :host .icon.level0:before {
            content: "\\e005";
        }

        :host .icon.mute:before {
            content: "\\e006";
        }
    `]
})
export class VgMute extends VgAbstractControl {
    elem:HTMLElement;
    vgFor: string;
    target: any;

    currentVolume:number;


    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        this.currentVolume = this.target.volume;
    }

    onClick() {
        var volume = this.getVolume();

        if (volume === 0) {
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    }

    getVolume() {
        return this.target ? this.target.volume : 0;
    }
}
