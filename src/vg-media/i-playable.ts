import {Observable} from "rxjs/Observable";

export interface IPlayable {
    id:string;
    elem:any;
    time:any;
    buffer:any;
    canPlay:boolean;
    canPlayThrough:boolean;
    isMetadataLoaded:boolean;
    isWaiting:boolean;
    isCompleted:boolean;
    state:string;
    subscriptions:IMediaSubscriptions;
    duration:number;
    currentTime:number;
    dispatchEvent?:Function;
}

export interface IMediaSubscriptions {
    canPlay: Observable<any>;
    canPlayThrough: Observable<any>;
    loadedMetadata: Observable<any>;
    waiting: Observable<any>;
    progress: Observable<any>;
    ended: Observable<any>;
    playing: Observable<any>;
    play: Observable<any>;
    pause: Observable<any>;
    timeUpdate: Observable<any>;
    volumeChange: Observable<any>;
    error: Observable<any>;
    startAds: Observable<any>;
    endAds: Observable<any>;
}