import {Component, View, OnInit, ViewEncapsulation} from 'angular2/angular2';

import {VgAPI} from '../../api';

@Component({
    selector: 'vg-fullscreen',
    inputs: [
        'targetId: for'
    ],
    host: {
        '(click)': 'onClick()'
    }
})
@View({
    templateUrl: './vg-fullscreen.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class VgFullscreen implements OnInit {
    target: Object;
    targetId: string;

    constructor(public API:VgAPI) {

    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
    }

    onClick() {
        var element = this.target;

        if (this.target instanceof VgAPI) {
            element = null;
        }

        this.API.toggleFullscreen(element);
    }
}
