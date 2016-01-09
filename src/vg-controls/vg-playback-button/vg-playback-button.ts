import {Component, OnInit, Input} from 'angular2/core';

import {VgAPI} from '../../services/vg-api';

@Component({
    selector: 'vg-playback-button',
    host: {
        '(click)': 'onClick()'
    },
    template: `{{target.playbackRate}}x`,
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
            width: 50px;
            color: white;
        }
    `]
})
export class VgPlaybackButton implements OnInit {
    playbackValues: Array<string>;
    playbackIndex: number;
    target: any;

    @Input() vgFor: string;


    constructor(public API:VgAPI) {
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
    }

    ngOnInit() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    onClick() {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;

        if (this.target instanceof VgAPI) {
            this.target.playbackRate = (this.playbackValues[this.playbackIndex]);
        }
        else {
            this.target.playbackRate[this.vgFor] = (this.playbackValues[this.playbackIndex]);
        }
    }
}
