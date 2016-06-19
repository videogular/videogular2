import {it, xit, describe, expect, beforeEach} from '@angular/core/testing';
import {VgScrubBarCuePoints} from "./vg-scrub-bar-cue-points";
import {VgAPI} from "../../../services/vg-api";
import {ElementRef, SimpleChange} from "@angular/core";

describe('Scrub bar current time', () => {
    let scrubBarCuePoints: VgScrubBarCuePoints;
    let ref:ElementRef;
    let api:VgAPI;

    beforeEach(() => {
        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                }
            }
        };

        api = new VgAPI();

        scrubBarCuePoints = new VgScrubBarCuePoints(ref, api);
    });

    xit('Should create cue points when metadata is loaded', () => {
        var cps:Object = {};
        var cp1:TextTrackCue = (<TextTrackCue>{startTime: 1});
        var cp2:TextTrackCue = (<TextTrackCue>{startTime: 5, endTime: 10});
        var cp3:TextTrackCue = (<TextTrackCue>{startTime: 15, endTime: 20, text: "{value: 'custom params'}"});

        cps[0] = cp1;
        cps[1] = cp2;
        cps[2] = cp3;

        scrubBarCuePoints.cuePoints = (<TextTrackCueList>cps);

        scrubBarCuePoints.target = {
            time: {
                total: 100000
            }
        };

        scrubBarCuePoints.ngOnChanges({'cuePoints': (<SimpleChange>{currentValue: cps})});

        expect((<any>scrubBarCuePoints.cuePoints[0]).$$style).toEqual({width: '1%', left: '1%'});
        expect((<any>scrubBarCuePoints.cuePoints[1]).$$style).toEqual({width: '5%', left: '5%'});
        expect((<any>scrubBarCuePoints.cuePoints[2]).$$style).toEqual({width: '5%', left: '15%'});
    });

    xit('Should not calculate style position if there is not duration on media', () => {
        var cps:Object = {};
        var cp1:TextTrackCue = (<TextTrackCue>{startTime: 1});
        var cp2:TextTrackCue = (<TextTrackCue>{startTime: 5, endTime: 10});
        var cp3:TextTrackCue = (<TextTrackCue>{startTime: 15, endTime: 20, text: "{value: 'custom params'}"});

        cps[0] = cp1;
        cps[1] = cp2;
        cps[2] = cp3;

        scrubBarCuePoints.cuePoints = (<TextTrackCueList>cps);

        scrubBarCuePoints.target = {
            time: {
                total: 0
            }
        };

        scrubBarCuePoints.ngOnChanges({'cuePoints': (<SimpleChange>{currentValue: cps})});

        expect((<any>scrubBarCuePoints.cuePoints[0]).$$style).toEqual({width: '0', left: '0'});
        expect((<any>scrubBarCuePoints.cuePoints[1]).$$style).toEqual({width: '0', left: '0'});
        expect((<any>scrubBarCuePoints.cuePoints[2]).$$style).toEqual({width: '0', left: '0'});
    });

    it('Should do nothing if there are no cue points', () => {
        scrubBarCuePoints.ngOnChanges({'cuePoints': (<SimpleChange>{currentValue: null})});
    });
});
