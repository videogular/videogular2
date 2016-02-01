import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgControls} from "./vg-controls";

describe('Controls Bar', () => {
    let controls:VgControls;

    beforeEach(() => {
        controls = new VgControls();
    });

    it('Should have been defined', () => {
        expect(controls).toBeTruthy();
    });
});
