import {
    Component, Input, ElementRef, HostListener, OnInit, ViewEncapsulation, ViewChild,
    OnDestroy
} from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'vg-volume',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div 
            #volumeBar
            class="volumeBar"
            (click)="onClick($event)"
            (mousedown)="onMouseDown($event)">
            <div class="volumeBackground" [ngClass]="{dragging: isDragging}">
                <div class="volumeValue" [style.width]="(getVolume() * (100-15)) + '%'"></div>
                <div class="volumeKnob" [style.left]="(getVolume() * (100-15)) + '%'"></div>
            </div>
        </div>
    `,
    styles: [ `
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
    ` ]
})
export class VgVolume implements OnInit, OnDestroy {
    @Input() vgFor: string;
    @ViewChild('volumeBar') volumeBarRef: ElementRef;

    elem: HTMLElement;
    target: any;
    isDragging: boolean;
    mouseDownPosX: number;

    subscriptions: Subscription[] = [];

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
        this.isDragging = false;
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
    }

    onClick(event: { clientX: number }) {
        this.setVolume(this.calculateVolume(event.clientX));
    }

    onMouseDown(event: { clientX: number }) {
        this.mouseDownPosX = event.clientX;
        this.isDragging = true;
    }

    @HostListener('document:mousemove', [ '$event' ])
    onDrag(event: { clientX: number }) {
        if (this.isDragging) {
            this.setVolume(this.calculateVolume(event.clientX));
        }
    }

    @HostListener('document:mouseup', [ '$event' ])
    onStopDrag(event: { clientX: number }) {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.mouseDownPosX === event.clientX) {
                this.setVolume(this.calculateVolume(event.clientX));
            }
        }
    }

    calculateVolume(mousePosX: number) {
        const recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
        const volumeBarOffsetLeft: number = recObj.left;
        const volumeBarWidth: number = recObj.width;
        return (mousePosX - volumeBarOffsetLeft) / volumeBarWidth * 100;
    }

    setVolume(vol: number) {
        const volumeBarWidth: number = this.volumeBarRef.nativeElement.getBoundingClientRect().width;
        this.target.volume = Math.max(0, Math.min(1, vol / volumeBarWidth));
    }

    getVolume(): number {
        return this.target ? this.target.volume : 0;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
