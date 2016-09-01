import { ElementRef, Renderer } from '@angular/core';
import { VgAPI } from "../services/vg-api";
export declare class VgControls {
    private api;
    private element;
    private renderer;
    autohide: boolean;
    autohideTime: number;
    private timer;
    constructor(api: VgAPI, element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    hide(): void;
    show(): void;
    private hideAsync();
}
