import { Component, Input, ElementRef, HostListener, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'vg-playback-button',
    encapsulation: ViewEncapsulation.None,
    template: `{{getPlaybackRate()}}x`,
    styles: [ `
        vg-playback-button {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
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
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
    ` ]
})
export class VgPlaybackButton implements OnInit, OnDestroy {
    @Input() vgFor: string;

    elem: HTMLElement;
    target: any;

    @Input() playbackValues: Array<string>;
    playbackIndex: number;

    subscriptions: Subscription[] = [];

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
        this.playbackValues = [ '0.5', '1.0', '1.5', '2.0' ];
        this.playbackIndex = 1;
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

    @HostListener('click')
    onClick() {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;

        if (this.target instanceof VgAPI) {
            this.target.playbackRate = (this.playbackValues[ this.playbackIndex ]);
        }
        else {
            this.target.playbackRate[ this.vgFor ] = (this.playbackValues[ this.playbackIndex ]);
        }
    }

    getPlaybackRate() {
        return this.target ? this.target.playbackRate : 1.0;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
