import {Component, Input, ElementRef} from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';

@Component({
    selector: 'vg-playback-button',
    host: {
        '(click)': 'onClick()'
    },
    template: `{{getPlaybackRate()}}x`,
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
            width: 50px;
            color: white;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
    `]
})
export class VgPlaybackButton extends VgAbstractControl {
    elem:HTMLElement;
    vgFor: string;
    target: any;

    playbackValues: Array<string>;
    playbackIndex: number;

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }

    onClick() {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;

        if (this.target instanceof VgAPI) {
            this.target.playbackRate = (this.playbackValues[this.playbackIndex]);
        }
        else {
            this.target.playbackRate[this.vgFor] = (this.playbackValues[this.playbackIndex]);
        }
    }

    getPlaybackRate() {
        return this.target ? this.target.playbackRate : 1.0;
    }
}
