import { ElementRef } from '@angular/core';

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


        cuePoints.ngOnInit();

        expect(cuePoints.onLoad$).toBeDefined()
    });

    xit('Should handle enter/exit events', () => {

        let event = {
            target: document.createElement('video')
        };

        let track = event.target.addTextTrack('captions', 'test');
        let cue = track.addCue(new TextTrackCue(1, 2, 'cue 1')); // Illegal Constructor

        cuePoints.onLoad(event);
        expect(cuePoints.onEnter$).toBeDefined();
        expect(cuePoints.onExit$).toBeDefined();
    });

    it('Should handle onEnter event', () => {
        spyOn(cuePoints.onEnterCuePoint, 'emit').and.callThrough();

        let event = {
            target: {}
        };

        cuePoints.onEnter(event);

        expect(cuePoints.onEnterCuePoint.emit).toHaveBeenCalledWith(event.target);
    });

    it('Should handle onExit event', () => {
        spyOn(cuePoints.onExitCuePoint, 'emit').and.callThrough();

        let event = {
            target: {}
        };

        cuePoints.onExit(event);

        expect(cuePoints.onExitCuePoint.emit).toHaveBeenCalledWith(event.target);
    });
});
