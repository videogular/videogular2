import { Component, OnChanges, Input, ElementRef, SimpleChange, OnInit } from "@angular/core";
import {VgAPI} from "../../../core/services/vg-api";

@Component({
    selector: 'vg-scrub-bar-cue-points',
    template: `
        <div class="cue-point-container">
            <span *ngFor="let cp of vgCuePoints" [style.width]="cp.$$style?.width" [style.left]="cp.$$style?.left" class="cue-point"></span>
        </div>
        `,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        :host .cue-point-container .cue-point {
            position: absolute;
            height: 5px;
            background-color: rgba(255, 204, 0, 0.7);
        }

        vg-controls :host {
            position: absolute;
            top: calc(50% - 3px);
        }
    `]
})
export class VgScrubBarCuePoints implements OnInit, OnChanges {
    @Input() vgCuePoints:TextTrackCueList;
    @Input() vgFor: string;

    elem:HTMLElement;
    target: any;
    onLoadedMetadataCalled: boolean = false;


    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);

        let onTimeUpdate = this.target.subscriptions.loadedMetadata;
        onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this));
        
        if(this.onLoadedMetadataCalled) {
            this.onLoadedMetadata();
        }
    }

    onLoadedMetadata() {
        if (this.vgCuePoints) {
            for (let i = 0, l = this.vgCuePoints.length; i < l; i++) {
                let end = (this.vgCuePoints[i].endTime >= 0) ? this.vgCuePoints[i].endTime : this.vgCuePoints[i].startTime + 1;
                let cuePointDuration = (end - this.vgCuePoints[i].startTime) * 1000;
                let position = '0';
                let percentWidth = '0';

                if (typeof cuePointDuration === 'number' && this.target.time.total) {
                    percentWidth = ((cuePointDuration * 100) / this.target.time.total) + "%";
                    position = (this.vgCuePoints[i].startTime * 100 / (Math.round(this.target.time.total / 1000))) + "%";
                }

                (<any>this.vgCuePoints[i]).$$style = {
                    width: percentWidth,
                    left: position
                };
            }
        }
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['vgCuePoints'].currentValue) {
            if(!this.target) {
                this.onLoadedMetadataCalled = true;
                return;
            }
            this.onLoadedMetadata();
        }
    }
}
