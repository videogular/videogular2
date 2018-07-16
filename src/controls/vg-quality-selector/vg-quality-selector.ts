import {
    Component,
    ElementRef,
    OnInit,
    Input,
    ViewEncapsulation,
    OnDestroy,
    SimpleChanges,
    OnChanges, Output, EventEmitter
} from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
import { BitrateOption } from '../../core/core';

@Component({
    selector: 'vg-quality-selector',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="container">
            <div class="quality-selected"
                 [class.vg-icon-hd]="!bitrateSelected">
                {{ bitrateSelected?.label }}
            </div>
            
            <select class="quality-selector" 
                    (change)="selectBitrate($event.target.value)"
                    tabindex="0"
                    aria-label="quality selector"
                    [attr.aria-valuetext]="ariaValue">
                <option 
                    *ngFor="let bitrate of bitrates"
                    [value]="bitrate.qualityIndex"
                    [selected]="bitrate.qualityIndex === bitrateSelected?.qualityIndex">
                    {{ bitrate.label }}
                </option>
            </select>
        </div>
    `,
    styles: [ `
        vg-quality-selector {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            width: 50px;
            height: 50px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }
        vg-quality-selector .container {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
            
            padding: 0;
            margin: 5px;
        }
        vg-quality-selector select.quality-selector {
            width: 50px;
            padding: 5px 8px;
            border: none;
            background: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: transparent;
            font-size: 16px;
        }
        vg-quality-selector select.quality-selector::-ms-expand {
            display: none;
        }
        vg-quality-selector select.quality-selector option {
            color: #000;
        }
        vg-quality-selector .quality-selected {
            position: absolute;
            width: 100%;
            height: 50px;
            top: -6px;
            text-align: center;
            text-transform: uppercase;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            padding-top: 2px;
            pointer-events: none;
        }
        vg-quality-selector .vg-icon-closed_caption:before {
            width: 100%;
        }
    ` ]
})
export class VgQualitySelector implements OnInit, OnChanges, OnDestroy {
    @Input() bitrates: BitrateOption[];

    @Output() onBitrateChange: EventEmitter<BitrateOption> = new EventEmitter();

    bitrateSelected: BitrateOption;

    elem: HTMLElement;
    target: any;

    subscriptions: Subscription[] = [];

    ariaValue: string;

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['bitrates'].currentValue && changes['bitrates'].currentValue.length) {
            this.bitrates.forEach(item => item.label = item.label || Math.round(item.bitrate / 1000).toString())
        }
    }

    selectBitrate(index: number) {
        this.bitrateSelected = this.bitrates[index];
        this.onBitrateChange.emit(this.bitrates[index]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
