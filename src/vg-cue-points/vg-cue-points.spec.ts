import {it, describe, expect, beforeEach} from 'angular2/testing';
import {ElementRef} from "angular2/core";
import {VgCuePoints} from "./vg-cue-points";
import {ICuePoint} from "./icue-point";
import {CuePointEvent} from "./cue-point-event";

describe('Cue points', () => {
    let cuePoints:VgCuePoints;
    let ref:ElementRef;

    beforeEach(() => {
        ref = {
            nativeElement: {
                subscriptions: {
                    timeUpdate: {
                        subscribe: () => {}
                    }
                }
            }
        };

        cuePoints = new VgCuePoints(ref);

        var cps:Array<ICuePoint> = [];
        var cp1:ICuePoint = {start: 1};
        var cp2:ICuePoint = {start: 5, end: 10};
        var cp3:ICuePoint = {start: 15, end: 20, params: {value: 'custom params'}};

        cps.push(cp1);
        cps.push(cp2);
        cps.push(cp3);

        cuePoints.vgCuePoints = cps;
    });

    it('Should be defined', () => {
        expect(cuePoints).toBeTruthy();
    });

    it('Should listen for time update changes', () => {
        spyOn(ref.nativeElement.subscriptions.timeUpdate, 'subscribe').and.callThrough();

        cuePoints.ngOnInit();

        expect(ref.nativeElement.subscriptions.timeUpdate.subscribe).toHaveBeenCalled();
    });

    it('Should mark cue points as completed', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 3.2
            }
        };

        cuePoints.onTimeUpdate(event);

        expect(cps[0].end).toBe(2);
        expect(cps[0].isCompleted).toBeTruthy();
        expect(cps[1].isCompleted).toBeFalsy();
        expect(cps[2].isCompleted).toBeFalsy();
    });

    it('Should mark cue points as dirty', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 6.2
            }
        };

        cuePoints.onTimeUpdate(event);

        expect(cps[0].isDirty).toBeTruthy();
        expect(cps[1].isDirty).toBeTruthy();
        expect(cps[2].isDirty).toBeFalsy();
    });

    it('Should send onEnterCuePoint emitter when we reach to a cue point', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 5.2
            }
        };

        spyOn(cuePoints.onEnterCuePoint, 'next').and.callThrough();

        cuePoints.onTimeUpdate(event);

        var cpEvent:CuePointEvent = new CuePointEvent();
        cpEvent.currentTime = 5.2;
        cpEvent.cuePoint = cps[1];

        expect(cps[1].isDirty).toBeTruthy();
        expect(cuePoints.onEnterCuePoint.next).toHaveBeenCalledWith(cpEvent);
    });

    it('Should send onUpdateCuePoint emitter when we are inside a time lapse', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 16.7
            }
        };

        spyOn(cuePoints.onUpdateCuePoint, 'next').and.callThrough();

        cuePoints.onTimeUpdate(event);

        var cpEvent:CuePointEvent = new CuePointEvent();
        cpEvent.currentTime = 16.7;
        cpEvent.cuePoint = cps[2];

        expect(cps[2].isDirty).toBeTruthy();
        expect(cuePoints.onUpdateCuePoint.next).toHaveBeenCalledWith(cpEvent);
    });

    it('Should send onCompleteCuePoint emitter when time passes end point', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 22.3
            }
        };

        cps[0].isCompleted = true;
        cps[1].isCompleted = true;

        spyOn(cuePoints.onCompleteCuePoint, 'next').and.callThrough();

        cuePoints.onTimeUpdate(event);

        var cpEvent:CuePointEvent = new CuePointEvent();
        cpEvent.currentTime = 22.3;
        cpEvent.cuePoint = cps[2];

        expect(cps[2].isCompleted).toBeTruthy();
        expect(cuePoints.onCompleteCuePoint.next).toHaveBeenCalledWith(cpEvent);
    });

    it('Should send onLeaveCuePoint emitter when cue point is dirty and current time is lower than start', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 0.3
            }
        };

        cps[0].isDirty = true;

        spyOn(cuePoints.onLeaveCuePoint, 'next').and.callThrough();

        cuePoints.onTimeUpdate(event);

        var cpEvent:CuePointEvent = new CuePointEvent();
        cpEvent.currentTime = 0.3;
        cpEvent.cuePoint = cps[0];

        expect(cps[0].isDirty).toBeFalsy();
        expect(cuePoints.onLeaveCuePoint.next).toHaveBeenCalledWith(cpEvent);
    });

    it('Should not send onCompleteCuePoint emitter when time passes end point and all cue points are completed', () => {
        var cps:Array<ICuePoint> = cuePoints.vgCuePoints;
        var event:any = {
            target: {
                currentTime: 22.3
            }
        };

        cps[0].isCompleted = true;
        cps[1].isCompleted = true;
        cps[2].isCompleted = true;

        spyOn(cuePoints.onCompleteCuePoint, 'next').and.callThrough();

        cuePoints.onTimeUpdate(event);

        expect(cps[2].isCompleted).toBeTruthy();
        expect(cuePoints.onCompleteCuePoint.next).not.toHaveBeenCalled();
    });
});
