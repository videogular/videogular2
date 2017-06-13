import {
    Component, OnInit, Input, ElementRef, HostListener, ViewEncapsulation, OnDestroy,
    HostBinding
} from '@angular/core';
import { VgAPI } from '../core/services/vg-api';
import { VgStates } from '../core/states/vg-states';
import { Subscription } from 'rxjs/Subscription';
import { VgFullscreenAPI } from '../core/services/vg-fullscreen-api';
import { VgControlsHidden } from '../core/services/vg-controls-hidden';

@Component({
    selector: 'vg-overlay-play',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="vg-overlay-play"
                    [class.native-fullscreen]="isNativeFullscreen"
                    [class.controls-hidden]="areControlsHidden">
                   <div class="overlay-play-container"
                        [class.vg-icon-play_arrow]="getState() !== 'playing'">
                   </div>
               </div>`,
    styles: [ `
        vg-overlay-play {
            z-index: 200;
        }

        vg-overlay-play.is-buffering {
            display: none;
        }

        vg-overlay-play .vg-overlay-play {
            transition: all 0.5s;
            cursor: pointer;
            position: absolute;
            display: block;
            color: white;
            width: 100%;
            height: 100%;
            font-size: 80px;
            filter: alpha(opacity=60);
            opacity: 0.6;
        }

        vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden {
            cursor: none;
        }

        vg-overlay-play .vg-overlay-play .overlay-play-container.vg-icon-play_arrow {
            pointer-events: none;
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
        }

        vg-overlay-play .vg-overlay-play:hover {
            filter: alpha(opacity=100);
            opacity: 1;
        }

        vg-overlay-play .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before {
            transform: scale(1.2);
        }
    ` ]
})
export class VgOverlayPlay implements OnInit, OnDestroy {
    @Input() vgFor: string;
    elem: HTMLElement;
    target: any;

    isNativeFullscreen: boolean = false;
    areControlsHidden: boolean = false;

    subscriptions: Subscription[] = [];

    @HostBinding('class.is-buffering') isBuffering: boolean = false;

    constructor(ref: ElementRef, public API: VgAPI, public fsAPI: VgFullscreenAPI, private controlsHidden: VgControlsHidden) {
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
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.subscriptions.push(
            this.target.subscriptions.bufferDetected.subscribe(
                isBuffering => this.onUpdateBuffer(isBuffering)
            )
        );
    }

    onUpdateBuffer(isBuffering) {
        this.isBuffering = isBuffering;
    }

    onChangeFullscreen(fsState: boolean) {
        if (this.fsAPI.nativeFullscreen) {
            this.isNativeFullscreen = fsState;
        }
    }

    onHideControls(hidden: boolean) {
        this.areControlsHidden = hidden;
    }

    @HostListener('click')
    onClick() {
        let state = this.getState();

        switch (state) {
            case VgStates.VG_PLAYING:
                this.target.pause();
                break;

            case VgStates.VG_PAUSED:
            case VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    }

    getState() {
        let state = VgStates.VG_PAUSED;

        if (this.target) {
            if (this.target.state instanceof Array) {
                for (let i = 0, l = this.target.state.length; i < l; i++) {
                    if (this.target.state[ i ] === VgStates.VG_PLAYING) {
                        state = VgStates.VG_PLAYING;
                        break;
                    }
                }
            }
            else {
                state = this.target.state;
            }
        }

        return state;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
