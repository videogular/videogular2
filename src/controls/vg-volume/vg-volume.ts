import { Component, Input, ElementRef, HostListener } from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';
import {VgAbstractControl} from '../vg-abstract-control';

@Component({
    selector: 'vg-volume',
    template:`
        <div class="volumeBar"
            (mousedown)="onMouseDown($event)">
            <div class="volumeBackground" [ngClass]="{dragging: isDragging}">
                <div class="volumeValue" [style.width]="(getVolume() * (100-15)) + '%'"></div>
                <div class="volumeKnob" [style.left]="(getVolume() * (100-15)) + 'px'"></div>
            </div>
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
            height: 50px;
            width: 100px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }
        :host .volumeBar {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
        }
        :host .volumeBackground {
            display: flex;
            flex-grow: 1;
            height: 5px;
            pointer-events: none;
            background-color: #333;
        }
        :host .volumeValue {
            display: flex;
            height: 5px;
            pointer-events: none;
            background-color: #FFF;
            transition:all 0.2s ease-out;
        }
        :host .volumeKnob {
            position: absolute;
            width: 15px; height: 15px;
            left: 0; top: 50%;
            transform: translateY(-50%);
            border-radius: 15px;
            pointer-events: none;
            background-color: #FFF;
            transition:all 0.2s ease-out;
        }
        :host .volumeBackground.dragging .volumeValue,
        :host .volumeBackground.dragging .volumeKnob {
            transition: none;
        }
    `]
})
export class VgVolume extends VgAbstractControl {
    elem:HTMLElement;
    vgFor: string;
    target: any;
    isDragging:boolean;
    mouseDownPosX:number;

    constructor(ref:ElementRef, public API:VgAPI) {
        super(API);
        this.elem = ref.nativeElement;
        this.isDragging = false;
    }

    onPlayerReady() {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    }

    onMouseDown(event:{x:number}) {
        this.mouseDownPosX = event.x;
        this.isDragging = true;
    }

    @HostListener('document:mousemove', ['$event'])
    onDrag(event:{x:number}) {
        if(this.isDragging) {
            this.setVolume(this.calculateVolume(event.x));
        }
    }

    @HostListener('document:mouseup', ['$event'])
    onStopDrag(event:{x:number}) {
        if(this.isDragging) {
            this.isDragging = false;
            if(this.mouseDownPosX === event.x) {
                this.setVolume(this.calculateVolume(event.x));
            }
        }
    }
    
    calculateVolume(mousePosX:number) {
        const volumeBarOffsetLeft:number = (<HTMLElement>document.querySelector('.volumeBar')).offsetLeft;
        return mousePosX - volumeBarOffsetLeft;
    }

    setVolume(vol:number) {
        this.target.volume =  Math.max(0, Math.min(1, vol / 100));
    }

    getVolume():number {
        return this.target ? this.target.volume : 0;
    }
}
