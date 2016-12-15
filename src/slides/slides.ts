import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgSlides} from './vg-slides';
import {SlideModel} from './slide-model';

export * from './slide-model';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ VgSlides ],
    providers: [ SlideModel ],
    exports: [ VgSlides ]
})
export class VgSlidesModule {}
