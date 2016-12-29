import { Directive, Output, Input, EventEmitter, ElementRef, OnInit } from "@angular/core";
import {VgEvents} from '../events/vg-events';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';

@Directive({
    selector: '[vgCuePoints]'
})
export class VgCuePoints implements OnInit {
    @Output('onEnterCuePoint') onEnterCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onUpdateCuePoint') onUpdateCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onExitCuePoint') onExitCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onCompleteCuePoint') onCompleteCuePoint:EventEmitter<any> = new EventEmitter();

    constructor(public ref:ElementRef) {

    }

    ngOnInit() {
        let onLoad = Observable.fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
        onLoad.subscribe(this.onLoad.bind(this));
    }

    onLoad(event:any) {
        let cues = event.target.track.cues;

        this.ref.nativeElement.cues = cues;

        for (let i=0, l=cues.length; i<l; i++) {
            let onEnter = Observable.fromEvent(cues[i], VgEvents.VG_ENTER);
            onEnter.subscribe(this.onEnter.bind(this));

            let onExit = Observable.fromEvent(cues[i], VgEvents.VG_EXIT);
            onExit.subscribe(this.onExit.bind(this));
        }
    }

    onEnter(event:any) {
        this.onEnterCuePoint.next(event.target);
    }

    onExit(event:any) {
        this.onExitCuePoint.next(event.target);
    }
}
