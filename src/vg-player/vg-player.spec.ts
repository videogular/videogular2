///<reference path="../../typings/main/ambient/jasmine/index.d.ts"/>
///<reference path="../../typings/main/ambient/three/index.d.ts"/>

import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgPlayer} from "./vg-player";
import {VgAPI} from "../services/vg-api";
import {ElementRef} from "angular2/core";


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

    it('Should get all medias on init', () => {
        spyOn(player.elem, 'querySelectorAll').and.callThrough();
        spyOn(api, 'registerMedia').and.callFake(() => {});
        spyOn(player.onPlayerReady, 'next').and.callFake(() => {});

        player.ngOnInit();

        expect(player.elem.querySelectorAll).toHaveBeenCalledWith('video');
        expect(api.registerMedia).toHaveBeenCalledWith({});
        expect(player.onPlayerReady.next).toHaveBeenCalledWith(player.api);
    });
});
