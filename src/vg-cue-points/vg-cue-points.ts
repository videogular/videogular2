import {Directive, Output, Input, EventEmitter, ElementRef} from "angular2/core";
import {VgEvents} from '../events/vg-events';
import {Observable} from 'rxjs/Rx';

@Directive({
    selector: '[vgCuePoints]'
})
export class VgCuePoints {
    @Output('onEnterCuePoint') onEnterCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onUpdateCuePoint') onUpdateCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onExitCuePoint') onExitCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onCompleteCuePoint') onCompleteCuePoint:EventEmitter<any> = new EventEmitter();

    constructor(public ref:ElementRef) {

    }

    ngOnInit() {
        var onLoad = Observable.fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
        onLoad.subscribe(this.onLoad.bind(this));
    }

    onLoad(event) {
        var cues = event.target.track.cues;

        this.ref.nativeElement.cues = cues;

        for (var i:number=0, l:number=cues.length; i<l; i++) {
            var onEnter = Observable.fromEvent(cues[i], VgEvents.VG_ENTER);
            onEnter.subscribe(this.onEnter.bind(this));

            var onExit = Observable.fromEvent(cues[i], VgEvents.VG_EXIT);
            onExit.subscribe(this.onExit.bind(this));
        }
    }

    onEnter(event) {
        this.onEnterCuePoint.next(event.target);
    }

    onExit(event) {
        this.onExitCuePoint.next(event.target);
    }
}
