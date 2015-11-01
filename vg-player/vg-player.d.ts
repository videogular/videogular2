import { EventEmitter, ElementRef, OnInit } from 'angular2/angular2';
import { VgAPI } from '../api';
export declare class VgPlayer implements OnInit {
    elem: HTMLElement;
    API: VgAPI;
    onPlayerReady: EventEmitter;
    onMediaReady: EventEmitter;
    constructor(ref: ElementRef, API: VgAPI);
    onInit(): void;
    onVgMediaReady(event: any): void;
}
