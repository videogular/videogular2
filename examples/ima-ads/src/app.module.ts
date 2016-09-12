import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgImaAdsModule} from 'videogular2/ima-ads';
import {ImaAds} from './ima-ads';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule,
        VgOverlayPlayModule,
        VgImaAdsModule
    ],
    declarations: [ImaAds],
    bootstrap: [ImaAds]
})
export class AppModule {
}
