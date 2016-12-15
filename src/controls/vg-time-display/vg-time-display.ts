import {Component, Input, ElementRef} from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';

@Component({
    selector: 'vg-time-display',
    template: `
        <span *ngIf="target?.isLive">LIVE</span>
        <span *ngIf="!target?.isLive">{{ getTime() | date:format }}</span>
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
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
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
        let t = 0;

        if (this.target) {
            t = Math.round(this.target.time[this.property]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }

        return t;
    }
}
