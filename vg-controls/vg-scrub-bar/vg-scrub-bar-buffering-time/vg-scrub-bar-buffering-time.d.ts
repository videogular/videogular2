import { OnInit } from 'angular2/angular2';
import { VgAPI } from '../../../api';
export declare class VgScrubBarBufferingTime implements OnInit {
    API: VgAPI;
    target: any;
    targetId: string;
    constructor(API: VgAPI);
    onInit(): void;
    getBufferTime(): string;
}
