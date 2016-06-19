/// <reference path="../../typings/browser/ambient/jasmine/index.d.ts"/>

import {it, describe, beforeEach} from "@angular/core/testing";
import {VgPlayer} from "./vg-player";
import {VgAPI} from "../services/vg-api";
import {ElementRef} from "@angular/core";


describe('Videogular Player', () => {
    let player:VgPlayer;
    let ref:ElementRef;
    let api:VgAPI;

    beforeEach(() => {
        ref = {
            nativeElement: {
                querySelectorAll: () => {
                    return [{}];
                }
            }
        };

        api = new VgAPI();
        player = new VgPlayer(ref, api);
    });

    it('Should get all medias on init', () => {});
});
