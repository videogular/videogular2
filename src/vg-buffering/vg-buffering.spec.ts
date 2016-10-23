import {VgBuffering} from "./vg-buffering";
import {VgAPI} from "../services/vg-api";
import {IPlayable} from "../vg-media/i-playable";
import {ElementRef} from "@angular/core";

describe('Volume control', () => {
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

    describe('isBuffering', ()=>{
        it('should show if buffer is detected', () => {
            spyOn(vgBuffering, 'show');
            vgBuffering.onUpdateBuffer(true);
            expect(vgBuffering.show).toHaveBeenCalled();
        });
        it('should hide if buffer is not detected', () => {
            spyOn(vgBuffering, 'hide');
            vgBuffering.onUpdateBuffer(false);
            expect(vgBuffering.hide).toHaveBeenCalled();
        });
    });

    describe('show', ()=>{
        it('should set displayState to "block"', () => {
            vgBuffering.displayState = 'none';
            vgBuffering.show();
            expect(vgBuffering.displayState).toBe('block');
        });
    });
    
    describe('hide', ()=>{
        it('should set displayState to "none"', () => {
            vgBuffering.displayState = 'block';
            vgBuffering.hide();
            expect(vgBuffering.displayState).toBe('none');
        });
    });
});