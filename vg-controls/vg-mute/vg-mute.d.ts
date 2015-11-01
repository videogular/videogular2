import { OnInit } from 'angular2/angular2';
import { VgAPI } from '../../api';
export declare class VgMute implements OnInit {
    API: VgAPI;
    currentVolume: number;
    target: any;
    targetId: string;
    constructor(API: VgAPI);
    onInit(): void;
    onClick(): void;
    getVolume(): any;
}
