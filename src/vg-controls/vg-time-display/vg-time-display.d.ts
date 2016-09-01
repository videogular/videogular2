import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgTimeDisplay extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    property: string;
    format: string;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    getTime(): number;
}
