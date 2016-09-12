declare namespace google {
    namespace ima {
        /**
         * AdDisplayContainer
         */
        class AdDisplayContainer {
            constructor(containerElement: HTMLElement);
            initialize(): void;
        }
        /**
         * AdsLoader
         */
        class AdsLoader {
            constructor(containerElement: AdDisplayContainer);
            contentComplete(): void;
            addEventListener(type: string, callback: (evt: AdsManagerLoadedEvent) => void, useCapture?: boolean): any;
            requestAds(adsRequest: AdsRequest, opt_userRequestContext?: any): void;
        }
        /**
         * AdsManager
         */
        class AdsManager {
            resize(width: number, height: number, viewMode: ViewMode): void;
            addEventListener(type: string, callback: (evt: AdsManagerLoadedEvent) => void, useCapture?: boolean): any;
            init(width: number, height: number, viewMode: ViewMode, opt_videoElement?: HTMLVideoElement): void;
            start(): void;
            getAdSkippableState(): boolean;
            skip(): void;
            destroy(): void;
            getCuePoints(): Array<number>;
        }
        /**
         * AdsManagerLoadedEvent
         */
        class AdsManagerLoadedEventTypes {
            ADS_MANAGER_LOADED: any;
        }
        class AdsManagerLoadedEvent {
            static Type: AdsManagerLoadedEventTypes;
            getAdsManager(contentPlayback: {
                currentTime: number;
                duration: number;
            }, adsRenderingSettings?: AdsRenderingSettings): AdsManager;
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
            CONTENT_PAUSE_REQUESTED: any;
            CONTENT_RESUME_REQUESTED: any;
            SKIPPABLE_STATE_CHANGED: any;
            ALL_ADS_COMPLETED: any;
            COMPLETE: any;
        }
        class AdEvent {
            static Type: AdEventType;
        }
        /**
         * AdErrorEvent
         */
        class AdErrorEventTypes {
            AD_ERROR: any;
        }
        class AdErrorEvent {
            static Type: AdErrorEventTypes;
        }
        /**
         * AdsRequest
         */
        class AdsRequest {
            adTagUrl: string;
            linearAdSlotWidth: number;
            linearAdSlotHeight: number;
            nonLinearAdSlotWidth: number;
            nonLinearAdSlotHeight: number;
        }
        /**
         * ViewMode
         */
        enum ViewMode {
            NORMAL,
            FULLSCREEN,
        }
    }
}
declare namespace googletag {
    namespace cmd {
        function push(command: Function): void;
    }
    class Service {
    }
    class CompanionAdsService extends Service {
        setRefreshUnfilledSlots(value: boolean): void;
    }
    class PubAdsService extends Service {
        enableVideoAds(): void;
    }
    class GeneralSize {
    }
    class Slot {
        addService(service: Service): Slot;
    }
    function defineSlot(adUnitPath: string, size: GeneralSize, opt_div: string): Slot;
    function companionAds(): CompanionAdsService;
    function pubads(): PubAdsService;
    function enableServices(): void;
}
