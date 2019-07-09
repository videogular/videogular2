import {
    Component, ElementRef, Input, HostListener, OnInit, ViewEncapsulation, HostBinding,
    OnDestroy
} from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgControlsHidden } from './../../core/services/vg-controls-hidden';
import { VgStates } from '../../core/states/vg-states';
import { Subscription } from 'rxjs';

@Component({
    selector: 'vg-scrub-bar',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="scrubBar"
             tabindex="0"
             role="slider"
             aria-label="scrub bar"
             aria-level="polite"
             [attr.aria-valuenow]="getPercentage()"
             aria-valuemin="0"
             aria-valuemax="100"
             [attr.aria-valuetext]="getPercentage() + '%'">
            <ng-content></ng-content>
        </div>

    `,
    styles: [ `
        vg-scrub-bar {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
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

        vg-scrub-bar .scrubBar {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
            height: 100%;
        }

        vg-controls vg-scrub-bar {
            position: relative;
            bottom: 0;
            background: transparent;
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
            bottom: 0;
            opacity: 0;
        }

        vg-controls vg-scrub-bar.hide {
            bottom: initial;
            opacity: initial;
        }
    ` ]
})
export class VgScrubBar implements OnInit, OnDestroy {
    @HostBinding('class.hide') hideScrubBar = false;

    @Input() vgFor: string;
    @Input() vgSlider = true;

    elem: HTMLElement;
    target: any;
    isSeeking = false;
    wasPlaying = false;

    subscriptions: Subscription[] = [];

    constructor(ref: ElementRef, public API: VgAPI, vgControlsHiddenState: VgControlsHidden) {
        this.elem = ref.nativeElement;
        this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe(hide => this.onHideScrubBar(hide)));
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

    protected seekStart() {
        if (this.target.canPlay) {
            this.isSeeking = true;
            if (this.target.state === VgStates.VG_PLAYING) {
                this.wasPlaying = true;
            }
            this.target.pause();
        }
    }

    protected seekMove(offset: number) {
        if (this.isSeeking) {
            let percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.time.current = percentage * this.target.time.total / 100;
            this.target.seekTime(percentage, true);
        }
    }

    protected seekEnd(offset: number) {
        this.isSeeking = false;
        if (this.target.canPlay) {
            let percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.seekTime(percentage, true);
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        }
    }

    protected touchEnd() {
        this.isSeeking = false;
        if (this.wasPlaying) {
            this.wasPlaying = false;
            this.target.play();
        }
    }

    protected getTouchOffset(event: any) {
        let offsetLeft = 0;
        let element: any = event.target;
        while (element) {
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return event.touches[ 0 ].pageX - offsetLeft;
    }

    @HostListener('mousedown', [ '$event' ])
    onMouseDownScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd($event.offsetX);
                }
                else {
                    this.seekStart();
                }
            }
        }
    }

    @HostListener('document:mousemove', [ '$event' ])
    onMouseMoveScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove($event.offsetX);
            }
        }
    }

    @HostListener('document:mouseup', [ '$event' ])
    onMouseUpScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekEnd($event.offsetX);
            }
        }
    }

    @HostListener('touchstart', [ '$event' ])
    onTouchStartScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd(this.getTouchOffset($event));
                }
                else {
                    this.seekStart();
                }
            }
        }
    }

    @HostListener('document:touchmove', [ '$event' ])
    onTouchMoveScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove(this.getTouchOffset($event));
            }
        }
    }
    // @ts-ignore
    @HostListener('document:touchcancel', [ '$event' ]) onTouchCancelScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    }
    // @ts-ignore
    @HostListener('document:touchend', [ '$event' ]) onTouchEndScrubBar($event: any) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    }

    @HostListener('keydown', ['$event'])
    arrowAdjustVolume(event: KeyboardEvent) {
        if (this.target) {
            if (event.keyCode === 38 || event.keyCode === 39) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current + 5000) / 1000, false);
            }
            else if (event.keyCode === 37 || event.keyCode === 40) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current - 5000) / 1000, false);
            }
        }
    }

    getPercentage() {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    }

    onHideScrubBar(hide: boolean) {
        this.hideScrubBar = hide;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
