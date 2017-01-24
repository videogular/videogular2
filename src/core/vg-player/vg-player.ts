import {
    Output,
    Component,
    EventEmitter,
    ElementRef,
    HostBinding,
    QueryList,
    AfterContentInit,
    ContentChildren, ViewEncapsulation
} from '@angular/core';
import { VgAPI } from '../services/vg-api';
import { VgFullscreenAPI } from '../services/vg-fullscreen-api';
import { VgUtils } from '../services/vg-utils';
import { VgMedia } from '../vg-media/vg-media';

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
    ` ],
    providers: [ VgAPI, VgFullscreenAPI ]
})
export class VgPlayer implements AfterContentInit {
    elem: HTMLElement;
    api: VgAPI;

    @HostBinding('class.fullscreen') isFullscreen: boolean = false;
    @HostBinding('style.z-index') zIndex: string;

    @Output()
    onPlayerReady: EventEmitter<any> = new EventEmitter();

    @Output()
    onMediaReady: EventEmitter<any> = new EventEmitter();

    @ContentChildren(VgMedia)
    medias: QueryList<VgMedia>;

    constructor(ref: ElementRef, api: VgAPI) {
        this.api = api;
        this.elem = ref.nativeElement;

        this.api.registerElement(this.elem);
    }

    ngAfterContentInit() {
        this.medias.toArray().forEach((media) => {
            this.api.registerMedia(media);
        });

        this.api.onPlayerReady();
        this.onPlayerReady.next(this.api);

        VgFullscreenAPI.init(this.elem, this.medias);
        VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    }

    onChangeFullscreen(fsState: boolean) {
        if (!VgFullscreenAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? VgUtils.getZIndex().toString() : 'auto';
        }
    }
}
