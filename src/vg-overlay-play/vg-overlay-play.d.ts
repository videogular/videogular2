import { OnInit, ElementRef } from '@angular/core';
import { VgAPI } from '../services/vg-api';
export declare class VgOverlayPlay implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
    getState(): string;
}
