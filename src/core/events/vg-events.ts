import {Injectable} from '@angular/core';

@Injectable()
export class VgEvents {
    static VG_ABORT: string = 'abort';
    static VG_CAN_PLAY: string = 'canplay';
    static VG_CAN_PLAY_THROUGH: string = 'canplaythrough';
    static VG_DURATION_CHANGE: string = 'durationchange';
    static VG_EMPTIED: string = 'emptied';
    static VG_ENCRYPTED: string = 'encrypted';
    static VG_ENDED: string = 'ended';
    static VG_ERROR: string = 'error';
    static VG_LOADED_DATA: string = 'loadeddata';
    static VG_LOADED_METADATA: string = 'loadedmetadata';
    static VG_LOAD_START: string = 'loadstart';
    static VG_PAUSE: string = 'pause';
    static VG_PLAY: string = 'play';
    static VG_PLAYING: string = 'playing';
    static VG_PROGRESS: string = 'progress';
    static VG_RATE_CHANGE: string = 'ratechange';
    static VG_SEEK: string = 'seek';
    static VG_SEEKED: string = 'seeked';
    static VG_SEEKING: string = 'seeking';
    static VG_STALLED: string = 'stalled';
    static VG_SUSPEND: string = 'suspend';
    static VG_TIME_UPDATE: string = 'timeupdate';
    static VG_VOLUME_CHANGE: string = 'volumechange';
    static VG_WAITING: string = 'waiting';
    
    static VG_LOAD: string = 'load';
    static VG_ENTER: string = 'enter';
    static VG_EXIT: string = 'exit';

    static VG_START_ADS: string = 'startads';
    static VG_END_ADS: string = 'endads';
}
