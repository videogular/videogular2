import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgMute extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    currentVolume: number;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onClick(): void;
    getVolume(): any;
}
