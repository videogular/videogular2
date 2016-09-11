///<reference path="./google.ima.ts"/>

import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {IPlayable} from '../vg-media/i-playable';
import {VgAPI} from '../services/vg-api';
import {VgStates} from "../states/vg-states";
import {VgEvents} from "../events/vg-events";
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";

@Component({
    selector: 'vg-ima-ads',
    host: {
        'class': 'vg-ima-ads'
    },
    template:
        `<div class="vg-ima-ads"></div>`,
    styles: [`
        :host {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 199;
            background: black;
        }
        .vg-ima-ads {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    `]
})
export class VgImaAds {
    element:HTMLElement;
    mediaElement:HTMLMediaElement;
    vgFor: string;
    target: IPlayable;
    ima: Ima;
    subscriptions:any = {};
    isFullscreen:boolean = false;
    skipButton:HTMLElement;

    @Input('vg-network') vgNetwork : string;
    @Input('vg-unit-path') vgUnitPath : string;
    @Input('vg-companion') vgCompanion : string;
    @Input('vg-companion-size') vgCompanionSize : Array<Number>;
    @Input('vg-ad-tag-url') vgAdTagUrl : string;
    @Input('vg-skip-button') vgSkipButton : string;

    constructor(ref:ElementRef, public API: VgAPI) {
        this.element = ref.nativeElement;
        this.onContentEnded = this.onContentEnded.bind(this);
        this.API.playerReadyEvent.subscribe((api) => this.onPlayerReady());
    }

    onPlayerReady() {
        console.log('onPlayerReady');
        this.vgFor = this.element.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        
        this.mediaElement = (this.API.getMasterMedia() as any).elem;// hack to overcome IPlayable
        
        this.initializations();

        Observable.fromEvent(this.mediaElement, VgEvents.VG_ENDED)
            .subscribe(this.onContentEnded.bind(this));

        Observable.fromEvent(this.mediaElement, VgEvents.VG_PLAY)
            .subscribe(this.onUpdateState.bind(this));
        
        VgFullscreenAPI.onChangeFullscreen
            .subscribe(this.onChangeFullscreen.bind(this));

        this.ima.adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, 
            this.onAdsManagerLoaded.bind(this), 
            false
        );
        this.ima.adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR, 
            this.onAdError.bind(this), 
            false
        );

        this.loadAds();
    }

    initializations() {
        console.log('initializations');
        this.ima = new Ima(this.element);

        this.skipButton = document.querySelector(this.vgSkipButton) as HTMLElement;
        this.skipButton.style.display = "none";
        this.skipButton.addEventListener("click", this.onClickSkip.bind(this));
        this.element.insertBefore(this.skipButton, this.element.firstChild);

        window.addEventListener("resize", () => {
            const w = this.API.videogularElement.offsetWidth;
            const h = this.API.videogularElement.offsetHeight;

            if (this.ima.adsManager) {
                if (this.isFullscreen) {
                    this.ima.adsManager.resize(w, h, google.ima.ViewMode.FULLSCREEN);
                }
                else {
                    this.ima.adsManager.resize(w, h, google.ima.ViewMode.NORMAL);
                }
            }
        });
    }

    loadAds() {
        console.log('loadAds', this.vgCompanion);
        if (this.vgCompanion) {
            googletag.cmd.push(
                () => {
                    const adUnitPath:string = "/" + this.vgNetwork + "/" + this.vgUnitPath;
                    const slot:googletag.Slot = googletag.defineSlot(adUnitPath, this.vgCompanionSize, this.vgCompanion);
                    slot.addService(googletag.companionAds());
                    slot.addService(googletag.pubads());

                    googletag
                        .companionAds()
                        .setRefreshUnfilledSlots(true);

                    googletag
                        .pubads()
                        .enableVideoAds();

                    googletag.enableServices();
                }
            );
        }
    }
    
    onUpdateState(event:any) {
        console.log("onUpdateState", event);
        switch (event.type) {
            case VgEvents.VG_PLAY:
                if(!this.ima.adsLoaded) {
                    this.API.pause();
                    this.ima.adDisplayContainer.initialize();
                    this.requestAds(this.vgAdTagUrl);
                    this.ima.adsLoaded = true;
                }
                break;
        }
    }

    requestAds(adTagUrl:string) {
        console.log('requestAds', adTagUrl);
        // Show only to get computed style in pixels
        this.show();

        const adsRequest = new google.ima.AdsRequest();
        const computedStyle = window.getComputedStyle(this.element);
        adsRequest.adTagUrl = adTagUrl;

        adsRequest.linearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.linearAdSlotHeight = parseInt(computedStyle.height, 10);
        adsRequest.nonLinearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.nonLinearAdSlotHeight = parseInt(computedStyle.height, 10);

        this.ima.adsLoader.requestAds(adsRequest);
    }

    onAdsManagerLoaded(evt:google.ima.AdsManagerLoadedEvent) {
        console.log('onAdsManagerLoaded', evt);
        this.show();
        this.ima.adsManager = evt.getAdsManager(this.mediaElement);
        this.processAdsManager(this.ima.adsManager);
    }
    
    processAdsManager(adsManager:google.ima.AdsManager){
        console.log('processAdsManager');
        const w = this.API.videogularElement.offsetWidth;
        const h = this.API.videogularElement.offsetHeight;

        // Attach the pause/resume events.
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.onSkippableStateChanged.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAllAdsComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);

        console.log('w,h', w, h);
        this.ima.adsManager.init(w, h, google.ima.ViewMode.NORMAL);
        this.ima.adsManager.start();
    }

    onSkippableStateChanged() {
        const isSkippable = this.ima.adsManager.getAdSkippableState();
        console.log('onSkippableStateChanged', isSkippable);

        if (isSkippable) {
            this.skipButton.style.display = "block";
        } else {
            this.skipButton.style.display = "none";
        }
    }

    onClickSkip() {
        this.ima.adsManager.skip();
    }

    onContentPauseRequested() {
        console.log('onContentPauseRequested');
        this.show();
        this.API.pause();
    }

    onContentResumeRequested() {
        console.log('onContentResumeRequested');
        this.API.play();
        this.hide();
    }

    onAdError(evt) {
        console.log('onAdError', evt);
        if (this.ima.adsManager) {
            this.ima.adsManager.destroy();
        }
        this.hide();
        this.API.play();
    }

    onAllAdsComplete() {
        console.log('onAllAdsComplete');
        this.hide();
        // The last ad was a post-roll
        if (this.ima.adsManager.getCuePoints().join().indexOf("-1") >= 0) {
            this.API.pause(); // it was stop() in Videogular v1
        }
    }

    onAdComplete(){
        console.log('onAdComplete');
        // TODO: Update view with current ad count
        this.ima.currentAd++;
    }

    show() {
        this.element.style.display = "block";
    }

    hide() {
        this.element.style.display = "none";
    }
    
    onContentEnded() {
        console.log('onContentEnded');
        this.ima.adsLoader.contentComplete();
    }

    onChangeFullscreen(fsState:boolean) {
        if (!VgFullscreenAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
        }
    }
}


export class Ima {
    adDisplayContainer:google.ima.AdDisplayContainer;
    adsLoader:google.ima.AdsLoader;
    adsManager:google.ima.AdsManager;
    adsLoaded:boolean;
    currentAd:number;

    constructor(imaAdsElement:HTMLElement){
        this.adDisplayContainer = new google.ima.AdDisplayContainer(imaAdsElement);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        
        this.adsManager = null;
        this.adsLoaded = false;
        this.currentAd = 0;
    }
}