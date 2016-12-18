declare namespace google {
    export namespace ima {
        
        /**
         * AdDisplayContainer
         */
        export class AdDisplayContainer {
            constructor(containerElement:HTMLElement);
            initialize():void;
        }

        /**
         * AdsLoader
         */
        export class AdsLoader {
            constructor(containerElement:AdDisplayContainer);
            contentComplete(): void;
            addEventListener(type:string, callback:(evt:AdsManagerLoadedEvent)=>void, useCapture?:boolean): any;
            requestAds(adsRequest:AdsRequest, opt_userRequestContext?:any):void;
        }
        
        /**
         * AdsManager
         */
        export class AdsManager {
            resize(width:number, height:number, viewMode:ViewMode):void;
            addEventListener(type:string, callback:(evt:AdsManagerLoadedEvent)=>void, useCapture?:boolean): any;
            init(width:number, height:number, viewMode:ViewMode, opt_videoElement?:HTMLVideoElement):void;
            start():void;
            getAdSkippableState():boolean;
            skip():void;
            destroy():void;
            getCuePoints():Array<number>;
        }
        
        /**
         * AdsManagerLoadedEvent
         */
        class AdsManagerLoadedEventTypes {
            ADS_MANAGER_LOADED;
        }
        export class AdsManagerLoadedEvent {
            static Type:AdsManagerLoadedEventTypes;
            getAdsManager(
                contentPlayback:{currentTime:number, duration:number}, 
                adsRenderingSettings?:AdsRenderingSettings
            ):AdsManager;
        }

        /**
         * AdsRenderingSettings
         */
        class AdsRenderingSettings {
        }
        
        /**
         * AdEvent
         */
        class AdEventType {
            CONTENT_PAUSE_REQUESTED;
            CONTENT_RESUME_REQUESTED;
            SKIPPABLE_STATE_CHANGED;
            ALL_ADS_COMPLETED;
            COMPLETE;
        }
        export class AdEvent {
            static Type:AdEventType;
        }
        
        /**
         * AdErrorEvent
         */
        class AdErrorEventTypes {
            AD_ERROR;
        }
        export class AdErrorEvent {
            static Type:AdErrorEventTypes;
        }
        
        /**
         * AdsRequest
         */
        export class AdsRequest {
            adTagUrl: string;
            linearAdSlotWidth: number;
            linearAdSlotHeight: number;
            nonLinearAdSlotWidth: number;
            nonLinearAdSlotHeight: number;
        }
        
        /**
         * ViewMode
         */
        export enum ViewMode {
            NORMAL,
            FULLSCREEN
        }
    }
}

declare namespace googletag {
    export namespace cmd {
        function push(command:Function):void;
    }
    
    export class Service {
    }
    
    export class CompanionAdsService extends Service {
        setRefreshUnfilledSlots(value:boolean):void;
    }
    
    export class PubAdsService extends Service {
        enableVideoAds():void;
    }
    
    export class GeneralSize {
    }
    
    export class Slot {
        addService(service: Service): Slot;
    }

    function defineSlot(adUnitPath:string, size:GeneralSize, opt_div:string): Slot;
    function companionAds(): CompanionAdsService;
    function pubads(): PubAdsService;
    function enableServices(): void;
}
