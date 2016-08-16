import {VgTimeDisplay} from "./vg-time-display";
import {ElementRef} from "@angular/core";
import {VgAPI} from "../../services/vg-api";

describe('Time Display', () => {
    let timeDisplay:VgTimeDisplay;
    let ref:ElementRef;
    let api:VgAPI;
    let renderer;

    beforeEach(() => {
        api = new VgAPI();

        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                }
            }
        };

        renderer = {
            setElementClass: () => {}
        };

        timeDisplay = new VgTimeDisplay(ref, api);
    });

    it('Should have been defined', () => {
        expect(timeDisplay).toBeTruthy();
    });

    it('Should be initialized', () => {
        spyOn(timeDisplay.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById').and.callFake(() => { return ref.nativeElement; });

        timeDisplay.onPlayerReady();

        expect(timeDisplay.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
        expect(timeDisplay.vgFor).toBe('vg-for');
        expect(timeDisplay.target).toBe(ref.nativeElement);
    });
});
