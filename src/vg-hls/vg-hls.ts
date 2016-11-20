import { Directive, ElementRef, Input, SimpleChanges } from "@angular/core";
import { VgAPI } from "../services/vg-api";

declare var Hls;

@Directive({
    selector: '[vg-hls]'
})
export class VgHLS {
    @Input('vg-hls') hlsUrl:string;

    vgFor: string;
    target: any;
    hls:any;

    constructor(private ref:ElementRef, public API:VgAPI) {
        this.API.playerReadyEvent.subscribe((api:VgAPI) => this.onPlayerReady());
    }

    onPlayerReady() {
        this.vgFor = this.ref.nativeElement.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();
    }

    ngOnChanges(changes:SimpleChanges) {
        if (changes['hlsUrl'].currentValue) {
            this.createPlayer();
        }
        else {
            this.destroyPlayer();
        }
    }

    createPlayer() {
        if (this.hls) {
            this.destroyPlayer();
        }

        // It's a HLS source
        if (this.hlsUrl && this.hlsUrl.indexOf('.m3u8') > -1 && Hls.isSupported()) {
            var video:HTMLVideoElement = this.ref.nativeElement;

            this.hls = new Hls();
            this.hls.loadSource(this.hlsUrl);
            this.hls.attachMedia(video);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.hlsUrl;
            }
        }
    }

    destroyPlayer() {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
    }
}
