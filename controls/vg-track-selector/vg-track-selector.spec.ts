import {VgTrackSelector} from "./vg-track-selector";
import {VgAPI} from "../../core/services/vg-api";
import {ElementRef} from "@angular/core";

describe('Track Selector control', () => {
    let vgTrackSelector:VgTrackSelector;

    function createSubtitleTrack(label:string, srclang:string, isDefault:boolean) {
        const track:HTMLTrackElement = {} as HTMLTrackElement;
        (track as any).tagName = 'TRACK';
        track.kind = 'subtitles';
        track.label = label;
        track.srclang = srclang;
        track.default = isDefault;
        return track;
    }

    beforeEach(() => {
        const ref:ElementRef = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                }
            }
        };
        vgTrackSelector = new VgTrackSelector(ref, new VgAPI());
    });

    describe('onPlayerReady', () => {
        beforeEach(() => {
            vgTrackSelector.API.getMasterMedia = () => {
                return {elem: {
                    children: [
                        createSubtitleTrack('English', 'en', false),
                        createSubtitleTrack('Español', 'es', true),
                        {} as HTMLTrackElement,
                        {} as HTMLTrackElement,
                        {} as HTMLTrackElement
                    ]
                }} as any;
            };
        });
        it('Should show subtitles tracks only', ()=> {
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.length).toBe(3);// 2 subs + 'Off'
        });
        it('Should set the selected option', ()=> {
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.filter(item=>item.selected===true)[0].label).toBe('Español');
        });
        it('Should have an Off option', ()=> {
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.filter(item=>item.label==='Off').length).toBe(1);
        });
        it('Should set Off option as selected when there is no default track', ()=> {
            vgTrackSelector.API.getMasterMedia = () => {
                return {elem: {
                    children: [
                        createSubtitleTrack('English', 'en', false),
                        createSubtitleTrack('Español', 'es', false)
                    ]
                }} as any;
            };
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.filter(item=>item.selected===true)[0].label).toBe('Off');
        });
    });
    
    describe('selectTrack', () => {
        beforeEach(() => {
            spyOn(vgTrackSelector.API, 'getMasterMedia').and.returnValue({
                elem: {
                    textTracks: [
                        {mode: 'showing', language: 'en'},
                        {mode: 'hidden', language: 'es'}
                    ]
                }
            });
        });
        it('Should select by track id', ()=> {
            vgTrackSelector.selectTrack('es');
            expect(
                (vgTrackSelector.API.getMasterMedia().elem as any)
                    .textTracks
                    .filter(
                        (item)=>item.mode==='showing'
                    )[0].language
            ).toBe('es');
        });
        it('Should select Off when track id is null', ()=> {
            vgTrackSelector.selectTrack(null);
            expect(
                (vgTrackSelector.API.getMasterMedia().elem as any)
                    .textTracks
                    .filter(
                        (item)=>item.mode==='showing'
                    ).length
            ).toBe(0);
        });
    });
});
