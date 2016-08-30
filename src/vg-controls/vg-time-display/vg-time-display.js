"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var vg_api_1 = require('../../services/vg-api');
var vg_abstract_control_1 = require('../vg-abstract-control');
var VgTimeDisplay = (function (_super) {
    __extends(VgTimeDisplay, _super);
    function VgTimeDisplay(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.property = 'current';
        this.format = 'mm:ss';
        this.elem = ref.nativeElement;
    }
    VgTimeDisplay.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgTimeDisplay.prototype.getTime = function () {
        return this.target ? Math.round(this.target.time[this.property]) : 0;
    };
    __decorate([
        core_1.Input('property'), 
        __metadata('design:type', String)
    ], VgTimeDisplay.prototype, "property", void 0);
    __decorate([
        core_1.Input('format'), 
        __metadata('design:type', String)
    ], VgTimeDisplay.prototype, "format", void 0);
    VgTimeDisplay = __decorate([
        core_1.Component({
            selector: 'vg-time-display',
            template: "\n        <span>{{ getTime() | date:format }}</span>\n        <ng-content></ng-content>\n    ",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 60px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n            pointer-events: none;\n            font-family: Helvetica Neue, Helvetica, Arial;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgTimeDisplay);
    return VgTimeDisplay;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgTimeDisplay = VgTimeDisplay;
//# sourceMappingURL=vg-time-display.js.map