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
import { VgAPI } from "../../core/services/vg-api";
import { IHLSConfig } from './hls-config';
import { Subscription } from 'rxjs';
import { BitrateOption } from '../../core/core';

declare let Hls;

@Directive({
    selector: '[vgHls]',
    exportAs: 'vgHls'
})
export class VgHLS implements OnInit, OnChanges, OnDestroy {
    @Input() vgHls:string;
    @Input() vgHlsHeaders: {[key: string]: string} = {};

    @Output() onGetBitrates: EventEmitter<BitrateOption[]> = new EventEmitter();

    vgFor: string;
    target: any;
    hls: any;
    preload: boolean;
    crossorigin: string;
    config: IHLSConfig;

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
        this.crossorigin = this.ref.nativeElement.getAttribute('crossorigin');
        this.preload = this.ref.nativeElement.getAttribute('preload') !== 'none';
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');

        if(this.vgFor){
            this.target = this.API.getMediaById(this.vgFor);
        }
        else{
            this.target = this.API.getDefaultMedia();
        }


        this.config = <IHLSConfig>{
            autoStartLoad: this.preload
        };
        // @ts-ignore
        this.config.xhrSetup = (xhr, url) => {
            // Send cookies
            if (this.crossorigin === 'use-credentials') {
                xhr.withCredentials = true;
            }
            for (const key of Object.keys(this.vgHlsHeaders)) {
                xhr.setRequestHeader(key, this.vgHlsHeaders[key]);
            }
        };

        this.createPlayer();

        if (!this.preload) {
            this.subscriptions.push(
                this.API.subscriptions.play.subscribe(
                    () => {
                        if (this.hls) {
                            this.hls.startLoad(0);
                        }
                    }
                )
            );
        }
    }

    ngOnChanges(changes:SimpleChanges) {
        if (changes['vgHls'] && changes['vgHls'].currentValue) {
            this.createPlayer();
        }
        else if (changes['vgHlsHeaders'] && changes['vgHlsHeaders'].currentValue) {
            // Do nothing. We don't want to create a or destroy a player if the headers change.
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
        if (this.vgHls && this.vgHls.indexOf('m3u8') > -1 && Hls.isSupported() && this.API.isPlayerReady) {
            let video:HTMLVideoElement = this.ref.nativeElement;

            this.hls = new Hls(this.config);
            // @ts-ignore
            this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                    const videoList = [];

                    videoList.push({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        label: 'AUTO'
                    });

                    data.levels.forEach((item, index) => {
                        videoList.push({
                            qualityIndex: ++index,
                            width: item.width,
                            height: item.height,
                            bitrate: item.bitrate,
                            mediaType: 'video',
                            label: item.name
                        });
                    });

                    this.onGetBitrates.emit(videoList);
                }
            );
            // @ts-ignore
            this.hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
                    this.target.isLive = data.details.live;
                }
            );

            this.hls.loadSource(this.vgHls);
            this.hls.attachMedia(video);
        }
        else {
            if (this.target && !!this.target.pause) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgHls;
            }
        }
    }

    setBitrate(bitrate: BitrateOption) {
        if (this.hls) {
            this.hls.nextLevel = bitrate.qualityIndex - 1;
        }
    }

    destroyPlayer() {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.destroyPlayer();
        delete this.hls;
    }
}
