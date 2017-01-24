import { Component, Input, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { VgAPI } from '../../../core/services/vg-api';

@Component({
    selector: 'vg-scrub-bar-current-time',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="background" [style.width]="getPercentage()"></div>`,
    styles: [ `
        vg-scrub-bar-current-time {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        vg-scrub-bar-current-time .background {
            background-color: white;
        }

        vg-controls vg-scrub-bar-current-time {
            position: absolute;
            top: calc(50% - 3px);
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }

        vg-controls vg-scrub-bar-current-time .background {
            border: 1px solid white;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
    ` ]
})
export class VgScrubBarCurrentTime implements OnInit {
    @Input() vgFor: string;

    elem: HTMLElement;
    target: any;

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
        }
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getPercentage() {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    }
}
