import { OnInit } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgPlaybackButton implements OnInit {
    API: VgAPI;
    playbackValues: Array<string>;
    playbackIndex: number;
    target: any;
    vgFor: string;
    constructor(API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
}
