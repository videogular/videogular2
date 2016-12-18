import {VgTimeDisplay} from "./vg-time-display";
import {ElementRef} from "@angular/core";
import {VgAPI} from "../../core/services/vg-api";

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
        spyOn(api, 'getMediaById').and.callFake(() => { return ref.nativeElement; });

        timeDisplay.vgFor = 'test';
        timeDisplay.onPlayerReady();

        expect(api.getMediaById).toHaveBeenCalledWith('test');
        expect(timeDisplay.target).toBe(ref.nativeElement);
    });

    describe('getTime', () => {
        it('should return 0 when no target defined', () => {
            expect(timeDisplay.getTime()).toBe(0);
        });
        it('should return 0 when target and its property cannot be evaluated to number', () => {
            timeDisplay.vgProperty = "something";
            timeDisplay.target = {
                time: {
                    "something": "abcd"
                }
            };
            expect(timeDisplay.getTime()).toBe(0);
        });
        it('should return a rounded number when target and its vgProperty can be evaluated to number', () => {
            timeDisplay.vgProperty = "something";
            timeDisplay.target = {
                time: {
                    "something": 5.3
                }
            };
            expect(timeDisplay.getTime()).toBe(5);
        });
    });
});
