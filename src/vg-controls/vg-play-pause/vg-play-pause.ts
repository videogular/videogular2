import {Component, ElementRef} from '@angular/core';

import {VgAPI} from '../../services/vg-api';
import {VgAbstractControl} from '../vg-abstractControl';

@Component({
    selector: 'vg-play-pause',
    host: {
        '(click)': 'onClick()'
    },
    template:
        `<div class="icon"
             [class.pause]="getState() === 'play'"
             [class.play]="getState() === 'pause'">
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

        :host .icon.play:before {
            content: "\\e000";
        }

        :host .icon.pause:before {
            content: "\\e001";
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
            case 'play':
                this.target.pause();
                break;

            case 'pause':
                this.target.play();
                break;
        }
    }

    getState() {
        return this.target ? this.target.state : 'pause';
    }
}
