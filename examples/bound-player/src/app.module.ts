import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {BoundPlayer} from './bound-player';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        VgCore,
        VgControlsModule
    ],
    declarations: [BoundPlayer],
    bootstrap: [BoundPlayer]
})
export class AppModule {
}
