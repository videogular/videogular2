import { OnInit } from 'angular2/angular2';
import { VgAPI } from '../../api';
export declare class VgPlaybackButton implements OnInit {
    API: VgAPI;
    playbackValues: Array<string>;
    playbackIndex: number;
    target: any;
    targetId: string;
    constructor(API: VgAPI);
    onInit(): void;
    onClick(): void;
}
