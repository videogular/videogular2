import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgFullscreen extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    isFullscreen: boolean;
    constructor(ref: ElementRef, API: VgAPI);
    onChangeFullscreen(fsState: boolean): void;
    onPlayerReady(): void;
    onClick(): void;
}
