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
var VgScrubBar = (function () {
    function VgScrubBar(ref, API) {
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgScrubBar.prototype.ngOnInit = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBar.prototype.onMouseDownScrubBar = function ($event) {
        var percentage = $event.offsetX * 100 / this.elem.scrollWidth;
        this.target.seekTime(percentage, true);
    };
    VgScrubBar = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar',
            host: {
                '(mousedown)': 'onMouseDownScrubBar($event)'
            },
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            position: absolute;\n            width: 100%;\n            height: 5px;\n            bottom: 50px;\n            margin: 0;\n            cursor: pointer;\n            align-items: center;\n            background: rgba(0, 0, 0, 0.75);\n            z-index: 250;\n        }\n\n        vg-controls :host {\n            position: relative;\n            bottom: initial;\n            background: initial;\n            height: 50px;\n            flex-grow: 1;\n            flex-basis: 0;\n            margin: 0 10px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgScrubBar);
    return VgScrubBar;
})();
exports.VgScrubBar = VgScrubBar;
//# sourceMappingURL=vg-scrub-bar.js.map