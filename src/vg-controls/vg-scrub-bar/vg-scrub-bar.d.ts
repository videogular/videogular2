import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgScrubBar extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onMouseDownScrubBar($event: any): void;
}
