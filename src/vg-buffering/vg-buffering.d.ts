import { ElementRef } from '@angular/core';
import { VgAPI } from '../services/vg-api';
import { IPlayable } from "../vg-media/i-playable";
export declare class VgBuffering {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: IPlayable;
    checkBufferInterval: number;
    checkInterval: number;
    currentPlayPos: number;
    lastPlayPos: number;
    bufferingDetected: boolean;
    displayState: string;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onUpdateBuffer(isBuffering: any): void;
    show(): void;
    hide(): void;
}
