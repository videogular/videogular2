import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

import {VgAPI} from '../core/services/vg-api';
import {VgStates} from "../core/states/vg-states";

@Component({
    selector: 'vg-overlay-play',
    template:
        `<div class="vg-overlay-play">
            <div class="overlay-play-container"
                 [class.vg-icon-play_arrow]="getState() !== 'playing'">
            </div>
        </div>`,
    styles: [`
        :host {
            z-index: 200;
        }

        .vg-overlay-play {
            transition: all 0.5s;
            cursor: pointer;
            position: absolute;
            display: block;
            color: white;
            width: 100%;
            height: 100%;
            font-size: 80px;
            filter: alpha(opacity=60);
            opacity: 0.6;
        }

        .vg-overlay-play .overlay-play-container.vg-icon-play_arrow {
            pointer-events: none;
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
        }

        .vg-overlay-play:hover {
            filter: alpha(opacity=100);
            opacity: 1;
        }

        .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before {
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

    @HostListener('click')
    onClick() {
        let state = this.getState();

        switch (state) {
            case VgStates.VG_PLAYING:
                this.target.pause();
                break;

            case VgStates.VG_PAUSED:
                this.target.play();
                break;
        }
    }

    getState() {
        let state = VgStates.VG_PAUSED;

        if (this.target && this.target.state instanceof Array) {
            for (let i = 0, l = this.target.state.length; i < l; i++) {
                if (this.target.state[i] === VgStates.VG_PLAYING) {
                    state = VgStates.VG_PLAYING;
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
