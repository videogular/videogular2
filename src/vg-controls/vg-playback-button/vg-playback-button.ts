import {Component, View, OnInit, ViewEncapsulation} from 'angular2/angular2';

import {VgAPI} from '../../api';

@Component({
    selector: 'vg-playback-button',
    inputs: [
        'targetId: for'
    ],
    host: {
        '(click)': 'onClick()'
    }
})
@View({
    templateUrl: './vg-playback-button.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class VgPlaybackButton implements OnInit {
    playbackValues: Array<string>;
    playbackIndex: number;
    target: any;
    targetId: string;


    constructor(public API:VgAPI) {
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
    }

    onClick() {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;

        if (this.target instanceof VgAPI) {
            this.target.playbackRate = (this.playbackValues[this.playbackIndex]);
        }
        else {
            this.target.playbackRate[this.targetId] = (this.playbackValues[this.playbackIndex]);
        }
    }
}
