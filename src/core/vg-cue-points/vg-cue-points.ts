import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { VgEvents } from '../events/vg-events';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[vgCuePoints]'
})
export class VgCuePoints implements OnInit, OnDestroy {
    @Output('onEnterCuePoint') onEnterCuePoint: EventEmitter<any> = new EventEmitter();
    @Output('onUpdateCuePoint') onUpdateCuePoint: EventEmitter<any> = new EventEmitter();
    @Output('onExitCuePoint') onExitCuePoint: EventEmitter<any> = new EventEmitter();
    @Output('onCompleteCuePoint') onCompleteCuePoint: EventEmitter<any> = new EventEmitter();

    subscriptions: Subscription[] = [];
    cuesSubscriptions: Subscription[] = [];

    totalCues = 0;

    constructor(public ref: ElementRef) {
    }

    ngOnInit() {
        let onLoad = Observable.fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
        this.subscriptions.push(onLoad.subscribe(this.onLoad.bind(this)));
    }

    onLoad(event: any) {
        let cues: TextTrackCue[] = event.target.track.cues;

        this.ref.nativeElement.cues = cues;

        this.updateCuePoints(cues);
    }

    updateCuePoints(cues: TextTrackCue[]) {
        this.cuesSubscriptions.forEach(s => s.unsubscribe());

        for (let i = 0, l = cues.length; i < l; i++) {
            let onEnter = Observable.fromEvent(cues[ i ], VgEvents.VG_ENTER);
            this.cuesSubscriptions.push(onEnter.subscribe(this.onEnter.bind(this)));

            let onExit = Observable.fromEvent(cues[ i ], VgEvents.VG_EXIT);
            this.cuesSubscriptions.push(onExit.subscribe(this.onExit.bind(this)));
        }
    }

    onEnter(event: any) {
        this.onEnterCuePoint.next(event.target);
    }

    onExit(event: any) {
        this.onExitCuePoint.next(event.target);
    }

    ngDoCheck() {
        if (this.ref.nativeElement.cues) {
            const changes = this.totalCues !== this.ref.nativeElement.track.cues.length;

            if (changes) {
                this.totalCues = this.ref.nativeElement.track.cues.length;
                this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
                this.updateCuePoints(this.ref.nativeElement.track.cues);
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
