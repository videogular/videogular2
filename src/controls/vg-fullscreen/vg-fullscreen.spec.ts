import {VgFullscreen} from "./vg-fullscreen";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";
import {VgFullscreenAPI} from "../../core/services/vg-fullscreen-api";

describe('Videogular Player', () => {
    let fullscreen: VgFullscreen;
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
        fullscreen = new VgFullscreen(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(fullscreen.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById').and.callFake(() => { });

        fullscreen.onPlayerReady();

        expect(fullscreen.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    describe('onClick', () => {
        beforeEach(() => {
            spyOn(VgFullscreenAPI, 'toggleFullscreen');
        });

        it('Should call toggleFullscreen with null param if target is API', () => {
            fullscreen.target = api;

            fullscreen.onClick();

            expect(VgFullscreenAPI.toggleFullscreen).toHaveBeenCalledWith(null);
        });

        it('Should call toggleFullscreen with target param if target', () => {
            fullscreen.target = 'test';

            fullscreen.onClick();

            expect(VgFullscreenAPI.toggleFullscreen).toHaveBeenCalledWith('test');
        });
    });
});
