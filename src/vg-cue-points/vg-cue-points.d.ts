import { EventEmitter, ElementRef } from "@angular/core";
export declare class VgCuePoints {
    ref: ElementRef;
    onEnterCuePoint: EventEmitter<any>;
    onUpdateCuePoint: EventEmitter<any>;
    onExitCuePoint: EventEmitter<any>;
    onCompleteCuePoint: EventEmitter<any>;
    constructor(ref: ElementRef);
    ngOnInit(): void;
    onLoad(event: any): void;
    onEnter(event: any): void;
    onExit(event: any): void;
}
