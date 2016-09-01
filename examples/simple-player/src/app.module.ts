import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {SimplePlayer} from './simple-player';

@NgModule({
    imports: [
        BrowserModule,
        VgCore
    ],
    declarations: [SimplePlayer],
    bootstrap: [SimplePlayer]
})
export class AppModule {
}
