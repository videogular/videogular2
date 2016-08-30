import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgFullscreenAPI } from "../../services/vg-fullscreen-api";
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgFullscreen extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    fsAPI: VgFullscreenAPI;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onClick(): void;
}
