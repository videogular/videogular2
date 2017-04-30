import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgFullscreenAPI } from '../../core/services/vg-fullscreen-api';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'vg-fullscreen',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="icon"
             [class.vg-icon-fullscreen]="!isFullscreen"
             [class.vg-icon-fullscreen_exit]="isFullscreen">
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
        this.isFullscreen = fsState;
    }

    @HostListener('click')
    onClick() {
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
