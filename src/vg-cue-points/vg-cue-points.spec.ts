import {it, describe, expect, beforeEach} from '@angular/core/testing';
import {ElementRef} from "@angular/core";
import {VgCuePoints} from "./vg-cue-points";

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
