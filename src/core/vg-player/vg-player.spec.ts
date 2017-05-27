import {async, inject, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {VgPlayer} from "./vg-player";
import {VgMedia} from "../vg-media/vg-media";
import {VgAPI} from "../services/vg-api";
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";
import {ElementRef} from "@angular/core";
import { VgControlsHidden } from '../services/vg-controls-hidden';

describe('Videogular Player', () => {
    let player:VgPlayer;
    let ref:ElementRef;
    let api:VgAPI;
    let fsAPI:VgFullscreenAPI;
    let controlsHidden:VgControlsHidden;

    beforeEach(() => {
        ref = {
            nativeElement: {
                querySelectorAll: () => {
                    return [{}];
                }
            }
        };

        controlsHidden = {
            isHidden: {
                subscribe: () => {}
            }
        } as VgControlsHidden;

        api = new VgAPI();
        fsAPI = new VgFullscreenAPI();
        player = new VgPlayer(ref, api, fsAPI, controlsHidden);
    });

    it('Should handle native fullscreen', () => {
        fsAPI.nativeFullscreen = true;

        player.onChangeFullscreen(true);

        expect(player.isFullscreen).toBeFalsy();
    });

    it('Should handle emulated fullscreen enabled', () => {
        fsAPI.nativeFullscreen = false;

        player.onChangeFullscreen(true);

        expect(player.isFullscreen).toBeTruthy();
        expect(player.zIndex).toBe('1');
    });

    it('Should handle emulated fullscreen enabled', () => {
        fsAPI.nativeFullscreen = false;

        player.onChangeFullscreen(false);

        expect(player.isFullscreen).toBeFalsy();
        expect(player.zIndex).toBe('auto');
    });
});

describe('Videogular Player', () => {
    let builder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [VgPlayerTest, VgPlayer]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it('Should create a VgPlayer component',
        async(() => {
            let fixture = TestBed.createComponent(VgPlayerTest);
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            let video = compiled.querySelector('video');

            expect(video.controls).toBe(true);
        })
    );
});

@Component({
    template: `
        <vg-player>
            <video vg-media id="singleVideo" preload="auto" controls>
                <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
                <source src="http://static.videogular.com/assets/videos/videogular.ogg" type="video/ogg">
                <source src="http://static.videogular.com/assets/videos/videogular.webm" type="video/webm">
            </video>
        </vg-player>
    `,
    providers: [VgAPI]
})
class VgPlayerTest {}
