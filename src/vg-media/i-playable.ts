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
    subscriptions:any;
    duration:number;
    currentTime:number;
}
