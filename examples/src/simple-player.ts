import {Component} from 'angular2/core';
import {VgPlayer} from 'videogular2/core';

@Component({
    selector: 'simple-player',
    templateUrl: 'src/simple-player.html',
    directives: [
        VgPlayer
    ]
})
export class SimplePlayer {}
