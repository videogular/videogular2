import { Directive, ElementRef, Input, SimpleChanges, OnChanges, OnDestroy } from "@angular/core";
import { VgAPI } from '../../core/services/vg-api';

declare let dashjs;

@Directive({
    selector: '[vgDash]'
})
export class VgDASH implements OnChanges, OnDestroy {
    @Input() vgDash:string;

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
        if (changes['vgDash'].currentValue) {
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
        if (this.vgDash && this.vgDash.indexOf('.mpd') > -1) {
            this.player = dashjs.MediaPlayer().create();
            this.player.getDebug().setLogToBrowserConsole(false);
            this.player.initialize(this.ref.nativeElement, this.vgDash, false);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgDash;
            }
        }
    }

    destroyPlayer() {
        if (this.player) {
            this.player.reset();
            this.player = null;
        }
    }

    ngOnDestroy() {
        this.destroyPlayer();
    }
}
