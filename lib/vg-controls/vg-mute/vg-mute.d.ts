import { OnInit } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgMute implements OnInit {
    API: VgAPI;
    currentVolume: number;
    target: any;
    vgFor: string;
    constructor(API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
    getVolume(): any;
}
