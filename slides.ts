import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgSlides} from './src/vg-slides/vg-slides';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgSlides
    ],
    exports: [
        VgSlides
    ]
})
export class VgSlidesModule {}
