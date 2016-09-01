import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgPlaybackButton extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    playbackValues: Array<string>;
    playbackIndex: number;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onClick(): void;
    getPlaybackRate(): any;
}
