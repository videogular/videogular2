import {
    Output,
    Component,
    EventEmitter,
    ElementRef,
    HostBinding,
    QueryList,
    AfterContentInit,
    ContentChildren, ViewEncapsulation, OnDestroy
} from '@angular/core';
import { VgAPI } from '../services/vg-api';
import { VgFullscreenAPI } from '../services/vg-fullscreen-api';
import { VgUtils } from '../services/vg-utils';
import { VgMedia } from '../vg-media/vg-media';
import { Subscription } from 'rxjs/Subscription';
import { VgControlsHidden } from '../services/vg-controls-hidden';

@Component({
    selector: 'vg-player',
    encapsulation: ViewEncapsulation.None,
    template: `<ng-content></ng-content>`,
    styles: [ `
        vg-player {
            font-family: 'videogular';
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: black;
        }

        vg-player.fullscreen {
            position: fixed;
            left: 0;
            top: 0;
        }

        vg-player.native-fullscreen.controls-hidden {
            cursor: none;
        }
    ` ],
    providers: [ VgAPI, VgFullscreenAPI, VgControlsHidden ]
})
export class VgPlayer implements AfterContentInit, OnDestroy {
    elem: HTMLElement;

    @HostBinding('class.fullscreen') isFullscreen: boolean = false;
    @HostBinding('class.native-fullscreen') isNativeFullscreen: boolean = false;
    @HostBinding('class.controls-hidden') areControlsHidden: boolean = false;
    @HostBinding('style.z-index') zIndex: string;

    @Output()
    onPlayerReady: EventEmitter<any> = new EventEmitter();

    @Output()
    onMediaReady: EventEmitter<any> = new EventEmitter();

    @ContentChildren(VgMedia)
    medias: QueryList<VgMedia>;

    subscriptions: Subscription[] = [];

    constructor(ref: ElementRef, public api: VgAPI, public fsAPI: VgFullscreenAPI, private controlsHidden: VgControlsHidden) {
        this.elem = ref.nativeElement;

        this.api.registerElement(this.elem);
    }

    ngAfterContentInit() {
        this.medias.toArray().forEach((media) => {
            this.api.registerMedia(media);
        });

        this.fsAPI.init(this.elem, this.medias);

        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));

        this.api.onPlayerReady(this.fsAPI);
        this.onPlayerReady.next(this.api);
    }

    onChangeFullscreen(fsState: boolean) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? VgUtils.getZIndex().toString() : 'auto';
        } else {
            this.isNativeFullscreen = fsState;
        }
    }

    onHideControls(hidden: boolean) {
        this.areControlsHidden = hidden;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
