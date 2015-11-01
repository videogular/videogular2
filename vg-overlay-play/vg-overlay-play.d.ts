import { OnInit } from 'angular2/angular2';
import { VgAPI } from '../api';
export declare class VgOverlayPlay implements OnInit {
    API: VgAPI;
    target: any;
    targetId: string;
    constructor(API: VgAPI);
    onInit(): void;
    onClick(): void;
    getState(): any;
}
