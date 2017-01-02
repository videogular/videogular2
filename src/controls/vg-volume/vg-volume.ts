import { Component, Input, ElementRef, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';

@Component({
    selector: 'vg-volume',
    encapsulation: ViewEncapsulation.None,
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
        vg-volume {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
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
        vg-volume .volumeBar {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
        }
        vg-volume .volumeBackground {
            display: flex;
            flex-grow: 1;
            height: 5px;
            pointer-events: none;
            background-color: #333;
        }
        vg-volume .volumeValue {
            display: flex;
            height: 5px;
            pointer-events: none;
            background-color: #FFF;
            transition:all 0.2s ease-out;
        }
        vg-volume .volumeKnob {
            position: absolute;
            width: 15px; height: 15px;
            left: 0; top: 50%;
            transform: translateY(-50%);
            border-radius: 15px;
            pointer-events: none;
            background-color: #FFF;
            transition:all 0.2s ease-out;
        }
        vg-volume .volumeBackground.dragging .volumeValue,
        vg-volume .volumeBackground.dragging .volumeKnob {
            transition: none;
        }
    `]
})
export class VgVolume implements OnInit {
    @Input() vgFor: string;

    elem:HTMLElement;
    target: any;
    isDragging:boolean;
    mouseDownPosX:number;

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
        this.isDragging = false;
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
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
