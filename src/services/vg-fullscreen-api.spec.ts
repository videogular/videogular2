import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";


describe('Videogular Player', () => {
    beforeEach(() => {
        VgFullscreenAPI.init(<HTMLElement>document.body, [{}]);
    });

    it('Should create polyfills on init', () => {
        expect(VgFullscreenAPI.polyfill.enabled).toBe('webkitFullscreenEnabled');
        expect(VgFullscreenAPI.polyfill.element).toBe('webkitFullscreenElement');
        expect(VgFullscreenAPI.polyfill.request).toBe('webkitRequestFullscreen');
        expect(VgFullscreenAPI.polyfill.exit).toBe('webkitExitFullscreen');
        expect(VgFullscreenAPI.polyfill.onchange).toBe('webkitfullscreenchange');
        expect(VgFullscreenAPI.polyfill.onerror).toBe('webkitfullscreenerror');
    });

    it('Should request an element to enter in fullscreen mode', () => {
        let elem = {
            webkitRequestFullscreen: () => {}
        };

        spyOn(document.body, 'webkitRequestFullscreen').and.callThrough();

        VgFullscreenAPI.request(elem);

        expect(VgFullscreenAPI.isFullscreen).toBeTruthy();
        expect((<HTMLElement>document.body).webkitRequestFullscreen).toHaveBeenCalled();
    });

    it('Should request an element to exit from fullscreen mode', () => {
        VgFullscreenAPI.polyfill.exit = 'mockedExitFunction';

        (<any>document).mockedExitFunction = () => {};

        spyOn(document, 'mockedExitFunction').and.callThrough();

        VgFullscreenAPI.exit();

        expect(VgFullscreenAPI.isFullscreen).toBeFalsy();
        expect((<any>document).mockedExitFunction).toHaveBeenCalled();
    });

    it('Should enter videogular element to fullscreen mode', () => {
        VgFullscreenAPI.videogularElement = <HTMLElement>{id: 'vgElem'};

        spyOn(VgFullscreenAPI, 'request').and.callFake(() => {});

        VgFullscreenAPI.toggleFullscreen();

        expect(VgFullscreenAPI.request).toHaveBeenCalledWith(null);
    });

    it('Should enter other element to fullscreen mode', () => {
        var element = {id: 'main'};

        VgFullscreenAPI.videogularElement = <HTMLElement>{id: 'vgElem'};

        spyOn(VgFullscreenAPI, 'request').and.callFake(() => {});

        VgFullscreenAPI.toggleFullscreen(element);

        expect(VgFullscreenAPI.request).toHaveBeenCalledWith(element);
    });

    it('Should exit from fullscreen mode', () => {
        VgFullscreenAPI.isFullscreen = true;

        spyOn(VgFullscreenAPI, 'exit').and.callFake(() => {});

        VgFullscreenAPI.toggleFullscreen();

        expect(VgFullscreenAPI.exit).toHaveBeenCalled();
    });
});
