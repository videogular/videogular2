import {Injectable} from 'angular2/core';
import {VgEvents} from '../events/vg-events';
import {VgFullscreenAPI} from '../services/vg-fullscreen-api';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class VgAPI {
    medias:Object = {};
    videogularElement: Object;

    constructor() {
        VgFullscreenAPI.init();
    }

    getDefaultMedia() {
        for (var item in this.medias) {
            return this.medias[item];
        }
    }

    getMediaById(id:string = null) {
        var media = this.medias[id];

        if (!id || id === '*') {
            media = this;
        }

        return media;
    }

    play() {
        for (var id in this.medias) {
            this.medias[id].play();
        }
    }

    pause() {
        for (var id in this.medias) {
            this.medias[id].pause();
        }
    }

    get duration() {
        return this.$$getAllProperties('duration');
    }

    set currentTime(seconds) {
        this.$$setAllProperties('currentTime', seconds);
    }

    get currentTime() {
        return this.$$getAllProperties('currentTime');
    }

    set state(state) {
        this.$$setAllProperties('state', state);
    }

    get state() {
        return this.$$getAllProperties('state');
    }

    set volume(volume) {
        this.$$setAllProperties('volume', volume);
    }

    get volume() {
        return this.$$getAllProperties('volume');
    }

    set playbackRate(rate) {
        this.$$setAllProperties('playbackRate', rate);
    }

    get playbackRate() {
        return this.$$getAllProperties('playbackRate');
    }

    get canPlay() {
        return this.$$getAllProperties('canPlay');
    }

    get canPlayThrough() {
        return this.$$getAllProperties('canPlayThrough');
    }

    get isMetadataLoaded() {
        return this.$$getAllProperties('isMetadataLoaded');
    }

    get isWaiting() {
        return this.$$getAllProperties('isWaiting');
    }

    get isCompleted() {
        return this.$$getAllProperties('isCompleted');
    }

    get time() {
        return this.$$getAllProperties('time');
    }

    get buffer() {
        return this.$$getAllProperties('buffer');
    }

    get buffered() {
        return this.$$getAllProperties('buffered');
    }

    get subscriptions() {
        return this.$$getAllProperties('subscriptions');
    }

    seekTime(value:number, byPercent:boolean = false) {
        for (var id in this.medias) {
            this.$$seek(this.medias[id], value, byPercent);
        }
    }

    $$seek(media:any, value:number, byPercent:boolean = false) {
        var second;

        if (byPercent) {
            second = value * media.duration / 100;
            // TODO: Not working unit on-media-ready is available
        }
        else {
            second = value;
        }

        media.currentTime = second;
    }

    $$getAllProperties(property:string){
        var result = {};

        for (var id in this.medias) {
            result[id] = this.medias[id][property];
        }

        // If there's only one media element then return the plain value
        if (Object.keys(result).length === 1) result = result[Object.keys(result)[0]];

        return result;
    }

    $$setAllProperties(property:string, value){
        for (var id in this.medias) {
            this.medias[id][property] = value;
        }
    }

    registerElement(elem:HTMLElement) {
        this.videogularElement = elem;
    }

    registerMedia(media:any) {
        media.time = {
            current: 0,
            total: 0,
            left: 0
        };

        media.buffer = {
            end: 0
        };

        media.canPlay = false;
        media.canPlayThrough = false;
        media.isMetadataLoaded = false;
        media.isWaiting = false;
        media.isCompleted = false;
        media.state = 'pause';
        media.seekTime = (value:number, byPercent:boolean = false) => {
            this.$$seek(media, value, byPercent);
        };

        media.subscriptions = {};

        this.medias[media.id] = media;

        this.connect(media);
    }

    // TODO: Add support for mobile devices
    toggleFullscreen(element:any = null) {
        if (!element) element = this.videogularElement;

        if (VgFullscreenAPI.isFullscreen()) {
            VgFullscreenAPI.exit();
        }
        else {
            VgFullscreenAPI.request(element);
        }
    }

    isFullscreen() {
        return VgFullscreenAPI.isFullscreen();
    }

    connect(media:any) {
        media.subscriptions.canPlay = Observable.fromEvent(media, VgEvents.VG_CAN_PLAY);
        media.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));

        media.subscriptions.canPlayThrough = Observable.fromEvent(media, VgEvents.VG_CAN_PLAY_THROUGH);
        media.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));

        media.subscriptions.loadedMetadata = Observable.fromEvent(media, VgEvents.VG_LOADED_METADATA);
        media.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));

        media.subscriptions.waiting = Observable.fromEvent(media, VgEvents.VG_WAITING);
        media.subscriptions.waiting.subscribe(this.onWait.bind(this));

        media.subscriptions.progress = Observable.fromEvent(media, VgEvents.VG_PROGRESS);
        media.subscriptions.progress.subscribe(this.onProgress.bind(this));

        media.subscriptions.ended = Observable.fromEvent(media, VgEvents.VG_ENDED);
        media.subscriptions.ended.subscribe(this.onComplete.bind(this));

        media.subscriptions.playing = Observable.fromEvent(media, VgEvents.VG_PLAYING);
        media.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));

        media.subscriptions.play = Observable.fromEvent(media, VgEvents.VG_PLAY);
        media.subscriptions.play.subscribe(this.onPlay.bind(this));

        media.subscriptions.pause = Observable.fromEvent(media, VgEvents.VG_PAUSE);
        media.subscriptions.pause.subscribe(this.onPause.bind(this));

        media.subscriptions.timeUpdate = Observable.fromEvent(media, VgEvents.VG_TIME_UPDATE);
        media.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));

        media.subscriptions.volumeChange = Observable.fromEvent(media, VgEvents.VG_VOLUME_CHANGE);
        media.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));

        media.subscriptions.error = Observable.fromEvent(media, VgEvents.VG_ERROR);
        media.subscriptions.error.subscribe(this.onError.bind(this));
    }

    onCanPlay(event) {
        this.medias[event.target.id].canPlay = true;
    }

    onCanPlayThrough(event) {
        this.medias[event.target.id].canPlayThrough = true;
    }

    onLoadMetadata(event) {
        this.medias[event.target.id].isMetadataLoaded = true;

        this.medias[event.target.id].time.total = this.medias[event.target.id].duration * 1000;
    }

    onWait(event) {
        this.medias[event.target.id].isWaiting = true;
    }

    onComplete(event) {
        this.medias[event.target.id].isCompleted = true;
        this.medias[event.target.id].state = 'pause';
    }

    onStartPlaying(event) {
        this.medias[event.target.id].state = 'play';
    }

    onPlay(event) {
        this.medias[event.target.id].state = 'play';
    }

    onPause(event) {
        this.medias[event.target.id].state = 'pause';
    }

    onTimeUpdate(event) {
        var end = this.medias[event.target.id].buffered.length - 1;

        this.medias[event.target.id].time.current = this.medias[event.target.id].currentTime * 1000;
        this.medias[event.target.id].time.left = (this.medias[event.target.id].duration - this.medias[event.target.id].currentTime) * 1000;

        if (end >= 0) {
            this.medias[event.target.id].buffer.end = this.medias[event.target.id].buffered.end(end) * 1000;
        }
    }

    onProgress(event) {
        var end = this.medias[event.target.id].buffered.length - 1;

        if (end >= 0) {
            this.medias[event.target.id].buffer.end = this.medias[event.target.id].buffered.end(end) * 1000;
        }
    }

    onVolumeChange(event) {
        // TODO: Save to localstorage the current volume
    }

    onError(event) {
        // TODO: Handle error messages
    }
}
