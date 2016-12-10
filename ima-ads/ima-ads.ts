import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgImaAds} from './vg-ima-ads';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgImaAds
    ],
    exports: [
        VgImaAds
    ]
})
export class VgImaAdsModule {}
