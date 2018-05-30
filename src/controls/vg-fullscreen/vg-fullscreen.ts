import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgFullscreenAPI } from '../../core/services/vg-fullscreen-api';
import { Subscription } from 'rxjs';


@Component({
    selector: 'vg-fullscreen',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="icon"
             [class.vg-icon-fullscreen]="!isFullscreen"
             [class.vg-icon-fullscreen_exit]="isFullscreen"
             tabindex="0"
             role="button"
             aria-label="fullscreen button"
             [attr.aria-valuetext]="ariaValue">
        </div>`,
    styles: [ `
        vg-fullscreen {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            height: 50px;
            width: 50px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }

        vg-fullscreen .icon {
            pointer-events: none;
        }
    ` ]
})
export class VgFullscreen implements OnInit, OnDestroy {
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    isFullscreen: boolean = false;

    subscriptions: Subscription[] = [];

    ariaValue = 'normal mode';

    constructor(ref: ElementRef, public API: VgAPI, public fsAPI: VgFullscreenAPI) {
        this.elem = ref.nativeElement;
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
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

    onChangeFullscreen(fsState: boolean) {
        this.ariaValue = fsState ? 'fullscren mode' : 'normal mode';
        this.isFullscreen = fsState;
    }

    @HostListener('click')
    onClick() {
        this.changeFullscreenState();
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.changeFullscreenState();
        }
    }

    changeFullscreenState() {
        let element = this.target;

        if (this.target instanceof VgAPI) {
            element = null;
        }

        this.fsAPI.toggleFullscreen(element);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
