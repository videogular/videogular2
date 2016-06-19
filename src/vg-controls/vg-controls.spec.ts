import {it, describe, expect, beforeEach, afterEach} from "@angular/core/testing";
import {VgControls} from "./vg-controls";
import {ElementRef, Renderer} from "@angular/core";
import {VgAPI} from "../services/vg-api";
import {Observable} from "rxjs/Observable";

describe('Controls Bar', () => {
    let controls:VgControls;
    let ref:ElementRef;
    let api:VgAPI;
    let renderer;

    beforeEach(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();

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

        controls = new VgControls(api, ref, (<Renderer>renderer));
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('Should have been defined', () => {
        expect(controls).toBeTruthy();
    });

    it('Should listen for mouseenter and mouseleave events', () => {
        spyOn(Observable, 'fromEvent').and.callThrough();

        var vgElem = document.createElement('vg-player');

        api.registerElement(vgElem);

        controls.ngOnInit();

        expect(Observable.fromEvent).toHaveBeenCalledWith(api.videogularElement, 'mouseenter');
        expect(Observable.fromEvent).toHaveBeenCalledWith(api.videogularElement, 'mouseleave');
    });

    it('Should hide controls after view init', () => {
        spyOn(controls, 'hide').and.callFake(() => {});

        controls.autohide = true;

        controls.ngAfterViewInit();

        expect(controls.hide).toHaveBeenCalled();
    });

    it('Should show controls after view init', () => {
        spyOn(controls, 'show').and.callFake(() => {});

        controls.autohide = false;

        controls.ngAfterViewInit();

        expect(controls.show).toHaveBeenCalled();
    });

    it('Should show controls', () => {
        spyOn(window, 'clearTimeout').and.callFake(() => {});
        spyOn(renderer, 'setElementClass').and.callThrough();

        controls.show();

        expect(window.clearTimeout).toHaveBeenCalled();
        expect(renderer.setElementClass).toHaveBeenCalledWith(ref.nativeElement, 'hide', false);
    });

    it('Should hide controls', () => {
        spyOn(renderer, 'setElementClass').and.callThrough();

        controls.autohide = true;

        controls.hide();

        jasmine.clock().tick(3100);
        expect(renderer.setElementClass).toHaveBeenCalledWith(ref.nativeElement, 'hide', true);
    });

    it('Should not hide controls', () => {
        spyOn(renderer, 'setElementClass').and.callThrough();

        controls.autohide = false;

        controls.hide();

        jasmine.clock().tick(3100);
        expect(renderer.setElementClass).not.toHaveBeenCalled();
    });
});
