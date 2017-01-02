import { Component, Input, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

import {VgAPI} from '../../../core/services/vg-api';

@Component({
    selector: 'vg-scrub-bar-buffering-time',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="background" [style.width]="getBufferTime()"></div>`,
    styles: [`
        vg-scrub-bar-buffering-time {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        vg-scrub-bar-buffering-time .background {
            background-color: rgba(255, 255, 255, 0.3);
        }

        vg-controls vg-scrub-bar-buffering-time {
            position: absolute;
            top: calc(50% - 3px);
        }

        vg-controls vg-scrub-bar-buffering-time .background {
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
    `]
})
export class VgScrubBarBufferingTime implements OnInit {
    @Input() vgFor: string;

    elem:HTMLElement;
    target: any;

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getBufferTime() {
        let bufferTime = "0%";

        if (this.target && this.target.buffer && this.target.buffered.length) {
            if (this.target.time.total === 0) {
                bufferTime = '0%';
            }
            else {
                bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
            }
        }

        return bufferTime;
    }
}
