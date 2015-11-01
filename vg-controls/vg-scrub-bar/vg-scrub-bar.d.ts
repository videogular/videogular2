import { ElementRef, OnInit } from 'angular2/angular2';
import { VgAPI } from '../../api';
export declare class VgScrubBar implements OnInit {
    API: VgAPI;
    elem: any;
    target: any;
    targetId: string;
    constructor(ref: ElementRef, API: VgAPI);
    onInit(): void;
    onMouseDownScrubBar($event: any): void;
}
