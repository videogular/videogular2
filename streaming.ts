import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgDASH } from "./src/vg-dash/vg-dash";
import { VgHLS } from "./src/vg-hls/vg-hls";

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
