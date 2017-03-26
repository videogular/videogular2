import {VgVolume} from "./vg-volume";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";

describe('Volume control', () => {
    let vgVol:VgVolume;
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
        vgVol = new VgVolume(ref, api);
    });

    it('Should have isDragging set to false initially', () => {
        expect(vgVol.isDragging).toBe(false);
    });
    
    describe('onPlayerReady', ()=>{
        it('Should set vgFor', () => {
            vgVol.vgFor = 'test';
            vgVol.onPlayerReady();
            expect(vgVol.vgFor).toBe('test');
        });
        it('Should set target', () => {
            spyOn(api, 'getMediaById');
            vgVol.onPlayerReady();
            expect(api.getMediaById).toHaveBeenCalled();
        });
    });

    describe('onMouseDown', ()=>{
        it('Should set isDragging to true', ()=>{
            vgVol.onMouseDown({clientX: 0});
            expect(vgVol.isDragging).toBe(true);
        });
        it('Should set mouseDownPosX to event.x', ()=>{
            vgVol.onMouseDown({clientX: 99});
            expect(vgVol.mouseDownPosX).toBe(99);
        });
    });
    
    describe('onDrag', ()=>{
        beforeEach(()=>{
            spyOn(vgVol, 'setVolume');
            spyOn(vgVol, 'calculateVolume');
        });
        it('Should call setVolume when dragging', ()=>{
            vgVol.isDragging = true;
            vgVol.onDrag({clientX: 0});
            expect(vgVol.setVolume).toHaveBeenCalled();
        });
        it('Should not call setVolume when not dragging', ()=>{
            vgVol.isDragging = false;
            vgVol.onDrag({clientX: 0});
            expect(vgVol.setVolume).not.toHaveBeenCalled();
        });
    });

    describe('onStopDrag', ()=>{
        beforeEach(()=>{
            spyOn(vgVol, 'setVolume');
            spyOn(vgVol, 'calculateVolume');
        });
        it('Should toggle dragging value when dragging', ()=>{
            vgVol.isDragging = true;
            vgVol.mouseDownPosX = 0;
            vgVol.onStopDrag({clientX:0});
            expect(vgVol.isDragging).toBe(false);
        });
        it('Should call setVolume when dragging and x positions match', ()=>{
            vgVol.isDragging = true;
            vgVol.mouseDownPosX = 0;
            vgVol.onStopDrag({clientX:0});
            expect(vgVol.setVolume).toHaveBeenCalled();
        });
        it('Should not call setVolume when dragging but x positions dont match', ()=>{
            vgVol.isDragging = true;
            vgVol.mouseDownPosX = 1;
            vgVol.onStopDrag({clientX:0});
            expect(vgVol.setVolume).not.toHaveBeenCalled();
        });
        it('Should not call setVolume when not dragging', ()=>{
            vgVol.isDragging = false;
            vgVol.mouseDownPosX = 0;
            vgVol.onStopDrag({clientX:0});
            expect(vgVol.setVolume).not.toHaveBeenCalled();
        });
    });

    describe('calculateVolume', ()=>{
        it('Shoud calculate volume based on volumeBar position', ()=>{
            // mock volumeBarRef ViewChild
            vgVol.volumeBarRef = {
              nativeElement: {
                getBoundingClientRect() {
                  return { left: 5, width: 100 }
                }
              }
            };
            expect(vgVol.calculateVolume(10)).toBe(5);
        });
    });

    describe('setVolume', ()=>{
        it('Shoud convert volume to a value between 0 and 1', ()=>{
            vgVol.target = {
                volume: 3.33
            };
            vgVol.setVolume(50);
            expect(vgVol.target.volume).toBe(0.5);

            vgVol.setVolume(110);
            expect(vgVol.target.volume).toBe(1);
            
            vgVol.setVolume(-10);
            expect(vgVol.target.volume).toBe(0);
        });
    });
    
    describe('getVolume', ()=>{
        it('Shoud get target volume when target is set', ()=>{
            vgVol.target = {
                volume: 3.33
            };
            expect(vgVol.getVolume()).toBe(3.33);
        });
        it('Shoud get 0 volume when target is not set', ()=>{
            vgVol.target = undefined;
            expect(vgVol.getVolume()).toBe(0);
        });
    });
});
