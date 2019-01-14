import {VgControls} from "./vg-controls";
import {VgControlsHidden} from './../core/services/vg-controls-hidden';
import {ChangeDetectorRef, ElementRef} from "@angular/core";
import {VgAPI} from "../core/services/vg-api";
import {VgMedia} from "../core/vg-media/vg-media";
import { VgMediaElement } from '../core/vg-media/vg-media-element';
import { VgStates } from '../core/states/vg-states';

describe('Controls Bar', () => {
    let controls:VgControls;
    let ref:ElementRef;
    let api:VgAPI;
    let hidden: VgControlsHidden;
    let media:VgMedia;
    let cdRef:ChangeDetectorRef;
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
        jasmine.clock().uninstall();
        jasmine.clock().install();

        api = new VgAPI();
        hidden = new VgControlsHidden();

        ref = {
            nativeElement: elem
        };

        cdRef = {
            detectChanges: () => {},
            markForCheck: () => {},
            detach: () => {},
            reattach: () => {},
            checkNoChanges: () => {}
        };

        media = new VgMedia(api, cdRef);
        media.vgMedia = elem;
        media.subscriptions = {
            // Native events
            pause: {subscribe:() => {}},
            play: {subscribe:() => {}},            
            // Advertisement only events
            startAds: {subscribe:() => {}},
            endAds: {subscribe:() => {}},
        };
        api.registerMedia(media);
        

        controls = new VgControls(api, ref, hidden);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('Should have been defined', () => {
        expect(controls).toBeTruthy();
    });

    it('Should listen for mouseenter and mouseleave events', () => {

        let vgElem = document.createElement('vg-player');

        api.registerElement(vgElem);

        controls.ngOnInit();

        expect(controls.mouseMove$).toBeDefined();
        expect(controls.touchStart$).toBeDefined();
    });

    it('Should hide controls after view init', () => {
        spyOn(controls, 'hide').and.callFake(() => {});

        controls.vgAutohide = true;

        controls.ngAfterViewInit();

        expect(controls.hide).toHaveBeenCalled();
    });

    it('Should show controls after view init', () => {
        spyOn(controls, 'show').and.callFake(() => {});

        controls.vgAutohide = false;

        controls.ngAfterViewInit();

        expect(controls.show).toHaveBeenCalled();
    });

    it('Should show controls', () => {
        spyOn(window, 'clearTimeout').and.callFake(() => {});
        spyOn(hidden, 'state').and.callFake(() => {});

        controls.show();

        expect(window.clearTimeout).toHaveBeenCalled();
        expect(controls.hideControls).toBe(false);
        expect(hidden.state).toHaveBeenCalledWith(false);
    });

    it('Should hide controls when is playing', () => {
        spyOn(hidden, 'state').and.callFake(() => {});
        controls.onPlayerReady();
        controls.vgAutohide = true;
        media.state = VgStates.VG_PLAYING;
        controls.hide();

        jasmine.clock().tick(3100);
        expect(controls.hideControls).toBe(true);
        expect(hidden.state).toHaveBeenCalledWith(true);
    });

    it('Should not hide controls if player is paused', () => {
        controls.onPlayerReady();
        controls.hideControls = false;
        controls.vgAutohide = false;

        controls.vgAutohide = true;
        media.state = VgStates.VG_PAUSED;

        controls.hide();

        jasmine.clock().tick(3100);
        expect(controls.hideControls).toBe(false);
    });

    it('Should not hide controls if autohide is false', () => {
        controls.hideControls = false;
        controls.vgAutohide = false;

        controls.hide();

        jasmine.clock().tick(3100);
        expect(controls.hideControls).toBe(false);
    });

    it('Should start hiding controls if media is playing', () => {
        spyOn(controls, 'hide').and.callFake(() => {});

        controls.vgAutohide = true;

        controls.onPlay();

        expect(controls.hide).toHaveBeenCalled();
    });

    it('Should show controls if media is paused', () => {
        spyOn(hidden, 'state').and.callFake(() => {});

        controls.vgAutohide = true;

        controls.onPause();

        expect(controls.hideControls).toBe(false);
        expect(hidden.state).toHaveBeenCalledWith(false);
    });
});
