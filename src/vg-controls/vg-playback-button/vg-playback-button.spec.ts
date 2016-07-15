import {it, describe, expect, beforeEach} from "@angular/core/testing";
import {VgPlaybackButton} from "./vg-playback-button";
import {VgAPI} from "../../services/vg-api";
import {ElementRef} from "@angular/core";

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
                state: 'play'
            },
            secondary: {
                state: 'pause'
            }
        };


        playbackButton = new VgPlaybackButton(ref, api);
    });

    it('Should set playbackIndex default value to 1', () => {
        expect(playbackButton.playbackIndex).toEqual(1);
    });

    it('Should get media by id on init', () => {
        spyOn(playbackButton.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById');

        playbackButton.onPlayerReady();

        expect(playbackButton.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    describe('onClick (single and multiple media)', () => {
        it('should increase playbackIndex', () => {
            api.medias = {
                main: {
                    state: 'play'
                }
            };

            playbackButton.target = api;

            playbackButton.onClick();

            expect(playbackButton.playbackIndex).toEqual(2);
        });

        it('should set playbackRate to target media', () => {
            api.medias = {
                main: {
                    state: 'play'
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
