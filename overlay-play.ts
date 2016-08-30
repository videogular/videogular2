import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgOverlayPlay} from './src/vg-overlay-play/vg-overlay-play';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgOverlayPlay
    ],
    exports: [
        VgOverlayPlay
    ]
})
export class VgOverlayPlayModule {}
