import {ElementRef, Input, Component, OnInit, NgZone} from '@angular/core';
import {IPlayable} from "../vg-media/i-playable";
import {SlideModel} from "./slide-model";
import {VgEvents} from "../events/vg-events";

@Component({
    selector: '[vg-media]',
    template: `
        <img [src]="currentSlide.src">
    `,
    styles: [`
        :host {
            margin: auto;
        }
        
        img {
            width: 100%;
        }
    `
    ]
})
export class VgImage implements OnInit, IPlayable {
    @Input('slides') slides:Array<SlideModel>;

    elem:IPlayable;

    state:string = 'pause';

    time:any = {current: 0, total: 0, left: 0};
    buffer:any = {end: 0};
    subscriptions:any = {};

    canPlay:boolean = false;
    canPlayThrough:boolean = false;
    isMetadataLoaded:boolean = false;
    isWaiting:boolean = false;
    isCompleted:boolean = false;

    id:string;
    duration:number = 0;
    currentTime:number = 0;
    volume:number = 0;
    playbackRate:number = 0;
    buffered:TimeRanges = <TimeRanges>{
        end: (index:number) => {return 0;},
        start: (index:number) => {return 0;},
        length: 0
    };

    currentSlide:SlideModel;
    progress:any;

    lastTime:number = 0;

    constructor(ref:ElementRef) {
        this.elem = ref.nativeElement;

        this.expose();
    }
    
    ngOnInit() {
        this.currentSlide = this.slides[0];

        for (let i=0, l=this.slides.length; i<l; i++) {
            this.duration += this.slides[i].end - this.slides[i].start;
        }

        this.expose();

        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));
    }

    expose() {
        for (var prop in this) {
            if (typeof this[prop] === 'function') {
                this.elem[prop] = this[prop].bind(this);
            }
            else {
                this.elem[prop] = this[prop];
            }
        }
    }

    play() {
        this.progress = requestAnimationFrame(currentTime => this.onProgress(currentTime));

        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
    }

    pause() {
        cancelAnimationFrame(this.progress.data.handleId);
        this.lastTime = 0;
        this.progress = undefined;

        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
    }

    changeToSlide(slide:SlideModel) {
        this.currentSlide = slide;
    }

    onProgress(currentTime) {
        if (!this.lastTime) this.lastTime = currentTime;
        this.currentTime += (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.elem.currentTime = this.currentTime;

        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));

        this.progress = requestAnimationFrame(currentTime => this.onProgress(currentTime));

        for (let i:number=0, l:number=this.slides.length; i<l; i++) {
            let slide = this.slides[i];

            if (this.currentTime >= slide.start && this.currentTime <= slide.end && this.currentSlide != slide) {
                this.changeToSlide(slide);
                break;
            }
        }

        if (this.currentTime >= this.duration) this.onComplete();
    }

    onComplete() {
        cancelAnimationFrame(this.progress.data.handleId);
        this.lastTime = 0;
        this.time.left = 0;
        this.progress = undefined;

        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
    }
}
