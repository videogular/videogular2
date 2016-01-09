import {Component, OnInit, Input} from 'angular2/core';

import {VgAPI} from '../../services/vg-api';

@Component({
    selector: 'vg-fullscreen',
    host: {
        '(click)': 'onClick()'
    },
    template:
        `<div class="icon"
             [class.normal]="!API.isFullscreen()"
             [class.fullscreen]="API.isFullscreen()">
        </div>`,
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
        }

        :host .icon {
            pointer-events: none;
        }

        :host .icon.normal:before {
            content: "\\e007";
        }

        :host .icon.fullscreen:before {
            content: "\\e008";
        }
    `]
})
export class VgFullscreen implements OnInit {
    target: Object;

    @Input() vgFor: string;

    constructor(public API:VgAPI) {

    }

    ngOnInit() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    onClick() {
        var element = this.target;

        if (this.target instanceof VgAPI) {
            element = null;
        }

        this.API.toggleFullscreen(element);
    }
}
