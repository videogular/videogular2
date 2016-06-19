import {it, describe, expect, beforeEach} from "@angular/core/testing";
import {VgMute} from "./vg-mute";
import {VgAPI} from "../../services/vg-api";
import {ElementRef} from "@angular/core";

describe('Mute Button', () => {
    let mute:VgMute;
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
        api.medias = {
            main: {
                volume: 1
            },
            secondary: {
                volume: 0.5
            }
        };


        mute = new VgMute(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(mute.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById').and.callFake(() => {
            return {
                volume: 1
            };
        });

        mute.ngOnInit();

        expect(mute.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
        expect(mute.currentVolume).toBe(1);
    });

    it('Should get average volume between all media files', () => {
        mute.target = api;

        var volume = mute.getVolume();

        expect(volume).toBe(0.75);
    });

    it('Should get volume for one media file', () => {
        api.medias = {
            main: {
                volume: 1
            }
        };

        mute.target = api;

        var volume = mute.getVolume();

        expect(volume).toBe(1);
    });

    describe('onClick (single media)', () => {
        it('should mute volume if current volume is different than 0', () => {
            api.medias = {
                main: {
                    volume: 0.75
                }
            };

            mute.target = api;

            mute.onClick();

            expect(mute.currentVolume).toBe(0.75);
            expect(api.volume).toEqual(0);
        });

        it('should unmute volume if current volume is 0', () => {
            api.medias = {
                main: {
                    volume: 0
                }
            };

            mute.target = api;

            mute.currentVolume = 0.75;

            mute.onClick();

            expect(api.volume).toEqual(0.75);
        });
    });

    describe('onClick (multiple medias)', () => {
        it('should mute volume if current volume is different than 0', () => {
            mute.target = api;

            mute.onClick();

            expect(mute.currentVolume).toBe(0.75);
            expect(api.volume).toEqual({main: 0, secondary: 0});
        });

        it('should unmute volume if current volume is 0', () => {
            api.medias = {
                main: {
                    volume: 0
                },
                secondary: {
                    volume: 0
                }
            };

            mute.target = api;

            mute.currentVolume = 0.75;

            mute.onClick();

            expect(api.volume).toEqual({main: 0.75, secondary: 0.75});
        });
    });
});
