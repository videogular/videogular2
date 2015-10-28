import {Component, View, ViewEncapsulation, OnInit} from 'angular2/angular2';

import {VgAPI} from '../api';

@Component({
    selector: 'vg-overlay-play',
    inputs: [
        'targetId: for'
    ],
    host: {
        '(click)': 'onClick()',
        'class': 'vg-overlay-play'
    }
})
@View({
    templateUrl: './vg-overlay-play.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class VgOverlayPlay implements OnInit {
    target: any;
    targetId: string;

    constructor(public API: VgAPI) {

    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
    }

    onClick() {
        var state = this.getState();

        switch (state) {
            case 'play':
                this.target.pause();
                break;

            case 'pause':
                this.target.play();
                break;
        }
    }

    getState() {
        var state;

        if (this.target.state instanceof Array) {
            state = 'pause';
            for (var i = 0, l = this.target.state.length; i < l; i++) {
                if (this.target.state[i] === 'play') {
                    state = 'play';
                    break;
                }
            }
        }
        else {
            state = this.target.state;
        }

        return state;
    }
}
