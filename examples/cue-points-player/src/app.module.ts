import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {CuePointsPlayer} from './cue-points-player';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule
    ],
    declarations: [CuePointsPlayer],
    bootstrap: [CuePointsPlayer]
})
export class AppModule {
}
