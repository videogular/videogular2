import {Component, View, ViewEncapsulation, OnInit} from 'angular2/angular2';

import {VgAPI} from '../../../api';

@Component({
    selector: 'vg-scrub-bar-current-time',
    inputs: [
        'targetId: for'
    ]
})
@View({
    template: `<div class="background" [style.width]="getPercentage()"></div>`,
    styleUrls: ['../node_modules/videogular2/vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VgScrubBarCurrentTime implements OnInit {
    target: any;
    targetId: string;

    constructor(public API:VgAPI) {

    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
    }

    getPercentage() {
        return ((this.target.time.current * 100 / this.target.time.total)) + '%';
    }
}
