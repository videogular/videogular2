import { Component, Input, ElementRef, OnInit, PipeTransform, Pipe, ViewEncapsulation, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';

// Workaround until we can use UTC with Angular Date Pipe
@Pipe({ name: 'vgUtc' })
export class VgUtcPipe implements PipeTransform {
    transform(value: number, format: string): string {
        let date = new Date(value);
        let result = format;
        let ss: string|number = date.getUTCSeconds();
        let mm: string|number = date.getUTCMinutes();
        let hh: string|number = date.getUTCHours();

        if (ss < 10) {
            ss = '0' + ss;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }

        result = result.replace(/ss/g, <string>ss);
        result = result.replace(/mm/g, <string>mm);
        result = result.replace(/hh/g, <string>hh);

        return result;
    }
}

@Component({
    selector: 'vg-time-display',
    encapsulation: ViewEncapsulation.None,
    template: `
        <span *ngIf="target?.isLive">LIVE</span>
        <span *ngIf="!target?.isLive">{{ getTime() | vgUtc:vgFormat }}</span>
        <ng-content></ng-content>
    `,
    styles: [ `
        vg-time-display {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            height: 50px;
            width: 60px;
            cursor: pointer;
            color: white;
            line-height: 50px;
            pointer-events: none;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
    ` ]
})
export class VgTimeDisplay implements OnInit, OnDestroy {
    @Input() vgFor: string;
    @Input() vgProperty: string = 'current';
    @Input() vgFormat: string = 'mm:ss';

    elem: HTMLElement;
    target: any;

    subscriptions: Subscription[] = [];

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
    }

    getTime() {
        let t = 0;

        if (this.target) {
            t = Math.round(this.target.time[ this.vgProperty ]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }

        return t;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
