import {
    Directive,
    ElementRef,
    Input,
    SimpleChanges,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter
} from "@angular/core";
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
import { IDRMLicenseServer } from '../streaming';
import { BitrateOption } from '../../core/core';

declare let dashjs;

@Directive({
    selector: '[vgDash]',
    exportAs: 'vgDash'
})
export class VgDASH implements OnInit, OnChanges, OnDestroy {
    @Input() vgDash:string;
    @Input() vgDRMToken:string;
    @Input() vgDRMLicenseServer:IDRMLicenseServer;

    @Output() onGetBitrates: EventEmitter<BitrateOption[]> = new EventEmitter();

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
        if (changes['vgDash'] && changes['vgDash'].currentValue) {
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

            this.dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
                const audioList = this.dash.getBitrateInfoListFor('audio');
                const videoList = this.dash.getBitrateInfoListFor('video');

                if (audioList.length > 1) {
                    audioList.forEach(item => item.qualityIndex = ++item.qualityIndex);
                    audioList.unshift({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        label: 'AUTO'
                    });

                    this.onGetBitrates.emit(audioList);
                }

                if (videoList.length > 1) {
                    videoList.forEach(item => item.qualityIndex = ++item.qualityIndex);
                    videoList.unshift({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        label: 'AUTO'
                    });

                    this.onGetBitrates.emit(videoList);
                }
            });

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

    setBitrate(bitrate: BitrateOption) {
        if (this.dash) {
            if (bitrate.qualityIndex > 0) {
                if (this.dash.getAutoSwitchQualityFor(bitrate.mediaType)) {
                    this.dash.setAutoSwitchQualityFor(bitrate.mediaType, false);
                }

                const nextIndex = bitrate.qualityIndex - 1;
                this.dash.setQualityFor(bitrate.mediaType, nextIndex);
            } else {
                this.dash.setAutoSwitchQualityFor(bitrate.mediaType, true);
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
