import {Component, Input, ElementRef} from '@angular/core';

import {VgAPI} from '../../services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';

@Component({
    selector: 'vg-time-display',
    template: `
        <span>{{ getTime() | date:format }}</span>
        <ng-content></ng-content>
    `,
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
            width: 60px;
            cursor: pointer;
            color: white;
            line-height: 50px;
            pointer-events: none;
            font-family: Helvetica Neue, Helvetica, Arial;
        }
    `]
})
export class VgTimeDisplay extends VgAbstractControl {
    elem:HTMLElement;
    vgFor: string;
    target: any;

    @Input('property') property:string = 'current';
    @Input('format') format:string = 'mm:ss';

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }

    getTime() {
        return this.target ? Math.round(this.target.time[this.property]) : 0;
    }
}
