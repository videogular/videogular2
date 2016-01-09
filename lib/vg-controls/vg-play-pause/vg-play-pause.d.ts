import { OnInit } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgPlayPause implements OnInit {
    API: VgAPI;
    target: any;
    vgFor: string;
    constructor(API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
    getState(): any;
}
