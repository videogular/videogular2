import {VgScrubBar} from "./vg-scrub-bar";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";
import {VgControlsHidden} from './../../core/services/vg-controls-hidden';

describe('Scrub bar', () => {
    let scrubBar:VgScrubBar;
    let ref:ElementRef;
    let api:VgAPI;
    let vgControlsHiddenState: VgControlsHidden;

    beforeEach(() => {
        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                },
                scrollWidth: 200
            }
        };

        api = new VgAPI();
        vgControlsHiddenState = new VgControlsHidden();


        scrubBar = new VgScrubBar(ref, api, vgControlsHiddenState);
    });

    it('Should get media by id on init', () => {
        spyOn(api, 'getMediaById');

        scrubBar.vgFor = 'test';
        scrubBar.onPlayerReady();

        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });

    it('Should show scrub bar', () => {
        vgControlsHiddenState.state(false);
        expect(scrubBar.hideScrubBar).toBe(false);
    });

    it('Should hide scrub bar', () => {
        vgControlsHiddenState.state(true);
        expect(scrubBar.hideScrubBar).toBe(true);
    });

    describe('onMouseDownScrubBar', () => {
        it('should call API seekTime 10 when offsetX is 20 and scrollWidth is 200', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;

            scrubBar.onMouseDownScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });
});
