import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {MasterMedia} from './master-media';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule
    ],
    declarations: [MasterMedia],
    bootstrap: [MasterMedia]
})
export class AppModule {
}
