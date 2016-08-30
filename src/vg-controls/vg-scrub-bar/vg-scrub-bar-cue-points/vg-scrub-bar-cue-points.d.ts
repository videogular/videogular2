import { OnChanges, ElementRef, SimpleChange } from "@angular/core";
import { VgAPI } from "../../../services/vg-api";
import { VgAbstractControl } from '../../vg-abstract-control';
export declare class VgScrubBarCuePoints extends VgAbstractControl implements OnChanges {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: any;
    onLoadedMetadataCalled: boolean;
    cuePoints: TextTrackCueList;
    constructor(ref: ElementRef, API: VgAPI);
    onPlayerReady(): void;
    onLoadedMetadata(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
}
