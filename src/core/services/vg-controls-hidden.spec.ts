import { Observable } from 'rxjs';
import { VgControlsHidden } from './vg-controls-hidden';

describe('VgControlsHidden Service', () => {
    let controlsHidden: VgControlsHidden;

    beforeEach(() => {
        controlsHidden = new VgControlsHidden();
    });

    it('Should provide an Observable', () => {
        expect(controlsHidden.isHidden).toEqual(jasmine.any(Observable));
    });

    it('Should set state to true', () => {
        controlsHidden.isHidden.subscribe(state => {
            expect(state).toBe(true);
        });

        controlsHidden.state(true);
    });

    it('Should set state to false', () => {
        controlsHidden.isHidden.subscribe(state => {
            expect(state).toBe(false);
        });

        controlsHidden.state(false);
    });
});
