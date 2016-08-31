import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {AudioPlayer} from './audio-player';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule
    ],
    declarations: [AudioPlayer],
    bootstrap: [AudioPlayer]
})
export class AppModule {
}
