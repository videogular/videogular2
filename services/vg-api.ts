import {VgEvents, VgFullscreenAPI} from '../api';

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

    getMediaById(id:string) {
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

    get buffered() {
        return this.$$getAllProperties('buffered');
    }

    seekTime(value:number = 0, byPercent:boolean = false) {
        for (var id in this.medias) {
            this.$$seek(this.medias[id], value, byPercent);
        }
    }

    $$seek(media:HTMLVideoElement|HTMLAudioElement, value:number = 0, byPercent:boolean = false) {
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

    registerMedia(media:HTMLVideoElement|HTMLAudioElement) {
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
        media.seekTime = (value:number=0, byPercent:boolean=false) => {
            this.$$seek(media, value, byPercent);
        };

        this.medias[media.id] = media;

        this.connect(media);
    }

    // TODO: Add support for mobile devices
    toggleFullscreen(element) {
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

    connect(media:HTMLVideoElement|HTMLAudioElement) {
        media.addEventListener(VgEvents.VG_CAN_PLAY, this.onCanPlay.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_CAN_PLAY_THROUGH, this.onCanPlayThrough.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_LOADED_METADATA, this.onLoadMetadata.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_WAITING, this.onWait.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_PROGRESS, this.onProgress.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_ENDED, this.onComplete.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_PLAYING, this.onStartPlaying.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_PLAY, this.onPlay.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_PAUSE, this.onPause.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_PLAYBACK_CHANGE, this.onPlaybackChange.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_TIME_UPDATE, this.onTimeUpdate.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_VOLUME_CHANGE, this.onVolumeChange.bind(this, media.id), false);
        media.addEventListener(VgEvents.VG_ERROR, this.onError.bind(this, media.id), false);
    }

    onCanPlay(id:string) {
        this.medias[id].canPlay = true;
    }

    onCanPlayThrough(id:string) {
        this.medias[id].canPlayThrough = true;
    }

    onLoadMetadata(id:string) {
        this.medias[id].isMetadataLoaded = true;

        this.medias[id].time.total = this.medias[id].duration * 1000;
    }

    onWait(id:string) {
        this.medias[id].isWaiting = true;
    }

    onComplete(id:string) {
        this.medias[id].isCompleted = true;
        this.medias[id].state = 'pause';
    }

    onStartPlaying(id:string) {
        this.medias[id].state = 'play';
    }

    onPlay(id:string) {
        this.medias[id].state = 'play';
    }

    onPause(id:string) {
        this.medias[id].state = 'pause';
    }

    onPlaybackChange(id: string, rate: string) {
        this.medias[id].playbackRate = rate;
    }

    onTimeUpdate(id:string) {
        this.medias[id].time.current = this.medias[id].currentTime * 1000;
        this.medias[id].time.left = (this.medias[id].duration - this.medias[id].currentTime) * 1000;
        this.medias[id].buffer.end = this.medias[id].buffered.end(this.medias[id].buffered.length - 1) * 1000;
    }

    onProgress(id:string) {
        this.medias[id].buffer.end = this.medias[id].buffered.end(this.medias[id].buffered.length - 1) * 1000;
    }

    onVolumeChange(id:string) {
        //this.medias[id].volume = this.medias[id].volume;
    }

    onError(id:string) {
        console.log('error');
    }
}
