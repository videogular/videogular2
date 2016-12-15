import {Injectable, EventEmitter, QueryList} from '@angular/core';
import {VgUtils} from "./vg-utils";
import {VgMedia} from "../vg-media/vg-media";

@Injectable()
export class VgFullscreenAPI {
    static polyfill:any;
    static onchange:string;
    static onerror:string;
    static nativeFullscreen:boolean = true;
    static isFullscreen:boolean = false;
    static isAvailable:boolean;
    static videogularElement:HTMLElement;
    static medias:QueryList<VgMedia>;

    static onChangeFullscreen:EventEmitter<any> = new EventEmitter();

    static init(elem:HTMLElement, medias:QueryList<VgMedia>) {
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

        this.isAvailable = (this.polyfill != null);
    }

    static toggleFullscreen(element:any = null) {
        if (this.isFullscreen) {
            this.exit();
        }
        else {
            this.request(element);
        }
    }

    static request(elem:any) {
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
                if (!this.polyfill.enabled && elem === this.videogularElement) {
                    elem = this.medias[0];
                }

                this.enterElementInFullScreen(elem);
            }
            else {
                this.enterElementInFullScreen(this.videogularElement);
            }
        }
    }

    static enterElementInFullScreen(elem:any) {
        elem[this.polyfill.request]();
    }

    static exit() {
        this.isFullscreen = false;
        this.onChangeFullscreen.next(false);

        // Exit from native fullscreen
        if (this.isAvailable && this.nativeFullscreen) {
            document[this.polyfill.exit]();
        }
    }
}
