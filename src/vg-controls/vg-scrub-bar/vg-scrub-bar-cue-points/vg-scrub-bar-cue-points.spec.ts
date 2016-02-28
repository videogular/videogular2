import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgScrubBarCuePoints} from "./vg-scrub-bar-cue-points";
import {VgAPI} from "../../../services/vg-api";
import {ElementRef} from "angular2/core";
import {ICuePoint} from "../../../vg-cue-points/icue-point";

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

    it('Should get media by id on init', () => {
        spyOn(scrubBarCuePoints.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById').and.callFake(
            () => {
                return {
                    subscriptions: {
                        loadedMetadata: {
                            subscribe: () => {}
                        }
                    }
                };
            }
        );

        scrubBarCuePoints.ngOnInit();

        expect(scrubBarCuePoints.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    it('Should create cue points when metadata is loaded', () => {
        var cps:Array<ICuePoint> = [];
        var cp1:ICuePoint = {start: 1};
        var cp2:ICuePoint = {start: 5, end: 10};
        var cp3:ICuePoint = {start: 15, end: 20, params: {value: 'custom params'}};

        cps.push(cp1);
        cps.push(cp2);
        cps.push(cp3);

        scrubBarCuePoints.cuePoints = cps;

        scrubBarCuePoints.target = {
            time: {
                total: 100000
            }
        };

        scrubBarCuePoints.onLoadedMetadata();

        expect(scrubBarCuePoints.cuePoints[0].$$style).toEqual({width: '1%', left: '1%'});
        expect(scrubBarCuePoints.cuePoints[1].$$style).toEqual({width: '5%', left: '5%'});
        expect(scrubBarCuePoints.cuePoints[2].$$style).toEqual({width: '5%', left: '15%'});
    });

    it('Should not calculate style position if there is not duration on media', () => {
        var cps:Array<ICuePoint> = [];
        var cp1:ICuePoint = {start: 1};
        var cp2:ICuePoint = {start: 5, end: 10};
        var cp3:ICuePoint = {start: 15, end: 20, params: {value: 'custom params'}};

        cps.push(cp1);
        cps.push(cp2);
        cps.push(cp3);

        scrubBarCuePoints.cuePoints = cps;

        scrubBarCuePoints.target = {
            time: {
                total: 0
            }
        };

        scrubBarCuePoints.onLoadedMetadata();

        expect(scrubBarCuePoints.cuePoints[0].$$style).toEqual({width: '0', left: '0'});
        expect(scrubBarCuePoints.cuePoints[1].$$style).toEqual({width: '0', left: '0'});
        expect(scrubBarCuePoints.cuePoints[2].$$style).toEqual({width: '0', left: '0'});
    });

    it('Should do nothing if there are no cue points', () => {
        scrubBarCuePoints.onLoadedMetadata();
    });
});
