import { OnInit } from 'angular2/angular2';
import { VgAPI } from '../../api';
export declare class VgFullscreen implements OnInit {
    API: VgAPI;
    target: Object;
    targetId: string;
    constructor(API: VgAPI);
    onInit(): void;
    onClick(): void;
}
