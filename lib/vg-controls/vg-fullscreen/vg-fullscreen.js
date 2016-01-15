var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var vg_api_1 = require('../../services/vg-api');
var VgFullscreen = (function () {
    function VgFullscreen(ref, API) {
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgFullscreen.prototype.ngOnInit = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgFullscreen.prototype.onClick = function () {
        var element = this.target;
        if (this.target instanceof vg_api_1.VgAPI) {
            element = null;
        }
        this.API.toggleFullscreen(element);
    };
    VgFullscreen = __decorate([
        core_1.Component({
            selector: 'vg-fullscreen',
            host: {
                '(click)': 'onClick()'
            },
            template: "<div class=\"icon\"\n             [class.normal]=\"!API.isFullscreen()\"\n             [class.fullscreen]=\"API.isFullscreen()\">\n        </div>",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        :host .icon {\n            pointer-events: none;\n        }\n\n        :host .icon.normal:before {\n            content: \"\\e007\";\n        }\n\n        :host .icon.fullscreen:before {\n            content: \"\\e008\";\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgFullscreen);
    return VgFullscreen;
})();
exports.VgFullscreen = VgFullscreen;
//# sourceMappingURL=vg-fullscreen.js.map