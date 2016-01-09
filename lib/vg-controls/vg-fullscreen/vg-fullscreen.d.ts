import { OnInit } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgFullscreen implements OnInit {
    API: VgAPI;
    target: Object;
    vgFor: string;
    constructor(API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
}
