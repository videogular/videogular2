import {Component, Input, OnInit, ElementRef, Renderer} from 'angular2/core';
import {Observable} from "rxjs/Observable";
import {VgAPI} from "../services/vg-api";

@Component({
    selector: 'vg-controls',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            position: absolute;
            display: flex;
            width: 100%;
            height: 50px;
            z-index: 300;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            -webkit-transition: bottom 1s;
            -khtml-transition: bottom 1s;
            -moz-transition: bottom 1s;
            -ms-transition: bottom 1s;
            transition: bottom 1s;
        }

        :host.hide {
          bottom: -50px;
        }
    `]
})
export class VgControls {

    @Input('autohide') autohide:boolean = false;
    @Input('autohide-time') autohideTime:number = 3;

    private timer:number;

    constructor(private api:VgAPI, private element:ElementRef, private renderer:Renderer) {

    }

    ngOnInit() {
        var mouseEnter = Observable.fromEvent(this.api.videogularElement, 'mouseenter');
        mouseEnter.subscribe(this.show.bind(this));

        var mouseLeave = Observable.fromEvent(this.api.videogularElement, 'mouseleave');
        mouseLeave.subscribe(this.hide.bind(this));
    }

    ngAfterViewInit() {
        if (this.autohide) {
            this.hide();
        }
        else {
            this.show();
        }
    }

    hide() {
        if (this.autohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    }

    show() {
        clearTimeout(this.timer);
        this.renderer.setElementClass(this.element.nativeElement, 'hide', false);
    }

    private hideAsync() {
        this.timer = setTimeout(() => {
            this.renderer.setElementClass(this.element.nativeElement, 'hide', true);
        }, this.autohideTime * 1000);
    }
}
