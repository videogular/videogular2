export interface IPlayable {
    id:string;
    time:any;
    buffer:any;
    canPlay:boolean;
    canPlayThrough:boolean;
    isMetadataLoaded:boolean;
    isWaiting:boolean;
    isCompleted:boolean;
    state:string;
    seekTime:Function;
    subscriptions:any;
    duration:number;
    currentTime:number;
    addListener:Function;
    removeListener:Function;
}