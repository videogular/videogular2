import {Directive, Output, Input, EventEmitter, ElementRef} from "angular2/core";
import {ICuePoint} from "./icue-point";
import {CuePointEvent} from "./cue-point-event";

@Directive({
    selector: '[vgCuePoints]'
})
export class VgCuePoints {
    @Output('onEnterCuePoint') onEnterCuePoint:EventEmitter<CuePointEvent> = new EventEmitter();
    @Output('onUpdateCuePoint') onUpdateCuePoint:EventEmitter<CuePointEvent> = new EventEmitter();
    @Output('onLeaveCuePoint') onLeaveCuePoint:EventEmitter<CuePointEvent> = new EventEmitter();
    @Output('onCompleteCuePoint') onCompleteCuePoint:EventEmitter<CuePointEvent> = new EventEmitter();

    @Input('vgCuePoints') vgCuePoints:Array<ICuePoint>;

    constructor(public ref:ElementRef) {

    }

    ngOnInit() {
        var onTimeUpdate = this.ref.nativeElement.subscriptions.timeUpdate;
        onTimeUpdate.subscribe(this.onTimeUpdate.bind(this));
    }

    onTimeUpdate(event) {
        for (var i:number=0, l:number=this.vgCuePoints.length; i<l; i++) {
            var currentTime = event.target.currentTime;
            var cp:ICuePoint = (<ICuePoint>this.vgCuePoints[i]);
            var currentSecond = parseInt(currentTime, 10);
            var start = cp.start;
            var cpEvent:CuePointEvent = new CuePointEvent();
            cpEvent.currentTime = currentTime;
            cpEvent.cuePoint = cp;

            // If timeLapse.end is not defined we set it as 1 second length
            if (!cp.end) cp.end = cp.start + 1;

            if (currentTime < cp.end) cp.isCompleted = false;

            // Fire the onEnter event once reach to the cue point
            if(!cp.isDirty && currentSecond === start) {
                cp.isDirty = true;
                this.onEnterCuePoint.next(cpEvent);
            }

            // Check if we've been reached to the cue point
            if (currentTime > cp.start) {
                // We're in the timelapse
                if (currentTime < cp.end) {
                    // Trigger onUpdate each time we enter here
                    this.onUpdateCuePoint.next(cpEvent);

                    // Trigger onEnter if we enter on the cue point by manually seeking
                    if (!cp.isDirty) {
                        this.onEnterCuePoint.next(cpEvent);
                    }
                }

                // We've been passed the cue point
                if (currentTime >= cp.end) {
                    if (!cp.isCompleted) {
                        cp.isCompleted = true;
                        this.onCompleteCuePoint.next(cpEvent);
                    }
                }

                cp.isDirty = true;
            }
            else {
                if (cp.isDirty) {
                    this.onLeaveCuePoint.next(cpEvent);
                }

                cp.isDirty = false;
            }
        }
    }
}
