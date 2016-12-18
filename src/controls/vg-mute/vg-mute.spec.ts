import {VgMute} from "./vg-mute";
import {VgAPI} from "../../core/services/vg-api";
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
                id: 'main',
                volume: 1
            },
            secondary: {
                id: 'secondary',
                volume: 0.5
            }
        };


        mute = new VgMute(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(api, 'getMediaById').and.callFake(() => {
            return {
                volume: 1
            };
        });

        mute.vgFor = 'test';
        mute.onPlayerReady();

        expect(api.getMediaById).toHaveBeenCalledWith('test');
        expect(mute.currentVolume).toBe(1);
    });

    it('Should get volume for one media file', () => {
        api.medias = {
            main: {
                volume: 1
            }
        };

        mute.target = api;

        let volume = mute.getVolume();

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

            expect(mute.currentVolume).toBe(1);
            expect(api.volume).toEqual(0);
        });

        it('should unmute volume if current volume is 0', () => {
            api.medias = {
                main: {
                    id: 'main',
                    volume: 0
                },
                secondary: {
                    id: 'secondary',
                    volume: 0
                }
            };

            mute.target = api;

            mute.currentVolume = 0.75;

            mute.onClick();

            expect(api.volume).toEqual(0.75);
        });
    });
});
