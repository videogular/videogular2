import {Component, OnInit, Input, ElementRef} from 'angular2/core';

import {VgAPI} from '../services/vg-api';

@Component({
    selector: 'vg-overlay-play',
    host: {
        '(click)': 'onClick()',
        'class': 'vg-overlay-play'
    },
    template:
        `<div class="vg-overlay-play">
            <div class="overlay-play-container"
                 [class.play]="getState() === 'pause'">
            </div>
        </div>`,
    styles: [`
        .vg-overlay-play {
            transition: all 0.5s;
            cursor: pointer;
            position: absolute;
            display: block;
            color: white;
            width: 100%;
            height: 100%;
            z-index: 200;
            font-size: 80px;
            filter: alpha(opacity=60);
            opacity: 0.6;
        }

        .vg-overlay-play .overlay-play-container.play {
            pointer-events: none;
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .vg-overlay-play .overlay-play-container.play:before {
            transition: all 0.5s;
            content: "\\e000";
        }

        .vg-overlay-play:hover {
            filter: alpha(opacity=100);
            opacity: 1;
        }

        .vg-overlay-play:hover .overlay-play-container.play:before {
            transform: scale(1.2);
        }
    `]
})
export class VgOverlayPlay implements OnInit {
    elem:HTMLElement;
    vgFor: string;
    target: any;

    constructor(ref:ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
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

        if (this.target && this.target.state instanceof Array) {
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
