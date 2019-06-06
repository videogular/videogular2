import {Injectable} from '@angular/core';

@Injectable()
export class VgEvents {
    static VG_ABORT = 'abort';
    static VG_CAN_PLAY = 'canplay';
    static VG_CAN_PLAY_THROUGH = 'canplaythrough';
    static VG_DURATION_CHANGE = 'durationchange';
    static VG_EMPTIED = 'emptied';
    static VG_ENCRYPTED = 'encrypted';
    static VG_ENDED = 'ended';
    static VG_ERROR = 'error';
    static VG_LOADED_DATA = 'loadeddata';
    static VG_LOADED_METADATA = 'loadedmetadata';
    static VG_LOAD_START = 'loadstart';
    static VG_PAUSE = 'pause';
    static VG_PLAY = 'play';
    static VG_PLAYING = 'playing';
    static VG_PROGRESS = 'progress';
    static VG_RATE_CHANGE = 'ratechange';
    static VG_SEEK = 'seek';
    static VG_SEEKED = 'seeked';
    static VG_SEEKING = 'seeking';
    static VG_STALLED = 'stalled';
    static VG_SUSPEND = 'suspend';
    static VG_TIME_UPDATE = 'timeupdate';
    static VG_VOLUME_CHANGE = 'volumechange';
    static VG_WAITING = 'waiting';
    
    static VG_LOAD = 'load';
    static VG_ENTER = 'enter';
    static VG_EXIT = 'exit';

    static VG_START_ADS = 'startads';
    static VG_END_ADS = 'endads';
}
