import { Component, ElementRef, Input, HostListener, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgControlsHidden } from './../../core/services/vg-controls-hidden';
import {VgStates} from "../../core/states/vg-states";

@Component({
    selector: 'vg-scrub-bar',
    encapsulation: ViewEncapsulation.None,
    template: `<ng-content></ng-content>`,
    styles: [ `
        vg-scrub-bar {
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 50px;
            margin: 0;
            cursor: pointer;
            align-items: center;
            background: rgba(0, 0, 0, 0.75);
            z-index: 250;
            -webkit-transition: bottom 1s, opacity 0.5s;
            -khtml-transition: bottom 1s, opacity 0.5s;
            -moz-transition: bottom 1s, opacity 0.5s;
            -ms-transition: bottom 1s, opacity 0.5s;
            transition: bottom 1s, opacity 0.5s;
        }

        vg-controls vg-scrub-bar {
            position: relative;
            bottom: initial;
            background: initial;
            height: 50px;
            flex-grow: 1;
            flex-basis: 0;
            margin: 0 10px;
            -webkit-transition: initial;
            -khtml-transition: initial;
            -moz-transition: initial;
            -ms-transition: initial;
            transition: initial;
        }

        vg-scrub-bar.hide {
            bottom: 0px;
            opacity: 0;
        }

        vg-controls vg-scrub-bar.hide {
            bottom: initial;
            opacity: initial;
        }
    ` ]
})
export class VgScrubBar implements OnInit {
    @HostBinding('class.hide') hideScrubBar: boolean = false;
    
    @Input() vgFor: string;
    @Input() vgSlider: boolean = true;

    elem: HTMLElement;
    target: any;
    isSeeking: boolean = false;
    wasPlaying: boolean = false;

    constructor(ref: ElementRef, public API: VgAPI, vgControlsHiddenState: VgControlsHidden) {
        this.elem = ref.nativeElement;
        vgControlsHiddenState.isHidden.subscribe(hide => this.onHideScrubBar(hide));
    }

    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
        }
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    protected seekStart(){
        if(this.API.canPlay) {
            this.isSeeking = true;
            if (this.target.state == VgStates.VG_PLAYING) {
                this.wasPlaying = true;
            }
            this.target.pause();
        }
    }

    protected seekMove(offset: number){
        if(this.isSeeking) {
            let percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.time.current = percentage * this.target.time.total / 100;
            this.target.seekTime(percentage, true);
        }
    }

    protected seekEnd(offset: number){
        this.isSeeking = false;
        if(this.API.canPlay) {
            let percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.seekTime(percentage, true);
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        }
    }

    protected touchEnd(){
        this.isSeeking = false;
        if(this.wasPlaying){
            this.wasPlaying = false;
            this.target.play();
        }
    }

    protected getTouchOffset(event:any){
        let offsetLeft:number = 0;
        let element:any = event.target;
        while (element) {
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return event.touches[0].pageX - offsetLeft;
    }

    @HostListener('mousedown', [ '$event' ])
    onMouseDownScrubBar($event: any) {
        if (!this.target.isLive) {
            if(!this.vgSlider) {
                this.seekEnd($event.offsetX);
            }
            else{
                this.seekStart();
            }
        }
    }

    @HostListener('mousemove', [ '$event' ])
    onMouseMoveScrubBar($event: any) {
        if (!this.target.isLive && this.vgSlider && this.isSeeking) {
            this.seekMove($event.offsetX);
        }
    }

    @HostListener('mouseout', [ '$event' ])
    onMouseOutScrubBar($event: any) {
        if (!this.target.isLive && this.vgSlider && this.isSeeking) {
            this.seekEnd($event.offsetX);
        }
    }

    @HostListener('mouseup', [ '$event' ])
    onMouseUpScrubBar($event: any) {
        if (!this.target.isLive && this.vgSlider) {
            this.seekEnd($event.offsetX);
        }
    }

    @HostListener('touchstart', [ '$event' ])
    onTouchStartScrubBar($event:any){
        if (!this.target.isLive) {
            if(!this.vgSlider) {
                this.seekEnd(this.getTouchOffset($event));
            }
            else{
                this.seekStart();
            }
        }
    }

    @HostListener('touchmove', [ '$event' ])
    onTouchMoveScrubBar($event:any){
        if (!this.target.isLive && this.vgSlider && this.isSeeking) {
            this.seekMove(this.getTouchOffset($event));
        }
    }

    @HostListener('touchcancel', [ '$event' ])
    onTouchCancelScrubBar($event:any){
        if (!this.target.isLive && this.vgSlider) {
            this.touchEnd();
        }
    }

    @HostListener('touchend', [ '$event' ])
    onTouchEndScrubBar($event:any){
        if (!this.target.isLive && this.vgSlider) {
            this.touchEnd();
        }
    }

    @HostListener('touchleave', [ '$event' ])
    onTouchLeaveScrubBar($event:any){
        if (!this.target.isLive && this.vgSlider) {
            this.touchEnd();
        }
    }

    onHideScrubBar(hide: boolean) {
        this.hideScrubBar = hide;
    } 
}
