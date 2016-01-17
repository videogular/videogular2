import {it, describe, expect, beforeEachProviders, inject} from 'angular2/testing';
import {VgPlayer} from "./vg-player";
import {VgAPI} from "../services/vg-api";

describe('Videogular Player', () => {
    beforeEachProviders(() => [VgAPI]);

    it('Should have a video player', inject([VgAPI], (api) => {
        var ref = {
            nativeElement: {
                querySelectorAll: () => {
                    return [{}];
                }
            }
        };

        var player = new VgPlayer(ref, api);
    }));
});
