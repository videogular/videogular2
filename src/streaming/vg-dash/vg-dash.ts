import { Directive, ElementRef, Input, SimpleChanges, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs/Subscription';
import { IDRMLicenseServer } from '../streaming';

declare let dashjs;

@Directive({
    selector: '[vgDash]'
})
export class VgDASH implements OnInit, OnChanges, OnDestroy {
    @Input() vgDash:string;
    @Input() vgDRMToken:string;
    @Input() vgDRMLicenseServer:IDRMLicenseServer;

    vgFor: string;
    target: any;
    dash:any;

    subscriptions: Subscription[] = [];

    constructor(private ref:ElementRef, public API:VgAPI) {}

    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
        }
    }

    onPlayerReady() {
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
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
        if (this.dash) {
            this.destroyPlayer();
        }

        // It's a DASH source
        if (this.vgDash && (
            (this.vgDash.indexOf('.mpd') > -1) ||
            (this.vgDash.indexOf('mpd-time-csf') > -1))
        ) {
            let drmOptions;

            if (this.vgDRMLicenseServer) {
                drmOptions = this.vgDRMLicenseServer;

                if (this.vgDRMToken) {
                    for (let drmServer in drmOptions) {
                        drmOptions[drmServer].httpRequestHeaders = { Authorization: this.vgDRMToken };
                    }
                }
            }

            this.dash = dashjs.MediaPlayer().create();
            this.dash.getDebug().setLogToBrowserConsole(false);
            this.dash.initialize(this.ref.nativeElement);
            this.dash.setAutoPlay(false);

            if (drmOptions) {
                this.dash.setProtectionData(drmOptions);
            }

            this.dash.attachSource(this.vgDash);
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
        if (this.dash) {
            this.dash.reset();
            this.dash = null;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.destroyPlayer();
    }
}
