import { Directive, ElementRef, Input, SimpleChanges } from "@angular/core";
import { VgAPI } from "../services/vg-api";

declare var dashjs;

@Directive({
    selector: '[vg-dash]'
})
export class VgDASH {
    @Input('vg-dash') dashUrl:string;

    vgFor: string;
    target: any;
    player:any;

    constructor(private ref:ElementRef, public API:VgAPI) {
        this.API.playerReadyEvent.subscribe((api:VgAPI) => this.onPlayerReady());
    }

    onPlayerReady() {
        this.vgFor = this.ref.nativeElement.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();
    }

    ngOnChanges(changes:SimpleChanges) {
        if (changes['dashUrl'].currentValue) {
            this.createPlayer();
        }
        else {
            this.destroyPlayer();
        }
    }

    createPlayer() {
        if (this.player) {
            this.destroyPlayer();
        }

        // It's a DASH source
        if (this.dashUrl && this.dashUrl.indexOf('.mpd') > -1) {
            this.player = dashjs.MediaPlayer().create();
            this.player.getDebug().setLogToBrowserConsole(false);
            this.player.initialize(this.ref.nativeElement, this.dashUrl, false);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.dashUrl;
            }
        }
    }

    destroyPlayer() {
        if (this.player) {
            this.player.reset();
            this.player = null;
        }
    }
}
