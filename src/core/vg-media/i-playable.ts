import { Observable ,  Subject } from 'rxjs';

export interface IPlayable {
    id: string;
    elem: any;
    time: any;
    buffer: any;
    track?: any;
    canPlay: boolean;
    canPlayThrough: boolean;
    isMetadataLoaded: boolean;
    isWaiting: boolean;
    isCompleted: boolean;
    isLive: boolean;
    textTracks: TextTrackList;
    state: string;
    subscriptions: IMediaSubscriptions;
    duration: number;
    currentTime: number;
    play: Function;
    pause: Function;
    addTextTrack?: Function;
    dispatchEvent?: Function;
}

export interface IMediaSubscriptions {
    abort: Observable<any>;
    bufferDetected: Subject<boolean>;
    canPlay: Observable<any>;
    canPlayThrough: Observable<any>;
    durationChange: Observable<any>;
    emptied: Observable<any>;
    encrypted: Observable<any>;
    ended: Observable<any>;
    error: Observable<any>;
    loadedData: Observable<any>;
    loadedMetadata: Observable<any>;
    loadStart: Observable<any>;
    pause: Observable<any>;
    play: Observable<any>;
    playing: Observable<any>;
    progress: Observable<any>;
    rateChange: Observable<any>;
    seeked: Observable<any>;
    seeking: Observable<any>;
    stalled: Observable<any>;
    suspend: Observable<any>;
    timeUpdate: Observable<any>;
    volumeChange: Observable<any>;
    waiting: Observable<any>;

    // to observe the ads
    startAds: Observable<any>;
    endAds: Observable<any>;
}
