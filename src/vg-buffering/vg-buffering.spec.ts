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
        it('should subscribe to play and pause media events', ()=>{
            spyOn(api, 'getMediaById').and.returnValue({
                subscriptions: {
                    play: {subscribe: jasmine.createSpy('play') },
                    pause: {subscribe: jasmine.createSpy('pause') }
                }
            });
            vgBuffering.onPlayerReady();
            expect(vgBuffering.target.subscriptions.play.subscribe).toHaveBeenCalled();
            expect(vgBuffering.target.subscriptions.pause.subscribe).toHaveBeenCalled();
        });
    });
    
    describe('startBufferCheck', ()=>{
        it('should register bufferCheck in a setInterval', () => {
            spyOn(window, 'setInterval').and.returnValue(100);
            vgBuffering.checkInterval = 77;
            vgBuffering.startBufferCheck();
            expect(window.setInterval).toHaveBeenCalledWith(
                vgBuffering.bufferCheck,
                77
            );
            expect(vgBuffering.checkBufferInterval).toBe(100);
        });
    });
    
    describe('stopBufferCheck', ()=>{
        it('should unregister bufferCheck from setInterval', () => {
            spyOn(window, 'clearInterval');
            vgBuffering.stopBufferCheck();
            expect(window.clearInterval).toHaveBeenCalledWith(
                vgBuffering.checkBufferInterval
            );
        });
        it('should set props to hide buffering indicator', () => {
            vgBuffering.bufferingDetected = true;
            spyOn(vgBuffering, 'hide');
            vgBuffering.stopBufferCheck();
            expect(vgBuffering.bufferingDetected).toBe(false);
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
    
    describe('bufferCheck', ()=>{
        beforeEach(()=>{
            vgBuffering.target = <IPlayable>{currentTime:0};
        });
        it('should set bufferingDetected to true', () => {
            spyOn(vgBuffering, 'show');
            vgBuffering.bufferingDetected = false;
            vgBuffering.target.currentTime = 10;
            vgBuffering.lastPlayPos = 10;
            vgBuffering.bufferCheck();
            expect(vgBuffering.bufferingDetected).toBe(true);
            expect(vgBuffering.lastPlayPos).toBe(10);
            expect(vgBuffering.show).toHaveBeenCalled();
        });
        
        it('should set bufferingDetected to false', () => {
            spyOn(vgBuffering, 'hide');
            vgBuffering.bufferingDetected = true;
            vgBuffering.target.currentTime = 20;
            vgBuffering.lastPlayPos = 10;
            vgBuffering.bufferCheck();
            expect(vgBuffering.bufferingDetected).toBe(false);
            expect(vgBuffering.lastPlayPos).toBe(20);
            expect(vgBuffering.hide).toHaveBeenCalled();
        });
    });
});