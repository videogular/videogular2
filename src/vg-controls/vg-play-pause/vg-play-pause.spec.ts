import {it, describe, expect, beforeEach} from "@angular/core/testing";
import {VgPlayPause} from "./vg-play-pause";
import {VgAPI} from "../../services/vg-api";
import {ElementRef} from "@angular/core";

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
                state: 'play'
            },
            secondary: {
                state: 'pause'
            }
        };


        playPause = new VgPlayPause(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(playPause.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById').and.callFake(() => {
            return {
                volume: 1
            };
        });

        playPause.ngOnInit();

        expect(playPause.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    it('Should get average state between all media files (play)', () => {
        playPause.target = api;

        var state = playPause.getState();

        // If one media is on 'play' state we return 'play' as average state
        expect(state).toBe('play');
    });

    it('Should get average state between all media files (pause)', () => {
        api.medias = {
            main: {
                state: 'pause'
            },
            secondary: {
                state: 'pause'
            }
        };

        playPause.target = api;

        var state = playPause.getState();

        // If all medias are on 'pause' state we return 'pause' as average state
        expect(state).toBe('pause');
    });

    it('Should get state for one media file', () => {
        api.medias = {
            main: {
                state: 'play'
            }
        };

        playPause.target = api;

        var volume = playPause.getState();

        expect(volume).toBe('play');
    });

    describe('onClick (single and multiple media)', () => {
        it('should pause if current state is different play', () => {
            spyOn(api, 'pause').and.callFake(() => {});

            api.medias = {
                main: {
                    state: 'play'
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
                    state: 'pause'
                }
            };

            playPause.target = api;

            playPause.onClick();

            expect(api.play).toHaveBeenCalled();
        });
    });
});
