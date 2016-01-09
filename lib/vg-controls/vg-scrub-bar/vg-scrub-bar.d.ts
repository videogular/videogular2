import { ElementRef, OnInit } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgScrubBar implements OnInit {
    API: VgAPI;
    elem: any;
    target: any;
    vgFor: string;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onMouseDownScrubBar($event: any): void;
}
