import { OnInit, ElementRef } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgPlayPause implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
    getState(): any;
}
