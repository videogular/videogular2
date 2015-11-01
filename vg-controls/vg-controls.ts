import {Component, View, ViewEncapsulation} from 'angular2/angular2';

import {VgAPI} from '../api';

@Component({
    selector: 'vg-controls'
})
@View({
    template: `<ng-content></ng-content>`,
    styleUrls: ['../node_modules/videogular2/vg-controls/vg-controls.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VgControls {
    constructor(public API:VgAPI) {

    }
}
