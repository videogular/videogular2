import { OnInit, ElementRef } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgMute implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    currentVolume: number;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
    getVolume(): any;
}
