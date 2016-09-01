import {Injectable} from '@angular/core';

@Injectable()
export class VgStates {
    static VG_ENDED: string = 'ended';
    static VG_PAUSED: string = 'paused';
    static VG_PLAYING: string = 'playing';
    static VG_LOADING: string = 'waiting';
}
