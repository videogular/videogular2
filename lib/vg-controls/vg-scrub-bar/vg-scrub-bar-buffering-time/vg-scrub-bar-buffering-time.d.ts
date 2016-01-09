import { OnInit } from 'angular2/core';
import { VgAPI } from '../../../services/vg-api';
export declare class VgScrubBarBufferingTime implements OnInit {
    API: VgAPI;
    target: any;
    vgFor: string;
    constructor(API: VgAPI);
    ngOnInit(): void;
    getBufferTime(): string;
}
