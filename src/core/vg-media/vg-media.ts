import { ElementRef, OnInit, Directive, Input, OnDestroy } from "@angular/core";
import { IPlayable, IMediaSubscriptions } from "./i-playable";
import { Observable } from "rxjs/Observable";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from "rxjs/Subscription";
import { Observer } from "rxjs/Observer";
import { VgStates } from '../states/vg-states';
import { VgAPI } from '../services/vg-api';
import { VgEvents } from '../events/vg-events';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';

@Directive({
    selector: '[vgMedia]'
})
export class VgMedia implements OnInit, OnDestroy, IPlayable {
    elem: any;

    @Input() vgMedia: string;

    state: string = VgStates.VG_PAUSED;

    time: any = { current: 0, total: 0, left: 0 };
    buffer: any = { end: 0 };
    subscriptions: IMediaSubscriptions | any;

    canPlay: boolean = false;
    canPlayThrough: boolean = false;
    isBufferDetected: boolean = false;
    isMetadataLoaded: boolean = false;
    isReadyToPlay: boolean = false;
    isWaiting: boolean = false;
    isCompleted: boolean = false;
    isLive: boolean = false;


    checkInterval: number = 200;
    currentPlayPos: number = 0;
    lastPlayPos: number = 0;

    bufferObserver: Observer<any>;
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

    isMaster: boolean;

    constructor(ref: ElementRef, private api: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.subscriptions = {
            // Native events
            abort: Observable.fromEvent(<any>this.elem, VgEvents.VG_ABORT),
            canPlay: Observable.fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY),
            canPlayThrough: Observable.fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY_THROUGH),
            durationChange: Observable.fromEvent(<any>this.elem, VgEvents.VG_DURATION_CHANGE),
            emptied: Observable.fromEvent(<any>this.elem, VgEvents.VG_EMPTIED),
            encrypted: Observable.fromEvent(<any>this.elem, VgEvents.VG_ENCRYPTED),
            ended: Observable.fromEvent(<any>this.elem, VgEvents.VG_ENDED),
            error: Observable.fromEvent(<any>this.elem, VgEvents.VG_ERROR),
            loadedData: Observable.fromEvent(<any>this.elem, VgEvents.VG_LOADED_DATA),
            loadedMetadata: Observable.fromEvent(<any>this.elem, VgEvents.VG_LOADED_METADATA),
            loadStart: Observable.fromEvent(<any>this.elem, VgEvents.VG_LOAD_START),
            pause: Observable.fromEvent(<any>this.elem, VgEvents.VG_PAUSE),
            play: Observable.fromEvent(<any>this.elem, VgEvents.VG_PLAY),
            playing: Observable.fromEvent(<any>this.elem, VgEvents.VG_PLAYING),
            progress: Observable.fromEvent(<any>this.elem, VgEvents.VG_PROGRESS),
            rateChange: Observable.fromEvent(<any>this.elem, VgEvents.VG_RATE_CHANGE),
            seeked: Observable.fromEvent(<any>this.elem, VgEvents.VG_SEEKED),
            seeking: Observable.fromEvent(<any>this.elem, VgEvents.VG_SEEKING),
            stalled: Observable.fromEvent(<any>this.elem, VgEvents.VG_STALLED),
            suspend: Observable.fromEvent(<any>this.elem, VgEvents.VG_SUSPEND),
            timeUpdate: Observable.fromEvent(<any>this.elem, VgEvents.VG_TIME_UPDATE),
            volumeChange: Observable.fromEvent(<any>this.elem, VgEvents.VG_VOLUME_CHANGE),
            waiting: Observable.fromEvent(<any>this.elem, VgEvents.VG_WAITING),

            // Advertisement only events
            startAds: Observable.fromEvent(<any>window, VgEvents.VG_START_ADS),
            endAds: Observable.fromEvent(<any>window, VgEvents.VG_END_ADS),

            // See changes on <source> child elements to reload the video file
            mutation: Observable.create(
                (observer: any) => {
                    let domObs = new MutationObserver((mutations) => {
                        observer.next(mutations);
                    });

                    domObs.observe(<any>this.elem, { childList: true });

                    return () => {
                        domObs.disconnect();
                    };
                }
            ),

            // Custom buffering detection
            bufferDetected: Observable.create(
                (observer: any) => {
                    this.bufferObserver = observer;

                    return () => {
                        observer.disconnect();
                    };
                }
            )
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

        this.isMaster = (this.vgMedia === 'master');

        if (this.isMaster) {
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

        this.canPlayAllSubscription = Observable.combineLatest(canPlayAll,
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
        this.syncSubscription = TimerObservable.create(0, 1000).subscribe(
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

    onMutation(mutations: any) {
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
        this.elem.currentTime = seconds;
        // this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
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

    onCanPlay(event: any) {
        this.canPlay = true;
    }

    onCanPlayThrough(event: any) {
        this.canPlayThrough = true;
    }

    onLoadMetadata(event: any) {
        this.isMetadataLoaded = true;

        this.time.current = 0;
        this.time.left = 0;
        this.time.total = this.duration * 1000;

        this.state = VgStates.VG_PAUSED;

        // Live streaming check
        let t:number = Math.round(this.time.total);
        this.isLive = (t === Infinity);
    }

    onWait(event: any) {
        this.isWaiting = true;
    }

    onComplete(event: any) {
        this.isCompleted = true;
        this.state = VgStates.VG_ENDED;
    }

    onStartPlaying(event: any) {
        this.state = VgStates.VG_PLAYING;
    }

    onPlay(event: any) {
        this.state = VgStates.VG_PLAYING;

        if (this.isMaster) {
            if (!this.syncSubscription || this.syncSubscription.closed) {
                this.startSync();
            }
        }

        if (this.bufferObserver) {
            this.startBufferCheck();
        }
    }

    onPause(event: any) {
        this.state = VgStates.VG_PAUSED;

        if (this.isMaster) {
            if (!this.playAtferSync) {
                this.syncSubscription.unsubscribe();
            }
        }

        if (this.bufferObserver) {
            this.stopBufferCheck();
        }
    }

    onTimeUpdate(event: any) {
        let end = this.buffered.length - 1;

        this.time.current = this.currentTime * 1000;
        this.time.left = (this.duration - this.currentTime) * 1000;

        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    }

    onProgress(event: any) {
        let end = this.buffered.length - 1;

        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    }

    onVolumeChange(event: any) {
        // TODO: Save to localstorage the current volume
    }

    onError(event: any) {
        // TODO: Handle error messages
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

        this.bufferObserver.next(this.isBufferDetected);

        this.lastPlayPos = this.currentPlayPos;
    }

    startBufferCheck() {
        this.checkBufferSubscription = TimerObservable.create(0, this.checkInterval).subscribe(
            () => {
                this.bufferCheck();
            }
        );
    }

    stopBufferCheck() {
        this.checkBufferSubscription.unsubscribe();
        this.isBufferDetected = false;
        this.bufferObserver.next(this.isBufferDetected);
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

    ngOnDestroy() {
        this.elem.src = '';
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
    }
}
