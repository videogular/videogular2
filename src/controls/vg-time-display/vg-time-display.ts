import { Component, Input, ElementRef, OnInit } from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';


@Component({
    selector: 'vg-time-display',
    template: `
        <span *ngIf="target?.isLive">LIVE</span>
        <span *ngIf="!target?.isLive">{{ getTime() | date:vgFormat }}</span>
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
export class VgTimeDisplay implements OnInit {
    @Input() vgFor: string;
    @Input() vgProperty:string = 'current';
    @Input() vgFormat:string = 'mm:ss';

    elem:HTMLElement;
    target: any;


    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getTime() {
        let t = 0;

        if (this.target) {
            t = Math.round(this.target.time[this.vgProperty]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }

        return t;
    }
}
