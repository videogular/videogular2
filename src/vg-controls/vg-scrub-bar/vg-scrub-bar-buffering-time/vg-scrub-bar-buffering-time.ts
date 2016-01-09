import {Component, OnInit, Input} from 'angular2/core';

import {VgAPI} from '../../../services/vg-api';

@Component({
    selector: 'vg-scrub-bar-buffering-time',
    template: `<div class="background" [style.width]="getBufferTime()"></div>`,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        :host .background {
            background-color: rgba(255, 255, 255, 0.3);
        }

        vg-controls :host {
            position: absolute;
            top: calc(50% - 3px);
        }

        vg-controls :host .background {
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
    `]
})
export class VgScrubBarBufferingTime implements OnInit {
    target: any;

    @Input() vgFor: string;

    constructor(public API:VgAPI) {

    }

    ngOnInit() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getBufferTime() {
        var bufferTime = "0%";

        if (this.target.buffered.length) {
            bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
        }

        return bufferTime;
    }
}
