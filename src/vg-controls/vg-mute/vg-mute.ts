import {Component, View, OnInit, ViewEncapsulation} from 'angular2/angular2';

import {VgAPI} from '../../api';

@Component({
    selector: 'vg-mute',
    inputs: [
        'targetId: for'
    ],
    host: {
        '(click)': 'onClick()'
    }
})
@View({
    templateUrl: './vg-mute.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class VgMute implements OnInit {
    currentVolume:number;
    target: any;
    targetId: string;

    constructor(public API:VgAPI) {

    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
        this.currentVolume = this.target.volume;
    }

    onClick() {
        var volume = this.getVolume();

        if (volume === 0) {
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    }

    getVolume() {
        var volume;
        var result;

        if (this.target.volume instanceof Object) {
            volume = 0;

            for (var media in this.target.volume) {
                volume += this.target.volume[media];
            }

            result = (volume / Object.keys(this.target.volume).length);
        }
        else {
            result = this.target.volume;
        }

        return result;
    }
}
