import {it, xit, describe, expect, beforeEach} from "@angular/core/testing";
import {VgMedia} from "../vg-media/vg-media";
import {VgAPI} from "../services/vg-api";
import {ElementRef} from "@angular/core";


describe('Videogular Media', () => {
    let media:VgMedia;
    let ref:ElementRef;
    let api:VgAPI;
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
            nativeElement: elem
        };

        api = new VgAPI();
        media = new VgMedia(ref);
    });

    it('Should load a new media if a change on dom have been happened', () => {
        jasmine.clock().install();

        spyOn(elem, 'load').and.callThrough();
        spyOn(elem, 'pause').and.callThrough();

        media.onMutation({});

        jasmine.clock().tick(10);

        expect(elem.load).toHaveBeenCalled();
        expect(elem.pause).toHaveBeenCalled();
        expect(elem.currentTime).toBe(0);

        jasmine.clock().uninstall();
    });

    it('Should have a play method', () => {
        spyOn(elem, 'play');

        media.play();

        expect(elem.play).toHaveBeenCalled();
    });

    it('Should have a pause method', () => {
        spyOn(elem, 'pause');

        media.pause();

        expect(elem.pause).toHaveBeenCalled();
    });

    it('Should have setter/getter props', () => {
        expect(media.duration).toBe(100);
        expect(media.currentTime).toBe(0);
        expect(media.volume).toBe(1);
        expect(media.playbackRate).toBe(1);
        expect(media.buffered.length).toEqual(2);

        media.currentTime = 50;
        media.volume = 0.5;
        media.playbackRate = 0.5;

        expect(elem.currentTime).toBe(50);
        expect(elem.volume).toBe(0.5);
        expect(elem.playbackRate).toBe(0.5);
    });

    it('Should handle onCanPlay native event', () => {
        expect(media.canPlay).toBeFalsy();

        media.onCanPlay({});

        expect(media.canPlay).toBeTruthy();
    });

    it('Should handle onCanPlayThrough native event', () => {
        expect(media.canPlayThrough).toBeFalsy();

        media.onCanPlayThrough({});

        expect(media.canPlayThrough).toBeTruthy();
    });

    it('Should handle onLoadMetadata native event', () => {
        expect(media.isMetadataLoaded).toBeFalsy();

        media.onLoadMetadata({});

        expect(media.isMetadataLoaded).toBeTruthy();
        expect(media.time.total).toBe(100000);
    });

    it('Should handle onWait native event', () => {
        expect(media.isWaiting).toBeFalsy();

        media.onWait({});

        expect(media.isWaiting).toBeTruthy();
    });

    it('Should handle onComplete native event', () => {
        expect(media.isCompleted).toBeFalsy();

        media.state = 'play';
        media.onComplete({});

        expect(media.isCompleted).toBeTruthy();
        expect(media.state).toBe('pause');
    });

    it('Should handle onStartPlaying native event', () => {
        expect(media.state).toBe('pause');

        media.onStartPlaying({});

        expect(media.state).toBe('play');
    });

    it('Should handle onPlay native event', () => {
        expect(media.state).toBe('pause');

        media.onPlay({});

        expect(media.state).toBe('play');
    });

    it('Should handle onPause native event', () => {
        media.state = 'play';

        media.onPause({});

        expect(media.state).toBe('pause');
    });

    it('Should handle onTimeUpdate native event (with buffer)', () => {
        elem.currentTime = 25;

        media.onTimeUpdate({});

        expect(media.time.current).toBe(25000);
        expect(media.time.left).toBe(75000);
        expect(media.buffer.end).toBe(50000);
    });

    it('Should handle onTimeUpdate native event (without buffer)', () => {
        elem.currentTime = 25;
        elem.buffered = {
            length: 0,
            end: () => {return 0;}
        };

        media.onTimeUpdate({});

        expect(media.time.current).toBe(25000);
        expect(media.time.left).toBe(75000);
        expect(media.buffer.end).toBe(0);

        elem.buffered = {
            length: 2,
            end: () => {return 50;}
        };
    });

    it('Should handle onProgress native event (with buffer)', () => {
        media.onProgress({});

        expect(media.buffer.end).toBe(50000);
    });

    it('Should handle onProgress native event (without buffer)', () => {
        elem.buffered = {
            length: 0,
            end: () => {return 0;}
        };

        media.onProgress({});

        expect(media.buffer.end).toBe(0);

        elem.buffered = {
            length: 2,
            end: () => {return 50;}
        };
    });
});
