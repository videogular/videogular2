import { OnInit, ElementRef } from 'angular2/core';
import { VgAPI } from '../../../services/vg-api';
export declare class VgScrubBarCurrentTime implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    getPercentage(): string;
}
