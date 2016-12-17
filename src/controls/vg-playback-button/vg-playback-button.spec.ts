import {VgPlaybackButton} from "./vg-playback-button";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";
import {VgStates} from "../../core/states/vg-states";

describe('Playback Button', () => {
    let playbackButton:VgPlaybackButton;
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
                state: VgStates.VG_PLAYING
            },
            secondary: {
                state: VgStates.VG_PAUSED
            }
        };


        playbackButton = new VgPlaybackButton(ref, api);
    });

    it('Should set playbackIndex default value to 1', () => {
        expect(playbackButton.playbackIndex).toEqual(1);
    });

    it('Should get media by id on init', () => {
        spyOn(api, 'getMediaById').and.callFake(() => { });

        playbackButton.vgFor = 'test';
        playbackButton.onPlayerReady();

        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });

    describe('onClick (single and multiple media)', () => {
        it('should increase playbackIndex', () => {
            api.medias = {
                main: {
                    state: VgStates.VG_PLAYING
                }
            };

            playbackButton.target = api;

            playbackButton.onClick();

            expect(playbackButton.playbackIndex).toEqual(2);
        });

        it('should set playbackRate to target media', () => {
            api.medias = {
                main: {
                    state: VgStates.VG_PLAYING
                }
            };

            playbackButton.target = api;

            playbackButton.onClick();

            expect(playbackButton.target.playbackRate).toEqual('1.5');
        });

        it('should set playbackRate to target media', () => {
            let media = {
                playbackRate: {
                    test: '1'
                }
            };

            playbackButton.target = media;
            playbackButton.vgFor = 'test';

            playbackButton.onClick();

            expect(playbackButton.target.playbackRate.test).toEqual('1.5');
        });
    });
});
