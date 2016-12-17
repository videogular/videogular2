import {VgPlayPause} from "./vg-play-pause";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";
import {VgStates} from "../../core/states/vg-states";

describe('Play/Pause Button', () => {
    let playPause:VgPlayPause;
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


        playPause = new VgPlayPause(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(api, 'getMediaById').and.callFake(() => {
            return {
                volume: 1
            };
        });

        playPause.vgFor = 'test';
        playPause.onPlayerReady();

        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });

    it('Should get state for one media file', () => {
        api.medias = {
            main: {
                state: VgStates.VG_PLAYING
            }
        };

        playPause.target = api;

        let state = playPause.getState();

        expect(state).toBe(VgStates.VG_PLAYING);
    });

    describe('onClick (single and multiple media)', () => {
        it('should pause if current state is different play', () => {
            spyOn(api, 'pause').and.callFake(() => {});

            api.medias = {
                main: {
                    state: VgStates.VG_PLAYING
                }
            };

            playPause.target = api;

            playPause.onClick();

            expect(api.pause).toHaveBeenCalled();
        });

        it('should play if current state is pause', () => {
            spyOn(api, 'play').and.callFake(() => {});

            api.medias = {
                main: {
                    state: VgStates.VG_PAUSED
                }
            };

            playPause.target = api;

            playPause.onClick();

            expect(api.play).toHaveBeenCalled();
        });

        it('should play if current state is ended', () => {
            spyOn(api, 'play').and.callFake(() => {});

            api.medias = {
                main: {
                    state: VgStates.VG_ENDED
                }
            };

            playPause.target = api;

            playPause.onClick();

            expect(api.play).toHaveBeenCalled();
        });
    });
});
