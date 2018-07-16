import { Component, ElementRef, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';

export interface Option {
    id: string;
    label: string;
    selected: boolean;
}

@Component({
    selector: 'vg-track-selector',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="container">
            <div class="track-selected"
                 [class.vg-icon-closed_caption]="!trackSelected">
                {{ trackSelected || '' }}
            </div>
            
            <select class="trackSelector" 
                    (change)="selectTrack($event.target.value)"
                    tabindex="0"
                    aria-label="track selector"
                    [attr.aria-valuetext]="ariaValue">
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
        vg-track-selector {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
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
        vg-track-selector .container {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
            
            padding: 0;
            margin: 5px;
        }
        vg-track-selector select.trackSelector {
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
        vg-track-selector select.trackSelector::-ms-expand {
            display: none;
        }
        vg-track-selector select.trackSelector option {
            color: #000;
        }
        vg-track-selector .track-selected {
            position: absolute;
            width: 100%;
            height: 50px;
            top: -6px;
            text-align: center;
            text-transform: uppercase;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            padding-top: 2px;
            pointer-events: none;
        }
        vg-track-selector .vg-icon-closed_caption:before {
            width: 100%;
        }
    ` ]
})
export class VgTrackSelector implements OnInit, OnDestroy {
    @Input() vgFor: string;

    elem: HTMLElement;
    target: any;
    tracks: Array<Option>;
    trackSelected: string;

    subscriptions: Subscription[] = [];

    ariaValue: string;

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }

    onPlayerReady() {
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

        const track: Option = this.tracks.filter((item: Option) => item.selected === true)[ 0 ];
        this.trackSelected = track.id;
        this.ariaValue = track.label;
    }

    selectTrack(trackId: string) {
        this.trackSelected = (trackId === 'null') ? null : trackId;

        this.ariaValue = 'No track selected';

        Array.from((this.API.getMasterMedia().elem as HTMLMediaElement).textTracks)
            .forEach((item: TextTrack) => {
                if (item.language === trackId) {
                    this.ariaValue = item.label;
                    item.mode = 'showing';
                } else {
                    item.mode = 'hidden';
                }
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
