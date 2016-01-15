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
var VgScrubBarBufferingTime = (function () {
    function VgScrubBarBufferingTime(ref, API) {
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgScrubBarBufferingTime.prototype.ngOnInit = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBarBufferingTime.prototype.getBufferTime = function () {
        var bufferTime = "0%";
        if (this.target.buffer && this.target.buffered.length) {
            bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
        }
        return bufferTime;
    };
    VgScrubBarBufferingTime = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar-buffering-time',
            template: "<div class=\"background\" [style.width]=\"getBufferTime()\"></div>",
            styles: ["\n        :host {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        :host .background {\n            background-color: rgba(255, 255, 255, 0.3);\n        }\n\n        vg-controls :host {\n            position: absolute;\n            top: calc(50% - 3px);\n        }\n\n        vg-controls :host .background {\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgScrubBarBufferingTime);
    return VgScrubBarBufferingTime;
})();
exports.VgScrubBarBufferingTime = VgScrubBarBufferingTime;
//# sourceMappingURL=vg-scrub-bar-buffering-time.js.map