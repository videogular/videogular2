import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";


describe('Videogular Player', () => {
    beforeEach(() => {
        VgFullscreenAPI.init();
    });

    it('Should create polyfills on init', () => {
        expect(VgFullscreenAPI.polyfill.enabled).toBe('webkitFullscreenEnabled');
        expect(VgFullscreenAPI.polyfill.element).toBe('webkitFullscreenElement');
        expect(VgFullscreenAPI.polyfill.request).toBe('webkitRequestFullscreen');
        expect(VgFullscreenAPI.polyfill.exit).toBe('webkitExitFullscreen');
        expect(VgFullscreenAPI.polyfill.onchange).toBe('webkitfullscreenchange');
        expect(VgFullscreenAPI.polyfill.onerror).toBe('webkitfullscreenerror');
    });

    it('Should return if an element is in fullscreen mode', () => {
        let isFullscreen;

        VgFullscreenAPI.polyfill.element = 'mockedElementFunction';

        (<any>document).mockedElementFunction = {};

        isFullscreen = VgFullscreenAPI.isFullscreen();

        expect(isFullscreen).toBeTruthy();

        (<any>document).mockedElementFunction = undefined;

        isFullscreen = VgFullscreenAPI.isFullscreen();

        expect(isFullscreen).toBeFalsy();
    });

    it('Should request an element to enter in fullscreen mode', () => {
        let elem = {
            webkitRequestFullscreen: () => {}
        };

        spyOn(elem, 'webkitRequestFullscreen').and.callThrough();

        VgFullscreenAPI.request(elem);

        expect(elem.webkitRequestFullscreen).toHaveBeenCalled();
    });

    it('Should request an element to exit from fullscreen mode', () => {
        VgFullscreenAPI.polyfill.exit = 'mockedExitFunction';

        (<any>document).mockedExitFunction = () => {};

        spyOn(document, 'mockedExitFunction').and.callThrough();

        VgFullscreenAPI.exit();

        expect((<any>document).mockedExitFunction).toHaveBeenCalled();
    });
});
