import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgDASH } from "./vg-dash/vg-dash";
import { VgHLS } from "./vg-hls/vg-hls";

export interface IDRMLicenseServer {
    [index: string]: {
        serverURL: string;
    }
}

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgDASH, VgHLS
    ],
    exports: [
        VgDASH, VgHLS
    ]
})
export class VgStreamingModule {}
