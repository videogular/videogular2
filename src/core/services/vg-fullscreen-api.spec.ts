import {QueryList} from "@angular/core";
import {VgFullscreenAPI} from "./vg-fullscreen-api";
import {VgUtils} from "./vg-utils";

describe('Videogular Player', () => {
    let medias:QueryList<any>;
    let elem:HTMLElement;
    let fsAPI: VgFullscreenAPI;

    beforeEach(() => {
        medias = new QueryList();
        elem = document.createElement('video');

        fsAPI = new VgFullscreenAPI();
        fsAPI.isAvailable = true;
        fsAPI.nativeFullscreen = true;
        fsAPI.init(elem, medias);
    });

    it('Should create polyfills on init', () => {
        expect(fsAPI.polyfill.enabled).toBe('fullscreenEnabled');
        expect(fsAPI.polyfill.element).toBe('fullscreenElement');
        expect(fsAPI.polyfill.request).toBe('requestFullscreen');
        expect(fsAPI.polyfill.exit).toBe('exitFullscreen');
        expect(fsAPI.polyfill.onchange).toBe('fullscreenchange');
        expect(fsAPI.polyfill.onerror).toBe('fullscreenerror');
    });

    it('Should request an element to enter in fullscreen mode (desktop)', () => {
        spyOn(fsAPI, 'enterElementInFullScreen').and.callFake(() => {});

        fsAPI.request(null);

        expect(fsAPI.isFullscreen).toBeTruthy();
        expect(fsAPI.enterElementInFullScreen).toHaveBeenCalledWith(elem);
    });

    it('Should request an element to enter in fullscreen mode (mobile)', () => {
        spyOn(VgUtils, 'isMobileDevice').and.callFake(() => {return true;});
        spyOn(fsAPI, 'enterElementInFullScreen').and.callFake(() => {});

        fsAPI.request(null);

        expect(fsAPI.isFullscreen).toBeTruthy();
        expect(VgUtils.isMobileDevice).toHaveBeenCalled();
        expect(fsAPI.enterElementInFullScreen).toHaveBeenCalledWith(elem);
    });

    it('Should request an element to enter in fullscreen mode (mobile with param elem)', () => {
        spyOn(VgUtils, 'isMobileDevice').and.callFake(() => {return true;});
        spyOn(fsAPI, 'enterElementInFullScreen').and.callFake(() => {});

        fsAPI.request(elem);

        expect(fsAPI.isFullscreen).toBeTruthy();
        expect(VgUtils.isMobileDevice).toHaveBeenCalled();
        expect(fsAPI.enterElementInFullScreen).toHaveBeenCalledWith(elem);
    });

    it('Should not request an element to enter in fullscreen mode', () => {
        spyOn(fsAPI, 'enterElementInFullScreen').and.callFake(() => {});

        fsAPI.nativeFullscreen = false;
        fsAPI.request(elem);

        expect(fsAPI.enterElementInFullScreen).not.toHaveBeenCalled();
    });

    it('Should enter in fullscreen mode', () => {
        spyOn(<any>elem, 'requestFullscreen').and.callThrough();

        fsAPI.enterElementInFullScreen(elem);

        expect((<any>elem).requestFullscreen).toHaveBeenCalled();
    });

    it('Should request an element to exit from fullscreen mode (native)', () => {
        fsAPI.polyfill.exit = 'mockedExitFunction';

        (<any>document).mockedExitFunction = () => {};

        spyOn(document, 'mockedExitFunction' as any).and.callThrough();

        fsAPI.exit();

        expect(fsAPI.isFullscreen).toBeFalsy();
        expect((<any>document).mockedExitFunction).toHaveBeenCalled();
    });

    it('Should request an element to exit from fullscreen mode (emulated)', () => {
        fsAPI.polyfill.exit = 'mockedExitFunction';

        (<any>document).mockedExitFunction = () => {};

        spyOn(document, 'mockedExitFunction' as any).and.callThrough();

        fsAPI.nativeFullscreen = false;
        fsAPI.exit();

        expect(fsAPI.isFullscreen).toBeFalsy();
        expect((<any>document).mockedExitFunction).not.toHaveBeenCalled();
    });

    it('Should enter videogular element to fullscreen mode', () => {
        fsAPI.videogularElement = <HTMLElement>{id: 'vgElem'};

        spyOn(fsAPI, 'request').and.callFake(() => {});

        fsAPI.toggleFullscreen();

        expect(fsAPI.request).toHaveBeenCalledWith(null);
    });

    it('Should enter other element to fullscreen mode', () => {
        let element = {id: 'main'};

        fsAPI.videogularElement = <HTMLElement>{id: 'vgElem'};

        spyOn(fsAPI, 'request').and.callFake(() => {});

        fsAPI.toggleFullscreen(element);

        expect(fsAPI.request).toHaveBeenCalledWith(element);
    });

    it('Should exit from fullscreen mode', () => {
        fsAPI.isFullscreen = true;

        spyOn(fsAPI, 'exit').and.callFake(() => {});

        fsAPI.toggleFullscreen();

        expect(fsAPI.exit).toHaveBeenCalled();
    });
});
