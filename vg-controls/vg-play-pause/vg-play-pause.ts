import {Component, View, OnInit, ViewEncapsulation} from 'angular2/angular2';

import {VgAPI} from '../../api';

@Component({
    selector: 'vg-play-pause',
    inputs: [
        'targetId: for'
    ],
    host: {
        '(click)': 'onClick()'
    }
})
@View({
    template:
        `<div class="icon"
             [class.pause]="getState() === 'play'"
             [class.play]="getState() === 'pause'">
        </div>`,
    styleUrls: ['../node_modules/videogular2/vg-controls/vg-play-pause/vg-play-pause.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VgPlayPause implements OnInit {
    target: any;
    targetId: string;

    constructor(public API:VgAPI) {

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

        if (this.target.state instanceof Object) {
            state = 'pause';

            for (var media in this.target.state) {
                if (this.target.state[media] === 'play'){
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
