import { ChangeDetectorRef, ElementRef, OnInit, Directive, Input, OnDestroy } from "@angular/core";
import { IPlayable, IMediaSubscriptions } from "./i-playable";
import { Observable ,  Subscription ,  Observer ,  Subject, fromEvent } from "rxjs";

import { VgStates } from '../states/vg-states';
import { VgAPI } from '../services/vg-api';
import { VgEvents } from '../events/vg-events';
import { IMediaElement } from './i-media-element';
import {timer, combineLatest} from 'rxjs';





@Directive({
    selector: '[vgMedia]'
})
export class VgMedia implements OnInit, OnDestroy, IPlayable {
    elem: any;

    @Input() vgMedia: IMediaElement;
    @Input() vgMaster: boolean;

    state: string = VgStates.VG_PAUSED;

    time: any = { current: 0, total: 0, left: 0 };
    buffer: any = { end: 0 };
    track: any;
    subscriptions: IMediaSubscriptions | any;

    canPlay: boolean = false;
    canPlayThrough: boolean = false;
    isMetadataLoaded: boolean = false;
    isWaiting: boolean = false;
    isCompleted: boolean = false;
    isLive: boolean = false;

    isBufferDetected: boolean = false;

    checkInterval: number = 200;
    currentPlayPos: number = 0;
    lastPlayPos: number = 0;

    checkBufferSubscription: any;
    syncSubscription: Subscription;
    canPlayAllSubscription: any;
    playAtferSync: boolean = false;

    mutationObs: Subscription;
    canPlayObs: Subscription;
    canPlayThroughObs: Subscription;
    loadedMetadataObs: Subscription;
    waitingObs: Subscription;
    progressObs: Subscription;
    endedObs: Subscription;
    playingObs: Subscription;
    playObs: Subscription;
    pauseObs: Subscription;
    timeUpdateObs: Subscription;
    volumeChangeObs: Subscription;
    errorObs: Subscription;

    bufferDetected: Subject<boolean> = new Subject();

    playPromise: Promise<any>;

    constructor(private api: VgAPI, private ref: ChangeDetectorRef) {

    }

    ngOnInit() {
        if (this.vgMedia.nodeName) {
            // It's a native element
            this.elem = this.vgMedia;
        } else {
            // It's an Angular Class
            this.elem = this.vgMedia.elem;
        }

        // Just in case we're creating this vgMedia dynamically register again into API
        this.api.registerMedia(this);

        this.subscriptions = {
            // Native events
            abort: fromEvent(<any>this.elem, VgEvents.VG_ABORT),
            canPlay: fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY),
            canPlayThrough: fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY_THROUGH),
            durationChange: fromEvent(<any>this.elem, VgEvents.VG_DURATION_CHANGE),
            emptied: fromEvent(<any>this.elem, VgEvents.VG_EMPTIED),
            encrypted: fromEvent(<any>this.elem, VgEvents.VG_ENCRYPTED),
            ended: fromEvent(<any>this.elem, VgEvents.VG_ENDED),
            error: fromEvent(<any>this.elem, VgEvents.VG_ERROR),
            loadedData: fromEvent(<any>this.elem, VgEvents.VG_LOADED_DATA),
            loadedMetadata: fromEvent(<any>this.elem, VgEvents.VG_LOADED_METADATA),
            loadStart: fromEvent(<any>this.elem, VgEvents.VG_LOAD_START),
            pause: fromEvent(<any>this.elem, VgEvents.VG_PAUSE),
            play: fromEvent(<any>this.elem, VgEvents.VG_PLAY),
            playing: fromEvent(<any>this.elem, VgEvents.VG_PLAYING),
            progress: fromEvent(<any>this.elem, VgEvents.VG_PROGRESS),
            rateChange: fromEvent(<any>this.elem, VgEvents.VG_RATE_CHANGE),
            seeked: fromEvent(<any>this.elem, VgEvents.VG_SEEKED),
            seeking: fromEvent(<any>this.elem, VgEvents.VG_SEEKING),
            stalled: fromEvent(<any>this.elem, VgEvents.VG_STALLED),
            suspend: fromEvent(<any>this.elem, VgEvents.VG_SUSPEND),
            timeUpdate: fromEvent(<any>this.elem, VgEvents.VG_TIME_UPDATE),
            volumeChange: fromEvent(<any>this.elem, VgEvents.VG_VOLUME_CHANGE),
            waiting: fromEvent(<any>this.elem, VgEvents.VG_WAITING),

            // Advertisement only events
            startAds: fromEvent(<any>window, VgEvents.VG_START_ADS),
            endAds: fromEvent(<any>window, VgEvents.VG_END_ADS),

            // See changes on <source> child elements to reload the video file
            mutation: Observable.create(
                (observer: any) => {

                    let domObs = new MutationObserver((mutations) => {
                        observer.next(mutations);
                    });

                    domObs.observe(<any>this.elem, { childList: true, attributes: true });

                    return () => {
                        domObs.disconnect();
                    };
                }
            ),

