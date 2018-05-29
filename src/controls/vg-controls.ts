import {
    Component, Input, OnInit, ElementRef, HostBinding, AfterViewInit, ViewEncapsulation,
    EventEmitter, Output, OnDestroy
} from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { VgAPI } from '../core/services/vg-api';
import { VgControlsHidden } from './../core/services/vg-controls-hidden';

import { VgStates } from '../core/states/vg-states';
import {fromEvent} from 'rxjs';

@Component({
    selector: 'vg-controls',
    encapsulation: ViewEncapsulation.None,
    template: `<ng-content></ng-content>`,
    styles: [ `
        vg-controls {
            position: absolute;
            display: flex;
            width: 100%;
            height: 50px;
            z-index: 300;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            -webkit-transition: bottom 1s;
            -khtml-transition: bottom 1s;
            -moz-transition: bottom 1s;
            -ms-transition: bottom 1s;
            transition: bottom 1s;
        }

        vg-controls.hide {  
            bottom: -50px;
        }
    `]
})
export class VgControls implements OnInit, AfterViewInit, OnDestroy {
    elem: HTMLElement;
    target: any;

    @HostBinding('style.pointer-events') isAdsPlaying: string = 'initial';
    @HostBinding('class.hide') hideControls: boolean = false;

    @Input() vgFor: string;
    @Input() vgAutohide: boolean = false;
    @Input() vgAutohideTime: number = 3;

    private timer: any;
    private hideTimer: any;

    mouseMove$: Observable<any>;
    touchStart$: Observable<any>;

    subscriptions: Subscription[] = [];

    constructor(private API: VgAPI, private ref: ElementRef, private hidden: VgControlsHidden) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.mouseMove$ = fromEvent(this.API.videogularElement, 'mousemove');
        this.subscriptions.push(this.mouseMove$.subscribe(this.show.bind(this)));

        this.touchStart$ = fromEvent(this.API.videogularElement, 'touchstart');
        this.subscriptions.push(this.touchStart$.subscribe(this.show.bind(this)));

        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);

        this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onPlay.bind(this)));
        this.subscriptions.push(this.target.subscriptions.pause.subscribe(this.onPause.bind(this)));
        this.subscriptions.push(this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this)));
        this.subscriptions.push(this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this)));
    }

    ngAfterViewInit() {
        if (this.vgAutohide) {
            this.hide();
        }
        else {
            this.show();
        }
    }

    onPlay() {
        if (this.vgAutohide) {
            this.hide();
        }
    }

    onPause() {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
    }

    onStartAds() {
        this.isAdsPlaying = 'none';
    }

    onEndAds() {
        this.isAdsPlaying = 'initial';
    }

    hide() {
        if (this.vgAutohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    }

    show() {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);

        if (this.vgAutohide) {
            this.hideAsync();
        }
    }

    private hideAsync() {
        if (this.API.state === VgStates.VG_PLAYING) {
            this.timer = setTimeout(() => {
                this.hideControls = true;
                this.hidden.state(true);
            }, this.vgAutohideTime * 1000);
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
