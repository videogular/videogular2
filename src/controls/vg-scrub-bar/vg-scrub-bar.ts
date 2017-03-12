import { Component, ElementRef, Input, HostListener, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgControlsHidden } from './../../core/services/vg-controls-hidden';

@Component({
    selector: 'vg-scrub-bar',
    encapsulation: ViewEncapsulation.None,
    template: `<ng-content></ng-content>`,
    styles: [ `
        vg-scrub-bar {
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 50px;
            margin: 0;
            cursor: pointer;
            align-items: center;
            background: rgba(0, 0, 0, 0.75);
            z-index: 250;
            -webkit-transition: bottom 1s, opacity 0.5s;
            -khtml-transition: bottom 1s, opacity 0.5s;
            -moz-transition: bottom 1s, opacity 0.5s;
            -ms-transition: bottom 1s, opacity 0.5s;
            transition: bottom 1s, opacity 0.5s;
        }

        vg-controls vg-scrub-bar {
            position: relative;
            bottom: initial;
            background: initial;
            height: 50px;
            flex-grow: 1;
            flex-basis: 0;
            margin: 0 10px;
            -webkit-transition: initial;
            -khtml-transition: initial;
            -moz-transition: initial;
            -ms-transition: initial;
            transition: initial;
        }

        vg-scrub-bar.hide {
            bottom: 0px;
            opacity: 0;
        }

        vg-controls vg-scrub-bar.hide {
            bottom: initial;
            opacity: initial;
        }
    ` ]
})
export class VgScrubBar implements OnInit {
    @HostBinding('class.hide') hideScrubBar: boolean = false;
    
    @Input() vgFor: string;

    elem: HTMLElement;
    target: any;

    constructor(ref: ElementRef, public API: VgAPI, vgControlsHiddenState: VgControlsHidden) {
        this.elem = ref.nativeElement;
        vgControlsHiddenState.isHidden.subscribe(hide => this.onHideScrubBar(hide));
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

    @HostListener('mousedown', [ '$event' ])
    onMouseDownScrubBar($event: any) {
        if (!this.target.isLive) {
            let percentage = $event.offsetX * 100 / this.elem.scrollWidth;

            this.target.seekTime(percentage, true);
        }
    }

    onHideScrubBar(hide: boolean) {
        this.hideScrubBar = hide;
    } 
}