            // Custom buffering detection
            bufferDetected: this.bufferDetected
        };

        this.mutationObs = this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
        this.canPlayObs = this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
        this.canPlayThroughObs = this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
        this.loadedMetadataObs = this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
        this.waitingObs = this.subscriptions.waiting.subscribe(this.onWait.bind(this));
        this.progressObs = this.subscriptions.progress.subscribe(this.onProgress.bind(this));
        this.endedObs = this.subscriptions.ended.subscribe(this.onComplete.bind(this));
        this.playingObs = this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
        this.playObs = this.subscriptions.play.subscribe(this.onPlay.bind(this));
        this.pauseObs = this.subscriptions.pause.subscribe(this.onPause.bind(this));
        this.timeUpdateObs = this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
        this.volumeChangeObs = this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
        this.errorObs = this.subscriptions.error.subscribe(this.onError.bind(this));

        if (this.vgMaster) {
            this.api.playerReadyEvent.subscribe(
                () => {
                    this.prepareSync();
                }
            );
        }
    }

    prepareSync() {
        let canPlayAll: Array<Observable<any>> = [];

        for (let media in this.api.medias) {
            if (this.api.medias[ media ]) {
                canPlayAll.push(this.api.medias[ media ].subscriptions.canPlay);
            }
        }

        this.canPlayAllSubscription = combineLatest(canPlayAll,
            (...params) => {
                let allReady: boolean = params.some(event => event.target.readyState === 4);

                if (allReady && !this.syncSubscription) {
                    this.startSync();
                    this.syncSubscription.unsubscribe();
                }
            }
        ).subscribe();
    }

    startSync() {
        this.syncSubscription = timer(0, 1000).subscribe(
            () => {
                for (let media in this.api.medias) {
                    if (this.api.medias[ media ] !== this) {
                        let diff: number = this.api.medias[ media ].currentTime - this.currentTime;

                        if (diff < -0.3 || diff > 0.3) {
                            this.playAtferSync = (this.state === VgStates.VG_PLAYING);

                            this.pause();
                            this.api.medias[ media ].pause();
                            this.api.medias[ media ].currentTime = this.currentTime;
                        }
                        else {
                            if (this.playAtferSync) {
                                this.play();
                                this.api.medias[ media ].play();
                                this.playAtferSync = false;
                            }
                        }
                    }
                }
            }
        );
    }

    onMutation(mutations: Array<MutationRecord>) {
        // Detect changes only for source elements or src attribute
        for (let i=0, l=mutations.length; i<l; i++) {
            let mut: MutationRecord = mutations[i];

            if (mut.type === 'attributes' && mut.attributeName === 'src') {
                // Only load src file if it's not a blob (for DASH / HLS sources)
                if (mut.target['src'] && mut.target['src'].length > 0 && mut.target['src'].indexOf('blob:') < 0) {
                    this.loadMedia();
                    break;
                }
            } else if (mut.type === 'childList' && mut.removedNodes.length && mut.removedNodes[0].nodeName.toLowerCase() === 'source') {
                this.loadMedia();
                break;
            }
        }
    }

    loadMedia() {
        this.vgMedia.pause();
        this.vgMedia.currentTime = 0;

        // Start buffering until we can play the media file
        this.stopBufferCheck();
        this.isBufferDetected = true;
        this.bufferDetected.next(this.isBufferDetected);

        // TODO: This is ugly, we should find something cleaner. For some reason a TimerObservable doesn't works.
        setTimeout(() => this.vgMedia.load(), 10);
    }

    play() {
        // short-circuit if already playing
        if (this.playPromise || (this.state !== VgStates.VG_PAUSED && this.state !== VgStates.VG_ENDED)) {
            return;
        }

        this.playPromise = this.vgMedia.play();

        // browser has async play promise
        if (this.playPromise && this.playPromise.then && this.playPromise.catch) {
            this.playPromise
                .then(() => {
                    this.playPromise = null;
                })
                .catch(() => {
                    this.playPromise = null;
                    // deliberately empty for the sake of eating console noise
                });
        }

        return this.playPromise;
    }

    pause() {
        // browser has async play promise
        if (this.playPromise) {
            this.playPromise
                .then(() => {
                    this.vgMedia.pause();
                });
        }
        else {
            this.vgMedia.pause();
        }
    }

    get id() {
        // We should return undefined if vgMedia still doesn't exist
        let result = undefined;

        if (this.vgMedia) {
            result = this.vgMedia.id;
        }

        return result;
    }

    get duration() {
        return this.vgMedia.duration;
    }

    set currentTime(seconds) {
        this.vgMedia.currentTime = seconds;
        // this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
    }

    get currentTime() {
        return this.vgMedia.currentTime;
    }

    set volume(volume) {
        this.vgMedia.volume = volume;
    }

    get volume() {
        return this.vgMedia.volume;
    }

    set playbackRate(rate) {
        this.vgMedia.playbackRate = rate;
    }

    get playbackRate() {
        return this.vgMedia.playbackRate;
    }

    get buffered() {
        return this.vgMedia.buffered;
    }

    get textTracks() {
        return this.vgMedia.textTracks;
    }

    onCanPlay(event: any) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlay = true;
        this.ref.detectChanges();
    }

    onCanPlayThrough(event: any) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlayThrough = true;
        this.ref.detectChanges();
    }

    onLoadMetadata(event: any) {
        this.isMetadataLoaded = true;

        this.time = {
            current: 0,
            left: 0,
            total: this.duration * 1000
        };

        this.state = VgStates.VG_PAUSED;

        // Live streaming check
        let t:number = Math.round(this.time.total);
        this.isLive = (t === Infinity);
        this.ref.detectChanges();
    }

    onWait(event: any) {
        this.isWaiting = true;
        this.ref.detectChanges();
    }

    onComplete(event: any) {
        this.isCompleted = true;
        this.state = VgStates.VG_ENDED;
        this.ref.detectChanges();
    }

    onStartPlaying(event: any) {
        this.state = VgStates.VG_PLAYING;
        this.ref.detectChanges();
    }

    onPlay(event: any) {
        this.state = VgStates.VG_PLAYING;

        if (this.vgMaster) {
            if (!this.syncSubscription || this.syncSubscription.closed) {
                this.startSync();
            }
        }

        this.startBufferCheck();
        this.ref.detectChanges();
    }

    onPause(event: any) {
        this.state = VgStates.VG_PAUSED;

        if (this.vgMaster) {
            if (!this.playAtferSync) {
                this.syncSubscription.unsubscribe();
            }
        }

        this.stopBufferCheck();
        this.ref.detectChanges();
    }

    onTimeUpdate(event: any) {
        let end = this.buffered.length - 1;

        this.time = {
            current: this.currentTime * 1000,
            total: this.time.total,
            left: (this.duration - this.currentTime) * 1000
        };

        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    }

    onProgress(event: any) {
        let end = this.buffered.length - 1;

        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    }

    onVolumeChange(event: any) {
        // TODO: Save to localstorage the current volume
        this.ref.detectChanges();
    }

    onError(event: any) {
        // TODO: Handle error messages
        this.ref.detectChanges();
    }

    // http://stackoverflow.com/a/23828241/779529
    bufferCheck() {
        const offset = 1 / this.checkInterval;
        this.currentPlayPos = this.currentTime;

        if (!this.isBufferDetected && this.currentPlayPos < (this.lastPlayPos + offset)) {
            this.isBufferDetected = true;
        }

        if (this.isBufferDetected && this.currentPlayPos > (this.lastPlayPos + offset)) {
            this.isBufferDetected = false;
        }

        // Prevent calls to bufferCheck after ngOnDestroy have been called
        if (!this.bufferDetected.closed) {
            this.bufferDetected.next(this.isBufferDetected);
        }

        this.lastPlayPos = this.currentPlayPos;
    }

    startBufferCheck() {
        this.checkBufferSubscription = timer(0, this.checkInterval).subscribe(
            () => {
                this.bufferCheck();
            }
        );
    }

    stopBufferCheck() {
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }

        this.isBufferDetected = false;

        this.bufferDetected.next(this.isBufferDetected);
    }

    seekTime(value:number, byPercent:boolean = false) {
        let second:number;
        let duration:number = this.duration;

        if (byPercent) {
            second = value * duration / 100;
        }
        else {
            second = value;
        }

        this.currentTime = second;
    }

    addTextTrack(type:string, label?:string, language?:string, mode?:'disabled' | 'hidden' | 'showing'): TextTrack {
        const newTrack:TextTrack = this.vgMedia.addTextTrack(type, label, language);

        if (mode) {
            newTrack.mode = mode;
        }
        return newTrack;
    }

    ngOnDestroy() {
        this.vgMedia.src = '';
        this.mutationObs.unsubscribe();
        this.canPlayObs.unsubscribe();
        this.canPlayThroughObs.unsubscribe();
        this.loadedMetadataObs.unsubscribe();
        this.waitingObs.unsubscribe();
        this.progressObs.unsubscribe();
        this.endedObs.unsubscribe();
        this.playingObs.unsubscribe();
        this.playObs.unsubscribe();
        this.pauseObs.unsubscribe();
        this.timeUpdateObs.unsubscribe();
        this.volumeChangeObs.unsubscribe();
        this.errorObs.unsubscribe();

        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }

        if(this.syncSubscription) {
            this.syncSubscription.unsubscribe();
        }

        this.bufferDetected.complete();
        this.bufferDetected.unsubscribe();

        this.api.unregisterMedia(this);
    }
}
