import { ElementRef } from '@angular/core';
import { VgAPI } from '../services/vg-api';
import { IPlayable } from "../vg-media/i-playable";
export declare class VgBuffering {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: IPlayable;
    checkBufferInterval: number;
    displayState: string;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    checkInterval: number;
    currentPlayPos: number;
    lastPlayPos: number;
    bufferingDetected: boolean;
    bufferCheck(): void;
    startBufferCheck(): void;
    stopBufferCheck(): void;
    show(): void;
    hide(): void;
}
