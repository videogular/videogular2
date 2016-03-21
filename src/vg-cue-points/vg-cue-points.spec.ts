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
    });
});
