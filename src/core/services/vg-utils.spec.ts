import {VgUtils} from "./vg-utils";

describe('Videogular Utils', () => {
    it('Should get the highest z-index', () => {
        spyOn(window, 'getComputedStyle').and.callFake(() => {
            return {
                'z-index': 2
            };
        });

        let highestZ = VgUtils.getZIndex();

        expect(highestZ).toBe(3);
    });

    it('Should get if is a mobile device', () => {
        window.orientation = 'true';

        let isMobileDevice = VgUtils.isMobileDevice();

        expect(isMobileDevice).toBeTruthy();
    });

    it('Should get if is an iOS device', () => {
        let isiOS = VgUtils.isiOSDevice();

        expect(isiOS).toBeFalsy();
    });

    it('Should get if is a Cordova app', () => {
        let isCordova = VgUtils.isCordova();

        expect(isCordova).toBeFalsy();
    });
});
