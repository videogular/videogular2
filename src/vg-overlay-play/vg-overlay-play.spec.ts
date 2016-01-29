import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgOverlayPlay} from "./vg-overlay-play";
import {VgAPI} from "../services/vg-api";
import {ElementRef} from "angular2/core";

describe('Videogular Player', () => {
    let overlayPlay: VgOverlayPlay;
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
        overlayPlay = new VgOverlayPlay(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(overlayPlay.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById').and.callFake(() => { });

        overlayPlay.ngOnInit();

        expect(overlayPlay.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    describe('onClick', () => {
        beforeEach(() => {
            overlayPlay.target = {
                play: () => { },
                pause: () => { }
            }
        });

        it('current state play should set target to pause', () => {
            spyOn(overlayPlay, 'getState').and.callFake(() => { return 'play' });
            spyOn(overlayPlay.target, 'pause');

            overlayPlay.onClick();

            expect(overlayPlay.getState).toHaveBeenCalled();
            expect(overlayPlay.target.pause).toHaveBeenCalled();
        });

        it('current state pause should set target to play', () => {
            spyOn(overlayPlay, 'getState').and.callFake(() => { return 'pause' });
            spyOn(overlayPlay.target, 'play');

            overlayPlay.onClick();

            expect(overlayPlay.getState).toHaveBeenCalled();
            expect(overlayPlay.target.play).toHaveBeenCalled();
        });
    });

    describe('getState', () => {
        beforeEach(() => {
            overlayPlay.target = {
                state: null
            }
        });

        it('if only one state returns that state', () => {
            overlayPlay.target.state = 'pause';

            expect(overlayPlay.getState()).toEqual('pause');
        });

        it('if more than one target should return pause if all of them are pause', () => {
            overlayPlay.target.state = ['pause','pause','pause','pause'];

            expect(overlayPlay.getState()).toEqual('pause');
        });

        it('if more than one target should return play if any of them is play', () => {
            overlayPlay.target.state = ['pause','play','pause','pause'];

            expect(overlayPlay.getState()).toEqual('play');
        });
    });
});
