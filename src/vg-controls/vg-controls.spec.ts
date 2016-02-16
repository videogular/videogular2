import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {TestComponentBuilder, fakeAsync} from 'angular2/testing_internal';
import {VgControls} from "./vg-controls";
import {ElementRef, Renderer, ViewMetadata} from "angular2/core";

describe('Controls Bar', () => {
    let controls:VgControls;
    let ref:ElementRef;
    let renderer:Renderer;

    it('Should be defined', () => {
        // ref = {
        //     nativeElement: {
        //         getAttribute: (name) => {
        //             return name;
        //         }
        //     }
        // };
        // renderer = new Renderer();
        // controls = new VgControls(ref, renderer);
    });

    // it('Should have been defined', () => {
    //     expect(controls).toBeTruthy();
    // });
});
