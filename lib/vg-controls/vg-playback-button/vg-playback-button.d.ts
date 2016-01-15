import { OnInit, ElementRef } from 'angular2/core';
import { VgAPI } from '../../services/vg-api';
export declare class VgPlaybackButton implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    playbackValues: Array<string>;
    playbackIndex: number;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onClick(): void;
}
