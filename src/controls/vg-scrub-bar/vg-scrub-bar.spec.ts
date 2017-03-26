import {VgScrubBar} from "./vg-scrub-bar";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";
import {VgControlsHidden} from './../../core/services/vg-controls-hidden';
import {VgMedia} from "../../core/vg-media/vg-media";

describe('Scrub bar', () => {
    let scrubBar:VgScrubBar;
    let ref:ElementRef;
    let api:VgAPI;
    let vgControlsHiddenState: VgControlsHidden;
    let media:VgMedia;
    let elem = {
        play: () => {},
        pause: () => {},
        load: () => {},
        duration: 100,
        currentTime: 0,
        volume: 1,
        playbackRate: 1,
        buffered: {
            length: 2,
            end: () => {return 50;}
        },
        id: 'testVideo',
        observe: () => {
            return <any>{};
        },
        dispatchEvent: () => {}
    };

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
        media = new VgMedia(api);
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
            spyOn(api, 'seekTime');
            spyOn(api, 'pause');

            media.onCanPlay({});
            api.registerMedia(media);

            scrubBar.target = api;

            scrubBar.onMouseDownScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onMouseDownScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledTimes(1);
            expect(api.pause).toHaveBeenCalledTimes(1);
        });
    });

    describe('onMouseMoveScrubBar', () => {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;

            scrubBar.onMouseMoveScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onMouseMoveScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });

    describe('onMouseOutScrubBar', () => {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', () => {
            spyOn(api, 'seekTime');

            media.onCanPlay({});
            api.registerMedia(media);

            scrubBar.target = api;

            scrubBar.onMouseOutScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onMouseOutScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });

    describe('onMouseUpScrubBar', () => {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', () => {
            spyOn(api, 'seekTime');

            media.onCanPlay({});
            api.registerMedia(media);

            scrubBar.target = api;

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

            scrubBar.onTouchEndScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onTouchEndScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);
        });
    });

    describe('onTouchLeaveScrubBar', () => {
        it('should not seek', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;

            scrubBar.onTouchLeaveScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);

            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;

            scrubBar.onTouchLeaveScrubBar({ touches: [ {pageX: 20 }]});

            expect(api.seekTime).toHaveBeenCalledTimes(0);
        });
    });
});
