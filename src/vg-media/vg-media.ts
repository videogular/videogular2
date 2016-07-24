import {ElementRef, OnInit, Directive, Input} from '@angular/core';

import {IPlayable} from "./i-playable";
import {Observable} from "rxjs/Observable";
import {VgEvents} from "../events/vg-events";
import {VgStates} from "../states/vg-states";

@Directive({
    selector: '[vg-media]'
})
export class VgMedia implements OnInit, IPlayable {
    elem:HTMLMediaElement;

    private _vgMaster:boolean = false;
    @Input('vg-master') set isMaster(value:boolean) {
        this._vgMaster = value;
    }
    get isMaster():boolean {
        return this._vgMaster;
    }

    state:string = VgStates.VG_PAUSED;
    
    time:any = {current: 0, total: 0, left: 0};
    buffer:any = {end: 0};
    subscriptions:any = {};
    
    canPlay:boolean = false;
    canPlayThrough:boolean = false;
    isMetadataLoaded:boolean = false;
    isWaiting:boolean = false;
    isCompleted:boolean = false;
    
    constructor(ref:ElementRef) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.subscriptions.canPlay = Observable.fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY);
        this.subscriptions.canPlayThrough = Observable.fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY_THROUGH);
        this.subscriptions.loadedMetadata = Observable.fromEvent(<any>this.elem, VgEvents.VG_LOADED_METADATA);
        this.subscriptions.waiting = Observable.fromEvent(<any>this.elem, VgEvents.VG_WAITING);
        this.subscriptions.progress = Observable.fromEvent(<any>this.elem, VgEvents.VG_PROGRESS);
        this.subscriptions.ended = Observable.fromEvent(<any>this.elem, VgEvents.VG_ENDED);
        this.subscriptions.playing = Observable.fromEvent(<any>this.elem, VgEvents.VG_PLAYING);
        this.subscriptions.play = Observable.fromEvent(<any>this.elem, VgEvents.VG_PLAY);
        this.subscriptions.pause = Observable.fromEvent(<any>this.elem, VgEvents.VG_PAUSE);
        this.subscriptions.timeUpdate = Observable.fromEvent(<any>this.elem, VgEvents.VG_TIME_UPDATE);
        this.subscriptions.volumeChange = Observable.fromEvent(<any>this.elem, VgEvents.VG_VOLUME_CHANGE);
        this.subscriptions.error = Observable.fromEvent(<any>this.elem, VgEvents.VG_ERROR);

        // See changes on <source> child elements to reload the video file
        this.subscriptions.mutation = Observable.create(
            (observer) => {
                let domObs = new MutationObserver((mutations) => {
                    observer.next(mutations);
                });

                domObs.observe(<any>this.elem, { childList: true });

                return () => {
                    domObs.disconnect();
                };
            }
        );

        this.subscriptions.mutation.subscribe(this.onMutation.bind(this));

        this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
        this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
        this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
        this.subscriptions.waiting.subscribe(this.onWait.bind(this));
        this.subscriptions.progress.subscribe(this.onProgress.bind(this));
        this.subscriptions.ended.subscribe(this.onComplete.bind(this));
        this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
        this.subscriptions.play.subscribe(this.onPlay.bind(this));
        this.subscriptions.pause.subscribe(this.onPause.bind(this));
        this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
        this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
        this.subscriptions.error.subscribe(this.onError.bind(this));
    }

    onMutation(mutations) {
        this.elem.pause();
        this.elem.currentTime = 0;

        // TODO: This is ugly, we should find something cleaner
        setTimeout(() => this.elem.load(), 1);
    }

    play() {
        this.elem.play();
    }
    
    pause() {
        this.elem.pause();
    }

    get id() {
        return this.elem.id;
    }

    get duration() {
        return this.elem.duration;
    }

    set currentTime(seconds) {
        this.elem.currentTime =  seconds;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
    }

    get currentTime() {
        return this.elem.currentTime;
    }

    set volume(volume) {
        this.elem.volume = volume;
    }

    get volume() {
        return this.elem.volume;
    }

    set playbackRate(rate) {
        this.elem.playbackRate = rate;
    }

    get playbackRate() {
        return this.elem.playbackRate;
    }

    get buffered() {
        return this.elem.buffered;
    }

    onCanPlay(event) {
        this.canPlay = true;
    }

    onCanPlayThrough(event) {
        this.canPlayThrough = true;
    }

    onLoadMetadata(event) {
        this.isMetadataLoaded = true;

        this.time.total = this.duration * 1000;
    }

    onWait(event) {
        this.isWaiting = true;
    }

    onComplete(event) {
        this.isCompleted = true;
        this.state = VgStates.VG_ENDED;
    }

    onStartPlaying(event) {
        this.state = VgStates.VG_PLAYING;
    }

    onPlay(event) {
        this.state = VgStates.VG_PLAYING;
    }

    onPause(event) {
        this.state = VgStates.VG_PAUSED;
    }

    onTimeUpdate(event) {
        var end = this.buffered.length - 1;

        this.time.current = this.currentTime * 1000;
        this.time.left = (this.duration - this.currentTime) * 1000;

        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    }

    onProgress(event) {
        var end = this.buffered.length - 1;

        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    }

    onVolumeChange(event) {
        // TODO: Save to localstorage the current volume
    }

    onError(event) {
        // TODO: Handle error messages
    }
}
