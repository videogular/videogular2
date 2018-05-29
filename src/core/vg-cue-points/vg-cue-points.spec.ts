import { ElementRef } from '@angular/core';
import { Observable, fromEvent} from 'rxjs';
import { VgCuePoints } from './vg-cue-points';



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

        expect(fromEvent).toHaveBeenCalledWith(ref.nativeElement, 'load');
    });

    it('Should handle onLoad event', () => {
        spyOn(cuePoints.onLoad$, 'subscribe').and.callThrough();
        spyOn(cuePoints.onEnter$, 'subscribe').and.callThrough();
        spyOn(cuePoints.onExit$, 'subscribe').and.callThrough();

        let event = {
            target: document.createElement('video')
        };

        let track = event.target.addTextTrack('captions', 'test');
        let cue = track.addCue(new TextTrackCue(1, 2, 'cue 1')); // Illegal Constructor

        cuePoints.onLoad(event);
        expect(cuePoints.onLoad$.subscribe).toHaveBeenCalledWith(cue, 'load');
        expect(cuePoints.onEnter$.subscribe).toHaveBeenCalledWith(cue, 'enter');
        expect(cuePoints.onExit$.subscribe).toHaveBeenCalledWith(cue, 'exit');
    });

    it('Should handle onEnter event', () => {
        spyOn(cuePoints.onEnterCuePoint, 'next').and.callThrough();

        let event = {
            target: {}
        };

        cuePoints.onEnter(event);

        expect(cuePoints.onEnterCuePoint.emit).toHaveBeenCalledWith(event.target);
    });

    it('Should handle onExit event', () => {
        spyOn(cuePoints.onExitCuePoint, 'next').and.callThrough();

        let event = {
            target: {}
        };

        cuePoints.onExit(event);

        expect(cuePoints.onExitCuePoint.emit).toHaveBeenCalledWith(event.target);
    });
});
