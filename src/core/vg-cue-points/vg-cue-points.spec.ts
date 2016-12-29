import {ElementRef} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {VgCuePoints} from "./vg-cue-points";

import 'rxjs/add/observable/fromEvent';

describe('Cue points', () => {
    let cuePoints:VgCuePoints;
    let ref:ElementRef;

    beforeEach(() => {
        ref = {
            nativeElement: {
                subscriptions: {
                    timeUpdate: {
                        load: () => {},
                        subscribe: () => {}
                    }
                }
            }
        };

        cuePoints = new VgCuePoints(ref);
    });

    it('Should handle onLoad event', () => {
        spyOn(Observable, 'fromEvent').and.callThrough();

        cuePoints.ngOnInit();

        expect(Observable.fromEvent).toHaveBeenCalledWith(ref.nativeElement, 'load');
    });

    it('Should handle onLoad event', () => {
        spyOn(Observable, 'fromEvent').and.callThrough();

        let cue = {enter: () => {}, exit: () => {}};

        let event = {
            target: {
                track: {
                    cues: [
                        cue,
                        cue,
                        cue,
                        cue
                    ]
                }
            }
        };

        cuePoints.onLoad(event);

        expect(Observable.fromEvent).toHaveBeenCalledWith(cue, 'enter');
        expect(Observable.fromEvent).toHaveBeenCalledWith(cue, 'exit');
        expect(Observable.fromEvent).toHaveBeenCalledTimes(8);
    });

    it('Should handle onEnter event', () => {
        spyOn(cuePoints.onEnterCuePoint, 'next').and.callThrough();

        let event = {
            target: {}
        };

        cuePoints.onEnter(event);

        expect(cuePoints.onEnterCuePoint.next).toHaveBeenCalledWith(event.target);
    });

    it('Should handle onExit event', () => {
        spyOn(cuePoints.onExitCuePoint, 'next').and.callThrough();

        let event = {
            target: {}
        };

        cuePoints.onExit(event);

        expect(cuePoints.onExitCuePoint.next).toHaveBeenCalledWith(event.target);
    });
});
