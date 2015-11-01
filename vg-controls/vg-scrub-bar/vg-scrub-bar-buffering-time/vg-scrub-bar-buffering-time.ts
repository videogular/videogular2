import {Component, View, ViewEncapsulation, OnInit} from 'angular2/angular2';

import {VgAPI} from '../../../api';

@Component({
    selector: 'vg-scrub-bar-buffering-time',
    inputs: [
        'targetId: for'
    ]
})
@View({
    template: `<div class="background" [style.width]="getBufferTime()"></div>`,
    styleUrls: ['../node_modules/videogular2/vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VgScrubBarBufferingTime implements OnInit {
    target: any;
    targetId: string;

    constructor(public API:VgAPI) {

    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
    }

    getBufferTime() {
        var bufferTime = "0%";

        if (this.target.buffered.length) {
            bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
        }

        return bufferTime;
    }
}
