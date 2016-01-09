import {Component, OnInit, Input} from 'angular2/core';

import {VgAPI} from '../../../services/vg-api';

@Component({
    selector: 'vg-scrub-bar-current-time',
    template: `<div class="background" [style.width]="getPercentage()"></div>`,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        :host .background {
            background-color: white;
        }

        vg-controls :host {
            position: absolute;
            top: calc(50% - 3px);
            background-color: rgba(0, 0, 0, 0.6);
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }

        vg-controls :host .background {
            border: 1px solid white;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
    `]
})
export class VgScrubBarCurrentTime implements OnInit {
    target: any;

    @Input() vgFor: string;

    constructor(public API:VgAPI) {

    }

    ngOnInit() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getPercentage() {
        return ((this.target.time.current * 100 / this.target.time.total)) + '%';
    }
}
