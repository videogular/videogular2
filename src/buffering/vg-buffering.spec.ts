import {VgBuffering} from "./vg-buffering";
import {VgAPI} from "../core/services/vg-api";
import {IPlayable} from "../core/vg-media/i-playable";
import {ElementRef} from "@angular/core";
import { VgStates } from "../core/states/vg-states";

describe('Buffering', () => {
    let vgBuffering:VgBuffering;
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
        vgBuffering = new VgBuffering(ref, api);
    });

    describe('onPlayerReady', ()=>{
        it('should subscribe to bufferDetected media events', ()=>{
            spyOn(api, 'getMediaById').and.returnValue({
                subscriptions: {
                    bufferDetected: {subscribe: jasmine.createSpy('bufferDetected') }
                }
            });
            vgBuffering.onPlayerReady();
            expect(vgBuffering.target.subscriptions.bufferDetected.subscribe).toHaveBeenCalled();
        });
    });

    describe('isBuffering', ()=> {
        it('should show if buffer is detected', () => {
            vgBuffering.onUpdateBuffer(true);
            expect(vgBuffering.isBuffering).toBe(true);
        });
        it('should hide if buffer is not detected', () => {
            vgBuffering.onUpdateBuffer(false);
            expect(vgBuffering.isBuffering).toBe(false);
        });
    });
});
