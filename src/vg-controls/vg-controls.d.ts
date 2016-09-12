import { ElementRef } from '@angular/core';
import { VgAPI } from "../services/vg-api";
import { VgAbstractControl } from './vg-abstract-control';
export declare class VgControls extends VgAbstractControl {
    private API;
    private ref;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    isAdsPlaying: string;
    hideControls: boolean;
    autohide: boolean;
    autohideTime: number;
    private timer;
    constructor(API: VgAPI, ref: ElementRef);
    onPlayerReady(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onStartAds(): void;
    onEndAds(): void;
    hide(): void;
    show(): void;
    private hideAsync();
}
