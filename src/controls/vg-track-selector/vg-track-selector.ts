import { Component, ElementRef } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgAbstractControl } from '../vg-abstract-control';

export interface Option {
    id: string;
    label: string;
    selected: boolean;
}

@Component({
    selector: 'vg-track-selector',
    template: `
        <div class="container">
            <div class="track-selected"
                [class.vg-icon-closed_caption]="!trackSelected">
                {{ trackSelected || '' }}
            </div>
            
            <select class="trackSelector" (change)="selectTrack($event.target.value)">
                <option 
                    *ngFor="let track of tracks" 
                    [value]="track.id"
                    [selected]="track.selected === true">
                    {{ track.label }}
                </option>
            </select>
        </div>
    `,
    styles: [ `
        :host {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            width: 50px;
            height: 50px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }
        .container {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
            
            padding: 0;
            margin: 5px;
        }
        select.trackSelector {
            width: 50px;
            padding: 5px 8px;
            border: none;
            background: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: transparent;
            font-size: 16px;
        }
        select.trackSelector:focus {
            outline: none;
        }
        .track-selected {
            position: absolute;
            width: 100%;
            text-align: center;
            text-transform: uppercase;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            padding-top: 2px;
            pointer-events: none;
        }
        .vg-icon-closed_caption:before {
            width: 100%;
        }
    ` ]
})
export class VgTrackSelector extends VgAbstractControl {
    elem: HTMLElement;
    vgFor: string;
    target: any;
    tracks: Array<Option>;
    trackSelected: string;

    constructor(ref: ElementRef, public API: VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        const subs: Array<Option> = Array.from((this.API.getMasterMedia().elem as HTMLMediaElement).children)
            .filter((item: HTMLElement) => item.tagName === 'TRACK')
            .filter((item: HTMLTrackElement) => item.kind === 'subtitles')
            .map((item: HTMLTrackElement) => ({
                label: item.label,
                selected: item.default === true,
                id: item.srclang
            }));
        this.tracks = [
            ...subs,
            {
                id: null,
                label: 'Off',
                selected: subs.every((item: Option) => item.selected === false)
            }
        ];

        this.trackSelected = this.tracks.filter((item: Option) => item.selected === true)[ 0 ].id;
    }

    selectTrack(trackId: string) {
        this.trackSelected = (trackId === 'null') ? null : trackId;

        Array.from((this.API.getMasterMedia().elem as HTMLMediaElement).textTracks)
            .forEach((item: TextTrack) => {
                if (item.language === trackId) {
                    item.mode = 'showing';
                } else {
                    item.mode = 'hidden';
                }
            });
    }
}
