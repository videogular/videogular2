import { OnInit, ElementRef } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgFullscreen implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
}
