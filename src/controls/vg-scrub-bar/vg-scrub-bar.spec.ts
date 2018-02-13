import {VgScrubBar} from "./vg-scrub-bar";
import {VgAPI} from "../../core/services/vg-api";
import {ChangeDetectorRef, ElementRef} from "@angular/core";
import {VgControlsHidden} from './../../core/services/vg-controls-hidden';
import {VgMedia} from "../../core/vg-media/vg-media";
import { VgStates } from '../../core/states/vg-states';
import { VgMediaElement } from '../../core/vg-media/vg-media-element';

describe('Scrub bar', () => {
    let scrubBar:VgScrubBar;
    let ref:ElementRef;
    let cdRef:ChangeDetectorRef;
    let api:VgAPI;
    let vgControlsHiddenState: VgControlsHidden;
    let media:VgMedia;
    let elem = new VgMediaElement();
    elem.duration = 100;
    elem.currentTime = 0;
    elem.volume = 1;
    elem.playbackRate = 1;
    elem.buffered = {
        length: 2,
        start: () => {return 0;},
        end: () => {return 50;}
    };
    elem.id = 'testVideo';

    beforeEach(() => {
        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                },
                scrollWidth: 200
            }
        };
        cdRef = {
            detectChanges: () => {},
            markForCheck: () => {},
            detach: () => {},
            reattach: () => {},
            checkNoChanges: () => {}
        }

        api = new VgAPI();
        media = new VgMedia(api, cdRef);
        media.vgMedia = elem;
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
            api = <any>{
                seekTime: () => {},
                pause: () => {},
                registerMedia: () => {},
                state: VgStates.VG_PLAYING,
                isLive: false,
                canPlay: true
            };

            spyOn(api, 'pause');

            media.onCanPlay({});
            api.registerMedia(media);

            scrubBar.target = api;
            scrubBar.target.canPlay = true;
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onMouseDownScrubBar({ offsetX: 20 });

            expect(api.pause).toHaveBeenCalled();
        });
    });

    describe('onMouseMoveScrubBar', () => {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;
            scrubBar.vgSlider = false;

            scrubBar.onMouseMoveScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onMouseMoveScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });

    describe('onMouseUpScrubBar', () => {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', () => {
            spyOn(api, 'seekTime');

            media.onCanPlay({});
            api.registerMedia(media);

            scrubBar.target = api;
            scrubBar.vgSlider = false;

            scrubBar.onMouseUpScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onMouseUpScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });

    describe('onTouchStartScrubBar', () => {
        it('should call API seekTime 10 when offsetX is 20 and scrollWidth is 200', () => {
            spyOn(api, 'seekTime');
            spyOn(api, 'pause');

            media.onCanPlay({});
            api.registerMedia(media);

            scrubBar.target = api;
            scrubBar.vgSlider = false;

            scrubBar.onTouchStartScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
            expect(api.pause).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onTouchStartScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(1);
            expect(api.pause).toHaveBeenCalledTimes(1);
        });
    });

    describe('onTouchMoveScrubBar', () => {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;
            scrubBar.vgSlider = false;

            scrubBar.onTouchMoveScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onTouchMoveScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });

    describe('onTouchCancelScrubBar', () => {
        it('should not seek', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;
            scrubBar.vgSlider = false;

            scrubBar.onTouchCancelScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onTouchCancelScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);
        });
    });

    describe('onTouchEndScrubBar', () => {
        it('should not seek', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;
            scrubBar.vgSlider = false;

            scrubBar.onTouchEndScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onTouchEndScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);
        });
    });
});
