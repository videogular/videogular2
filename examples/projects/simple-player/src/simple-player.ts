import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {VgPlayer, VgMedia, VgAPI} from "videogular2/core";

@Component({
    selector: 'simple-player',
    templateUrl: 'src/simple-player.html',
    providers: [VgAPI],
    directives: [
        VgPlayer,
        VgMedia
    ]
})
export class SimplePlayer {}

bootstrap(SimplePlayer, []);