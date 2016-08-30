"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require("rxjs/Observable");
var vg_api_1 = require("../services/vg-api");
var VgControls = (function () {
    function VgControls(api, element, renderer) {
        this.api = api;
        this.element = element;
        this.renderer = renderer;
        this.autohide = false;
        this.autohideTime = 3;
    }
    VgControls.prototype.ngOnInit = function () {
        var mouseEnter = Observable_1.Observable.fromEvent(this.api.videogularElement, 'mouseenter');
        mouseEnter.subscribe(this.show.bind(this));
        var mouseLeave = Observable_1.Observable.fromEvent(this.api.videogularElement, 'mouseleave');
        mouseLeave.subscribe(this.hide.bind(this));
    };
    VgControls.prototype.ngAfterViewInit = function () {
        if (this.autohide) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    VgControls.prototype.hide = function () {
        if (this.autohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    };
    VgControls.prototype.show = function () {
        clearTimeout(this.timer);
        this.renderer.setElementClass(this.element.nativeElement, 'hide', false);
    };
    VgControls.prototype.hideAsync = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.renderer.setElementClass(_this.element.nativeElement, 'hide', true);
        }, this.autohideTime * 1000);
    };
    __decorate([
        core_1.Input('autohide'), 
        __metadata('design:type', Boolean)
    ], VgControls.prototype, "autohide", void 0);
    __decorate([
        core_1.Input('autohide-time'), 
        __metadata('design:type', Number)
    ], VgControls.prototype, "autohideTime", void 0);
    VgControls = __decorate([
        core_1.Component({
            selector: 'vg-controls',
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            position: absolute;\n            display: flex;\n            width: 100%;\n            height: 50px;\n            z-index: 300;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, 0.5);\n            -webkit-transition: bottom 1s;\n            -khtml-transition: bottom 1s;\n            -moz-transition: bottom 1s;\n            -ms-transition: bottom 1s;\n            transition: bottom 1s;\n        }\n\n        :host.hide {\n          bottom: -50px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [vg_api_1.VgAPI, core_1.ElementRef, core_1.Renderer])
    ], VgControls);
    return VgControls;
}());
exports.VgControls = VgControls;
//# sourceMappingURL=vg-controls.js.map