import {Component, OnInit, Input, ElementRef} from 'angular2/core';

import {VgAPI} from '../../services/vg-api';

@Component({
    selector: 'vg-time-display',
    template: `
        <span>{{ target.time[property] | date:format }}</span>
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
export class VgTimeDisplay implements OnInit {
    elem:HTMLElement;
    vgFor: string;
    target: any;

    @Input('property') property:string = 'current';
    @Input('format') format:string = 'mm:ss';

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }
}
