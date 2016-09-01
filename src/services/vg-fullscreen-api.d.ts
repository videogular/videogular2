import { EventEmitter, QueryList } from '@angular/core';
import { VgMedia } from "../vg-media/vg-media";
export declare class VgFullscreenAPI {
    static polyfill: any;
    static onchange: string;
    static onerror: string;
    static nativeFullscreen: boolean;
    static isFullscreen: boolean;
    static isAvailable: boolean;
    static videogularElement: HTMLElement;
    static medias: QueryList<VgMedia>;
    static onChangeFullscreen: EventEmitter<any>;
    static init(elem: HTMLElement, medias: QueryList<VgMedia>): void;
    static toggleFullscreen(element?: any): void;
    static request(elem: any): void;
    static enterElementInFullScreen(elem: any): void;
    static exit(): void;
}
