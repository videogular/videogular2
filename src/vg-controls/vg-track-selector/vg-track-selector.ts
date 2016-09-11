import {Component, Input, ElementRef} from '@angular/core';

import {Observable} from 'rxjs/Rx';
import {VgEvents} from '../../events/vg-events';
import {VgAPI} from '../../services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';

export interface Option {
    id:string;
    label:string;
    selected:boolean
}

@Component({
    selector: 'vg-track-selector',
    template:`
        <div class="container">
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
    styles: [`
        :host {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            width: 120px; height: 50px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }
        :host .container {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
            
            padding: 0; margin: 5px;
            margin-top: 14px; margin-bottom: 14px;
            border: 1px solid #ccc;
            border-radius: 3px;
            overflow: hidden;
            background-color: #fff;
            background: #fff;
        }
        :host .container:after {
            top: 50%; left: 85%;
            border: solid transparent;
            content: " ";
            height: 0; width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(0, 0, 0, 0);
            border-top-color: #000000;
            border-width: 5px;
            margin-top: -2px;
            z-index: 100;
        }
        :host select.trackSelector {
            display: flex;
            flex-grow: 1;

            width: 130%;
            padding: 5px 8px;
            border: none;
            box-shadow: none;
            background-color: transparent;
            background-image: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        :host select.trackSelector:focus {
            outline: none;
        }
    `]
})
export class VgTrackSelector extends VgAbstractControl {
    elem:HTMLElement;
    vgFor: string;
    target: any;
    tracks:Array<Option>;

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        const subs:Array<Option> = Array.from((this.API.getMasterMedia().elem as HTMLMediaElement).children)
                                        .filter((item:HTMLElement) => item.tagName === 'TRACK')
                                        .filter((item:HTMLTrackElement) => item.kind === 'subtitles')
                                        .map((item:HTMLTrackElement) => ({label:item.label, selected:item.default===true, id:item.srclang}));
        this.tracks = [
            ...subs, 
            { 
                id: null, 
                label: 'Off', 
                selected: subs.every((item:Option) => item.selected===false)
            }
        ];
    }

    selectTrack(trackId:string) {
        Array.from((this.API.getMasterMedia().elem as HTMLMediaElement).textTracks)
            .forEach((item:TextTrack) => {
                console.log(item, trackId);
                if(item.language === trackId) {
                    item.mode = 'showing';
                } else {
                    item.mode = 'hidden';
                }
            });
    }
}
