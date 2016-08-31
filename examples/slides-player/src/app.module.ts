import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgSlidesModule} from 'videogular2/slides';
import {SlidesPlayer} from './slides-player';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule,
        VgSlidesModule
    ],
    declarations: [SlidesPlayer],
    bootstrap: [SlidesPlayer]
})
export class AppModule {
}
