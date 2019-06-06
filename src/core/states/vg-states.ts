import {Injectable} from '@angular/core';

@Injectable()
export class VgStates {
    static VG_ENDED = 'ended';
    static VG_PAUSED = 'paused';
    static VG_PLAYING = 'playing';
    static VG_LOADING = 'waiting';
}
