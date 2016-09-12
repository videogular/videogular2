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
    subscriptions:any;
    duration:number;
    currentTime:number;
    dispatchEvent?:Function;
}
