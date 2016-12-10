import {Component, ElementRef, Input} from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';

@Component({
    selector: 'vg-scrub-bar',
    host: {
        '(mousedown)': 'onMouseDownScrubBar($event)'
    },
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 50px;
            margin: 0;
            cursor: pointer;
            align-items: center;
            background: rgba(0, 0, 0, 0.75);
            z-index: 250;
        }

        vg-controls :host {
            position: relative;
            bottom: initial;
            background: initial;
            height: 50px;
            flex-grow: 1;
            flex-basis: 0;
            margin: 0 10px;
        }
    `]
})
export class VgScrubBar extends VgAbstractControl {
    elem: HTMLElement;
    vgFor: string;
    target: any;

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }

    onMouseDownScrubBar($event:any) {
        if (!this.target.isLive) {
            var percentage = $event.offsetX * 100 / this.elem.scrollWidth;

            this.target.seekTime(percentage, true);
        }
    }
}
