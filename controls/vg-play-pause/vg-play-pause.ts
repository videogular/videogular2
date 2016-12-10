import {Component, ElementRef} from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';
import {VgStates} from "../../core/states/vg-states";

@Component({
    selector: 'vg-play-pause',
    host: {
        '(click)': 'onClick()'
    },
    template:
        `<div class="icon"
             [class.vg-icon-pause]="getState() === 'playing'"
             [class.vg-icon-play_arrow]="getState() === 'paused' || getState() === 'ended'">
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
export class VgPlayPause extends VgAbstractControl {
    elem:HTMLElement;
    vgFor:string;
    target:any;

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }

    onClick() {
        var state = this.getState();

        switch (state) {
            case VgStates.VG_PLAYING:
                this.target.pause();
                break;

            case VgStates.VG_PAUSED:
            case VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    }

    getState() {
        return this.target ? this.target.state : VgStates.VG_PAUSED;
    }
}
