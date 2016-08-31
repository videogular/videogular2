import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {SingleMediaPlayer} from './single-media-player';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule,
        VgOverlayPlayModule
    ],
    declarations: [SingleMediaPlayer],
    bootstrap: [SingleMediaPlayer]
})
export class AppModule {
}
