import { ElementRef, OnInit, Directive, Input } from "@angular/core";
import { IPlayable, IMediaSubscriptions } from "./i-playable";
import { Observable } from "rxjs/Observable";
import { VgEvents } from "../events/vg-events";
import { VgStates } from "../states/vg-states";
import { VgAPI } from "../services/vg-api";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription, Observer } from "rxjs";

@Directive({
    selector: '[vg-media]'
})
export class VgMedia implements OnInit, IPlayable {
    elem: any;

    private _vgMaster: boolean = false;

    @Input('vg-master') set isMaster(value: boolean) {
        this._vgMaster = value;
    }

    get isMaster(): boolean {
        return this._vgMaster;
    }

    state: string = VgStates.VG_PAUSED;

    time: any = { current: 0, total: 0, left: 0 };
    buffer: any = { end: 0 };
    subscriptions: IMediaSubscriptions | any;

    canPlay: boolean = false;
    canPlayThrough: boolean = false;
    isBufferDetected:boolean = false;
    isMetadataLoaded: boolean = false;
    isReadyToPlay: boolean = false;
    isWaiting: boolean = false;
    isCompleted: boolean = false;


    checkInterval: number = 200;
    currentPlayPos: number = 0;
    lastPlayPos: number = 0;

    bufferObserver:Observer<any>;
    checkBufferSubscription:any;
    syncSubscription:any;
    canPlayAllSubscription:any;
    playAtferSync:boolean = false;

    constructor(ref: ElementRef, private api: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.subscriptions = {
            canPlay: Observable.fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY),
            canPlayThrough: Observable.fromEvent(<any>this.elem, VgEvents.VG_CAN_PLAY_THROUGH),
            loadedMetadata: Observable.fromEvent(<any>this.elem, VgEvents.VG_LOADED_METADATA),
            waiting: Observable.fromEvent(<any>this.elem, VgEvents.VG_WAITING),
            progress: Observable.fromEvent(<any>this.elem, VgEvents.VG_PROGRESS),
            seeking: Observable.fromEvent(<any>this.elem, VgEvents.VG_SEEKING),
            seeked: Observable.fromEvent(<any>this.elem, VgEvents.VG_SEEKED),
            ended: Observable.fromEvent(<any>this.elem, VgEvents.VG_ENDED),
            playing: Observable.fromEvent(<any>this.elem, VgEvents.VG_PLAYING),
            play: Observable.fromEvent(<any>this.elem, VgEvents.VG_PLAY),
            pause: Observable.fromEvent(<any>this.elem, VgEvents.VG_PAUSE),
            timeUpdate: Observable.fromEvent(<any>this.elem, VgEvents.VG_TIME_UPDATE),
            volumeChange: Observable.fromEvent(<any>this.elem, VgEvents.VG_VOLUME_CHANGE),
            error: Observable.fromEvent(<any>this.elem, VgEvents.VG_ERROR),
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
            bufferDetected: Observable.create(
                (observer:any) => {
                    this.bufferObserver = observer;

                    return () => {
                        observer.disconnect();
                    };
                }
            )
        };

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

        for (var media in this.api.medias) {
            canPlayAll.push(this.api.medias[ media ].subscriptions.canPlay);
        }

        this.canPlayAllSubscription = Observable.combineLatest(canPlayAll,
            (...params) => {
                var allReady: boolean = params.some(event => event.target.readyState === 4);

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
                for (var media in this.api.medias) {
                    if (this.api.medias[ media ] != this) {
                        var diff: number = this.api.medias[ media ].currentTime - this.currentTime;

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
        //this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
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

        this.time.total = this.duration * 1000;
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
            if (!this.syncSubscription || this.syncSubscription.isUnsubscribed) {
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
        var end = this.buffered.length - 1;

        this.time.current = this.currentTime * 1000;
        this.time.left = (this.duration - this.currentTime) * 1000;

        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    }

    onProgress(event: any) {
        var end = this.buffered.length - 1;

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

    onBufferDetected() {

    }
}
