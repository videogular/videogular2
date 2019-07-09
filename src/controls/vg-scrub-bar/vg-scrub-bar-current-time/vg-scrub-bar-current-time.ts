import { Component, Input, ElementRef, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { VgAPI } from '../../../core/services/vg-api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'vg-scrub-bar-current-time',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="background" [style.width]="getPercentage()"></div><span class="slider" *ngIf="vgSlider"></span>`,
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
        
        vg-scrub-bar-current-time .slider{
            background: white;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            box-shadow: 0px 0px 10px black;
            margin-top: -5px;
            margin-left: -10px;
        }
    ` ]
})
export class VgScrubBarCurrentTime implements OnInit, OnDestroy {
    @Input() vgFor: string;
    @Input() vgSlider = false;

    elem: HTMLElement;
    target: any;

    subscriptions: Subscription[] = [];

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getPercentage() {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
