import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export interface Option {
    id: string;
    label: string;
    selected: boolean;
}
export declare class VgTrackSelector extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    tracks: Array<Option>;
    trackSelected: string;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    selectTrack(trackId: string): void;
}
