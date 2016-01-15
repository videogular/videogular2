import { ElementRef, OnInit } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgScrubBar implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onMouseDownScrubBar($event: any): void;
}
