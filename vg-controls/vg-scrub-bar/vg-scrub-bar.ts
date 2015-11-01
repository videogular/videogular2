import {Component, View, ElementRef, OnInit, ViewEncapsulation} from 'angular2/angular2';

import {VgAPI} from '../../api';

@Component({
    selector: 'vg-scrub-bar',
    inputs: [
        'targetId: for'
    ],
    host: {
        '(mousedown)': 'onMouseDownScrubBar($event)'
    }
})
@View({
    template: `<ng-content></ng-content>`,
    styleUrls: ['../node_modules/videogular2/vg-controls/vg-scrub-bar/vg-scrub-bar.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class VgScrubBar implements OnInit {
    elem: any;
    target: any;
    targetId: string;

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    onInit() {
        this.target = this.API.getMediaById(this.targetId);
    }

    onMouseDownScrubBar($event) {
        var percentage = $event.offsetX * 100 / this.elem.scrollWidth;

        this.target.seekTime(percentage, true);
    }
}
