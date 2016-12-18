import { Component, ElementRef, Input, HostListener, OnInit } from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';

@Component({
    selector: 'vg-scrub-bar',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 50px;
            margin: 0;
            cursor: pointer;
            align-items: center;
            background: rgba(0, 0, 0, 0.75);
            z-index: 250;
        }

        vg-controls :host {
            position: relative;
            bottom: initial;
            background: initial;
            height: 50px;
            flex-grow: 1;
            flex-basis: 0;
            margin: 0 10px;
        }
    `]
})
export class VgScrubBar implements OnInit {
    @Input() vgFor: string;

    elem: HTMLElement;
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

    @HostListener('mousedown', ['$event'])
    onMouseDownScrubBar($event:any) {
        if (!this.target.isLive) {
            let percentage = $event.offsetX * 100 / this.elem.scrollWidth;

            this.target.seekTime(percentage, true);
        }
    }
}
