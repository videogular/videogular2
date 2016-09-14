import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgBuffering} from './src/vg-buffering/vg-buffering';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgBuffering
    ],
    exports: [
        VgBuffering
    ]
})
export class VgBufferingModule {}
