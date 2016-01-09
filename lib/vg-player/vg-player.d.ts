import { EventEmitter, ElementRef, OnInit } from 'angular2/core';
import { VgAPI } from '../services/vg-api';
export declare class VgPlayer implements OnInit {
    elem: HTMLElement;
    API: VgAPI;
    onPlayerReady: EventEmitter<any>;
    onMediaReady: EventEmitter<any>;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onVgMediaReady(event: any): void;
}
