import {Injectable, EventEmitter, QueryList} from '@angular/core';
import {VgUtils} from "./vg-utils";
import {VgMedia} from "../vg-media/vg-media";

@Injectable()
export class VgFullscreenAPI {
    polyfill:any;
    onchange:string;
    onerror:string;
    nativeFullscreen:boolean = true;
    isFullscreen:boolean = false;
    isAvailable:boolean;
    videogularElement:HTMLElement;
    medias:QueryList<VgMedia>;

    onChangeFullscreen:EventEmitter<any> = new EventEmitter();

    constructor() {}

    init(elem:HTMLElement, medias:QueryList<VgMedia>) {
        this.videogularElement = elem;
        this.medias = medias;

        const APIs = {
            w3: {
                enabled: 'fullscreenEnabled',
                element: 'fullscreenElement',
                request: 'requestFullscreen',
                exit: 'exitFullscreen',
                onchange: 'fullscreenchange',
                onerror: 'fullscreenerror'
            },
            newWebkit: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitRequestFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            oldWebkit: {
                enabled: 'webkitIsFullScreen',
                element: 'webkitCurrentFullScreenElement',
                request: 'webkitRequestFullScreen',
                exit: 'webkitCancelFullScreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            moz: {
                enabled: 'mozFullScreen',
                element: 'mozFullScreenElement',
                request: 'mozRequestFullScreen',
                exit: 'mozCancelFullScreen',
                onchange: 'mozfullscreenchange',
                onerror: 'mozfullscreenerror'
            },
            ios: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitEnterFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            ms: {
                enabled: 'msFullscreenEnabled',
                element: 'msFullscreenElement',
                request: 'msRequestFullscreen',
                exit: 'msExitFullscreen',
                onchange: 'MSFullscreenChange',
                onerror: 'MSFullscreenError'
            }
        };

        for (let browser in APIs) {
            if (APIs[browser].enabled in document) {
                this.polyfill = APIs[browser];
                break;
            }
        }

        if (VgUtils.isiOSDevice()) {
            this.polyfill = APIs.ios
        }

        this.isAvailable = (this.polyfill != null);
    }

    toggleFullscreen(element:any = null) {
        if (this.isFullscreen) {
            this.exit();
        }
        else {
            this.request(element);
        }
    }

    request(elem:any) {
        if (!elem) {
            elem = this.videogularElement;
        }

        this.isFullscreen = true;
        this.onChangeFullscreen.next(true);

        // Perform native full screen support
        if (this.isAvailable && this.nativeFullscreen) {
            // Fullscreen for mobile devices
            if (VgUtils.isMobileDevice()) {
                // We should make fullscreen the video object if it doesn't have native fullscreen support
                // Fallback! We can't set vg-player on fullscreen, only video/audio objects
                if ((!this.polyfill.enabled && elem === this.videogularElement) || VgUtils.isiOSDevice()) {
                    elem = this.medias.toArray()[0].elem;
                }

                this.enterElementInFullScreen(elem);
            }
            else {
                this.enterElementInFullScreen(this.videogularElement);
            }
        }
    }

    enterElementInFullScreen(elem:any) {
        elem[this.polyfill.request]();
    }

    exit() {
        this.isFullscreen = false;
        this.onChangeFullscreen.next(false);

        // Exit from native fullscreen
        if (this.isAvailable && this.nativeFullscreen) {
            document[this.polyfill.exit]();
        }
    }
}
