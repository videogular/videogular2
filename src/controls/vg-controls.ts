import { Component, Input, OnInit, ElementRef, Renderer, HostBinding, AfterViewInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {VgAPI} from "../core/services/vg-api";

import 'rxjs/add/observable/fromEvent';

@Component({
    selector: 'vg-controls',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
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

        :host.hide {
          bottom: -50px;
        }
    `]
})
export class VgControls implements OnInit, AfterViewInit {
    elem:HTMLElement;
    vgFor:string;
    target:any;

    @HostBinding('style.pointer-events') isAdsPlaying:string = 'initial';
    @HostBinding('class.hide') hideControls:boolean = false;

    @Input() vgAutohide:boolean = false;
    @Input() vgAutohideTime:number = 3;

    private timer:any;

    constructor(private API:VgAPI, private ref:ElementRef) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        let mouseEnter = Observable.fromEvent(this.API.videogularElement, 'mouseenter');
        mouseEnter.subscribe(this.show.bind(this));

        let mouseLeave = Observable.fromEvent(this.API.videogularElement, 'mouseleave');
        mouseLeave.subscribe(this.hide.bind(this));

        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);

        this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this));
        this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this));
    }

    ngAfterViewInit() {
        if (this.vgAutohide) {
            this.hide();
        }
        else {
            this.show();
        }
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
    }

    private hideAsync() {
        this.timer = setTimeout(() => {
            this.hideControls = true;
        }, this.vgAutohideTime * 1000);
    }
}
