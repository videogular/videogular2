import {Injectable, EventEmitter} from '@angular/core';
import {IPlayable} from "../vg-media/i-playable";
import {VgStates} from "../states/vg-states";

@Injectable()
export class VgAPI {
    medias:Object = {};
    videogularElement: any;
    playerReadyEvent: EventEmitter<any> = new EventEmitter(true);

    constructor() {

    }

    onPlayerReady() {
        this.playerReadyEvent.emit(this);
    }

    getDefaultMedia() {
        for (var item in this.medias) {
            return this.medias[item];
        }
    }

    getMasterMedia() {
        var master;
        for (var id in this.medias) {
            if (this.medias[id].isMaster === 'true' || this.medias[id].isMaster === true) {
                master = this.medias[id];
                break;
            }
        }
        return master || this.getDefaultMedia();
    }

    isMasterDefined() {
        var result = false;
        for (var id in this.medias) {
            if (this.medias[id].isMaster === 'true' || this.medias[id].isMaster === true) {
                result = true;
                break;
            }
        }
        return result;
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

    $$seek(media:IPlayable, value:number, byPercent:boolean = false) {
        var second:number;
        var duration:number = media.duration;

        if (byPercent) {
            if (this.isMasterDefined()) {
                duration = this.getMasterMedia().duration;
            }

            second = value * duration / 100;
        }
        else {
            second = value;
        }

        media.currentTime = second;
    }

    $$getAllProperties(property:string){
        const medias = {};
        let result;

        for (var id in this.medias) {
            //result[id] = this.medias[id][property];
            medias[id] = this.medias[id];
        }

        const nMedias = Object.keys(medias).length;
        switch (nMedias) {
            case 0:
                // Return default values until vgMedia is initialized
                switch (property) {
                    case 'state':
                        result = VgStates.VG_PAUSED;
                        break;

                    case 'playbackRate':
                    case 'volume':
                        result = 1;
                        break;

                    case 'time':
                        result = {current: 0, total: 0, left: 0};
                        break;
                }
                break;

            case 1:
                // If there's only one media element then return the plain value
                const firstMediaId = Object.keys(medias)[0];
                result = medias[firstMediaId][property];
                break;
                
            default:
                // TODO: return 'master' value
                var master = this.getMasterMedia();
                result = medias[master.id][property];
        }
        
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

    registerMedia(media:IPlayable) {
        this.medias[media.id] = media;
    }
}
