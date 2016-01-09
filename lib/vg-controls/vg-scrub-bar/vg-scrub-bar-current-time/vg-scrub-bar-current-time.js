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
var vg_api_1 = require('../../../services/vg-api');
var VgScrubBarCurrentTime = (function () {
    function VgScrubBarCurrentTime(API) {
        this.API = API;
    }
    VgScrubBarCurrentTime.prototype.ngOnInit = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBarCurrentTime.prototype.getPercentage = function () {
        return ((this.target.time.current * 100 / this.target.time.total)) + '%';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VgScrubBarCurrentTime.prototype, "vgFor", void 0);
    VgScrubBarCurrentTime = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar-current-time',
            template: "<div class=\"background\" [style.width]=\"getPercentage()\"></div>",
            styles: ["\n        :host {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        :host .background {\n            background-color: white;\n        }\n\n        vg-controls :host {\n            position: absolute;\n            top: calc(50% - 3px);\n            background-color: rgba(0, 0, 0, 0.6);\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n\n        vg-controls :host .background {\n            border: 1px solid white;\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [vg_api_1.VgAPI])
    ], VgScrubBarCurrentTime);
    return VgScrubBarCurrentTime;
})();
exports.VgScrubBarCurrentTime = VgScrubBarCurrentTime;
//# sourceMappingURL=vg-scrub-bar-current-time.js.map