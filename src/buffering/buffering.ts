import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VgBuffering } from './vg-buffering';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgBuffering
    ],
    exports: [
        VgBuffering
    ]
})
export class VgBufferingModule {
}
