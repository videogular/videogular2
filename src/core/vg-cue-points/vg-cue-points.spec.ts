import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VgCuePoints } from './vg-cue-points';

import 'rxjs/add/observable/fromEvent';

describe('Cue points', () => {
    let cuePoints: VgCuePoints;
    let ref: ElementRef;

    beforeEach(() => {
        ref = {
            nativeElement: document.createElement('div')
        };

        cuePoints = new VgCuePoints(ref);
    });

    it('Should handle onLoad event', () => {
        spyOn(Observable, 'fromEvent').and.callThrough();

        cuePoints.ngOnInit();

        expect(Observable.fromEvent).toHaveBeenCalledWith(ref.nativeElement, 'load');
    });

    xit('Should handle onLoad event', () => {
        spyOn(Observable, 'fromEvent').and.callThrough();

        let event = {
            target: document.createElement('video')
        };

        let track = event.target.addTextTrack('captions', 'test');
        let cue = track.addCue(new TextTrackCue(1, 2, 'cue 1')); // Illegal Constructor

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
