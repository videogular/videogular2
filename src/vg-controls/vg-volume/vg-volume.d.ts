import { ElementRef } from '@angular/core';
import { VgAPI } from '../../services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';
export declare class VgVolume extends VgAbstractControl {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    isDragging: boolean;
    mouseDownPosX: number;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onMouseDown(event: {
        x: number;
    }): void;
    onDrag(event: {
        x: number;
    }): void;
    onStopDrag(event: {
        x: number;
    }): void;
    calculateVolume(mousePosX: number): number;
    setVolume(vol: number): void;
    getVolume(): number;
}
