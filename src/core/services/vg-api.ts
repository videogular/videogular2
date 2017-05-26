import {Injectable, EventEmitter} from '@angular/core';
import {IPlayable} from "../vg-media/i-playable";
import {VgStates} from "../states/vg-states";
import { VgFullscreenAPI } from './vg-fullscreen-api';

@Injectable()
export class VgAPI {
    medias:Object = {};// TODO: refactor to Set<IPlayable> 
    videogularElement: any;
    playerReadyEvent: EventEmitter<any> = new EventEmitter(true);
    isPlayerReady: boolean = false;
    fsAPI: VgFullscreenAPI;

    constructor() {

    }

    onPlayerReady(fsAPI: VgFullscreenAPI) {
        this.fsAPI = fsAPI;
        this.isPlayerReady = true;
        this.playerReadyEvent.emit(this);
    }

    getDefaultMedia():IPlayable {
        for (let item in this.medias) {
            if (this.medias[item]) {
                return this.medias[item];
            }
        }
    }

    getMasterMedia():IPlayable {
        let master:any;
        for (let id in this.medias) {
            if (this.medias[id].vgMedia === 'true' || this.medias[id].vgMedia === true) {
                master = this.medias[id];
                break;
            }
        }
        return master || this.getDefaultMedia();
    }

    isMasterDefined():boolean {
        let result = false;
        for (let id in this.medias) {
            if (this.medias[id].vgMedia === 'true' || this.medias[id].vgMedia === true) {
                result = true;
                break;
            }
        }
        return result;
    }

    getMediaById(id:string = null):IPlayable {
        let media = this.medias[id];

        if (!id || id === '*') {
            media = this;
        }

        return media;
    }

    play() {
        for (let id in this.medias) {
            if (this.medias[id]) {
                this.medias[ id ].play();
            }
        }
    }

    pause() {
        for (let id in this.medias) {
            if (this.medias[id]) {
                this.medias[id].pause();
            }
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

    get isLive() {
        return this.$$getAllProperties('isLive');
    }

    get isMaster() {
        return this.$$getAllProperties('isMaster');
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

    get textTracks() {
        return this.$$getAllProperties('textTracks');
    }

    seekTime(value:number, byPercent:boolean = false) {
        for (let id in this.medias) {
            if (this.medias[id]) {
                this.$$seek(this.medias[ id ], value, byPercent);
            }
        }
    }

    $$seek(media:IPlayable, value:number, byPercent:boolean = false) {
        let second:number;
        let duration:number = media.duration;

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

    addTextTrack(type:string, label?:string, language?:string) {
        for (let id in this.medias) {
            if (this.medias[id]) {
                this.$$addTextTrack(this.medias[ id ], type, label, language);
            }
        }
    }
    $$addTextTrack(media:IPlayable, type:string, label?:string, language?:string) {
        media.addTextTrack(type, label, language);
    }

    $$getAllProperties(property:string){
        const medias = {};
        let result:any;

        for (let id in this.medias) {
            if (this.medias[id]) {
                medias[ id ] = this.medias[ id ];
            }
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
                let master = this.getMasterMedia();
                result = medias[master.id][property];
        }
        
        return result;
    }

    $$setAllProperties(property:string, value:any){
        for (let id in this.medias) {
            if (this.medias[id]) {
                this.medias[ id ][ property ] = value;
            }
        }
    }

    registerElement(elem:HTMLElement) {
        this.videogularElement = elem;
    }

    registerMedia(media:IPlayable) {
        this.medias[media.id] = media;
    }

    unregisterMedia(media:IPlayable) {
        delete this.medias[media.id];
    }


}
