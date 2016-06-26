import {it, xit, describe, expect} from "@angular/core/testing";
import {QueryList} from "@angular/core";
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";
import {VgMedia} from "../vg-media/vg-media";
import {VgUtils} from "./vg-utils";

describe('Videogular Player', () => {
    let medias:QueryList<any>;
    let elem:HTMLElement;

    beforeEach(() => {
        medias = new QueryList();
        elem = <HTMLElement>{
            webkitRequestFullscreen: () => {}
        };

        VgFullscreenAPI.isAvailable = true;
        VgFullscreenAPI.nativeFullscreen = true;
        VgFullscreenAPI.init(elem, medias);
    });

    it('Should create polyfills on init', () => {
        expect(VgFullscreenAPI.polyfill.enabled).toBe('webkitFullscreenEnabled');
        expect(VgFullscreenAPI.polyfill.element).toBe('webkitFullscreenElement');
        expect(VgFullscreenAPI.polyfill.request).toBe('webkitRequestFullscreen');
        expect(VgFullscreenAPI.polyfill.exit).toBe('webkitExitFullscreen');
        expect(VgFullscreenAPI.polyfill.onchange).toBe('webkitfullscreenchange');
        expect(VgFullscreenAPI.polyfill.onerror).toBe('webkitfullscreenerror');
    });

    it('Should request an element to enter in fullscreen mode (desktop)', () => {
        spyOn(VgFullscreenAPI, 'enterElementInFullScreen').and.callFake(() => {});

        VgFullscreenAPI.request(null);

        expect(VgFullscreenAPI.isFullscreen).toBeTruthy();
        expect(VgFullscreenAPI.enterElementInFullScreen).toHaveBeenCalledWith(elem);
    });

    it('Should request an element to enter in fullscreen mode (mobile)', () => {
        spyOn(VgUtils, 'isMobileDevice').and.callFake(() => {return true;});
        spyOn(VgFullscreenAPI, 'enterElementInFullScreen').and.callFake(() => {});

        VgFullscreenAPI.request(null);

        expect(VgFullscreenAPI.isFullscreen).toBeTruthy();
        expect(VgUtils.isMobileDevice).toHaveBeenCalled();
        expect(VgFullscreenAPI.enterElementInFullScreen).toHaveBeenCalledWith(elem);
    });

    it('Should request an element to enter in fullscreen mode (mobile with param elem)', () => {
        spyOn(VgUtils, 'isMobileDevice').and.callFake(() => {return true;});
        spyOn(VgFullscreenAPI, 'enterElementInFullScreen').and.callFake(() => {});

        VgFullscreenAPI.request(elem);

        expect(VgFullscreenAPI.isFullscreen).toBeTruthy();
        expect(VgUtils.isMobileDevice).toHaveBeenCalled();
        expect(VgFullscreenAPI.enterElementInFullScreen).toHaveBeenCalledWith(elem);
    });

    it('Should not request an element to enter in fullscreen mode', () => {
        spyOn(VgFullscreenAPI, 'enterElementInFullScreen').and.callFake(() => {});

        VgFullscreenAPI.nativeFullscreen = false;
        VgFullscreenAPI.request(elem);

        expect(VgFullscreenAPI.enterElementInFullScreen).not.toHaveBeenCalled();
    });

    it('Should enter in fullscreen mode', () => {
        spyOn(<any>elem, 'webkitRequestFullscreen').and.callThrough();

        VgFullscreenAPI.enterElementInFullScreen(elem);

        expect((<any>elem).webkitRequestFullscreen).toHaveBeenCalled();
    });

    it('Should request an element to exit from fullscreen mode (native)', () => {
        VgFullscreenAPI.polyfill.exit = 'mockedExitFunction';

        (<any>document).mockedExitFunction = () => {};

        spyOn(document, 'mockedExitFunction').and.callThrough();

        VgFullscreenAPI.exit();

        expect(VgFullscreenAPI.isFullscreen).toBeFalsy();
        expect((<any>document).mockedExitFunction).toHaveBeenCalled();
    });

    it('Should request an element to exit from fullscreen mode (emulated)', () => {
        VgFullscreenAPI.polyfill.exit = 'mockedExitFunction';

        (<any>document).mockedExitFunction = () => {};

        spyOn(document, 'mockedExitFunction').and.callThrough();

        VgFullscreenAPI.nativeFullscreen = false;
        VgFullscreenAPI.exit();

        expect(VgFullscreenAPI.isFullscreen).toBeFalsy();
        expect((<any>document).mockedExitFunction).not.toHaveBeenCalled();
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
