import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import { VgAPI } from '../../../core/services/vg-api';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'vg-scrub-bar-cue-points',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="cue-point-container">
            <span *ngFor="let cp of cuePoints" [style.width]="cp.$$style?.width" [style.left]="cp.$$style?.left"
                  class="cue-point"></span>
        </div>
    `,
    styles: [ `
        vg-scrub-bar-cue-points {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        vg-scrub-bar-cue-points .cue-point-container .cue-point {
            position: absolute;
            height: 5px;
            background-color: rgba(255, 204, 0, 0.7);
        }

        vg-controls vg-scrub-bar-cue-points {
            position: absolute;
            top: calc(50% - 3px);
        }
    ` ]
})
export class VgScrubBarCuePoints implements OnInit, OnChanges, OnDestroy {
    @Input() vgCuePoints: TextTrackCueList;
    @Input() vgFor: string;

    elem: HTMLElement;
    target: any;
    onLoadedMetadataCalled: boolean = false;
    cuePoints: Array<any> = [];

    subscriptions: Subscription[] = [];

    totalCues = 0;

    constructor(ref: ElementRef, public API: VgAPI) {
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

        let onTimeUpdate = this.target.subscriptions.loadedMetadata;
        this.subscriptions.push(onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this)));

        if (this.onLoadedMetadataCalled) {
            this.onLoadedMetadata();
        }
    }

    onLoadedMetadata() {
        if (this.vgCuePoints) {
            // We need to transform the TextTrackCueList to Array or it doesn't work on IE11/Edge.
            // See: https://github.com/videogular/videogular2/issues/369
            this.cuePoints = [];

            for (let i = 0, l = this.vgCuePoints.length; i < l; i++) {
                let end = (this.vgCuePoints[ i ].endTime >= 0) ? this.vgCuePoints[ i ].endTime : this.vgCuePoints[ i ].startTime + 1;
                let cuePointDuration = (end - this.vgCuePoints[ i ].startTime) * 1000;
                let position = '0';
                let percentWidth = '0';

                if (typeof cuePointDuration === 'number' && this.target.time.total) {
                    percentWidth = ((cuePointDuration * 100) / this.target.time.total) + "%";
                    position = (this.vgCuePoints[ i ].startTime * 100 / (Math.round(this.target.time.total / 1000))) + "%";
                }

                (<any>this.vgCuePoints[ i ]).$$style = {
                    width: percentWidth,
                    left: position
                };

                this.cuePoints.push(this.vgCuePoints[ i ]);
            }
        }
    }

    updateCuePoints() {
        if (!this.target) {
            this.onLoadedMetadataCalled = true;
            return;
        }
        this.onLoadedMetadata();
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes[ 'vgCuePoints' ].currentValue) {
            this.updateCuePoints();
        }
    }

    ngDoCheck() {
        if (this.vgCuePoints) {
            const changes = this.totalCues !== this.vgCuePoints.length;

            if (changes) {
                this.totalCues = this.vgCuePoints.length;
                this.updateCuePoints();
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
