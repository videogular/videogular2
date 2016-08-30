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
var vg_fullscreen_api_1 = require("../../services/vg-fullscreen-api");
var vg_abstract_control_1 = require('../vg-abstract-control');
var VgFullscreen = (function (_super) {
    __extends(VgFullscreen, _super);
    function VgFullscreen(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.elem = ref.nativeElement;
        this.fsAPI = vg_fullscreen_api_1.VgFullscreenAPI;
    }
    VgFullscreen.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgFullscreen.prototype.onClick = function () {
        var element = this.target;
        if (this.target instanceof vg_api_1.VgAPI) {
            element = null;
        }
        vg_fullscreen_api_1.VgFullscreenAPI.toggleFullscreen(element);
    };
    VgFullscreen = __decorate([
        core_1.Component({
            selector: 'vg-fullscreen',
            host: {
                '(click)': 'onClick()'
            },
            template: "<div class=\"icon\"\n             [class.normal]=\"!fsAPI.isFullscreen\"\n             [class.fullscreen]=\"fsAPI.isFullscreen\">\n        </div>",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        :host .icon {\n            pointer-events: none;\n        }\n\n        :host .icon.normal:before {\n            content: \"\\e007\";\n        }\n\n        :host .icon.fullscreen:before {\n            content: \"\\e008\";\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgFullscreen);
    return VgFullscreen;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgFullscreen = VgFullscreen;
//# sourceMappingURL=vg-fullscreen.js.map