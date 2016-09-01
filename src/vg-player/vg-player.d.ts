import { EventEmitter, ElementRef, QueryList, AfterContentInit } from "@angular/core";
import { VgAPI } from "../services/vg-api";
import { VgMedia } from "../vg-media/vg-media";
export declare class VgPlayer implements AfterContentInit {
    elem: HTMLElement;
    api: VgAPI;
    isFullscreen: boolean;
    zIndex: string;
    onPlayerReady: EventEmitter<any>;
    onMediaReady: EventEmitter<any>;
    medias: QueryList<VgMedia>;
    constructor(ref: ElementRef, api: VgAPI);
    ngAfterContentInit(): void;
    onChangeFullscreen(fsState: any): void;
}
