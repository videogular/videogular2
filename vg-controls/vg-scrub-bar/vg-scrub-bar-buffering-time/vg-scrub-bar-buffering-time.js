var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var api_1 = require('../../../api');
var VgScrubBarBufferingTime = (function () {
    function VgScrubBarBufferingTime(API) {
        this.API = API;
    }
    VgScrubBarBufferingTime.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgScrubBarBufferingTime.prototype.getBufferTime = function () {
        var bufferTime = "0%";
        if (this.target.buffered.length) {
            bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
        }
        return bufferTime;
    };
    VgScrubBarBufferingTime = __decorate([
        angular2_1.Component({
            selector: 'vg-scrub-bar-buffering-time',
            inputs: [
                'targetId: for'
            ]
        }),
        angular2_1.View({
            template: "<div class=\"background\" [style.width]=\"getBufferTime()\"></div>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgScrubBarBufferingTime);
    return VgScrubBarBufferingTime;
})();
exports.VgScrubBarBufferingTime = VgScrubBarBufferingTime;
//# sourceMappingURL=vg-scrub-bar-buffering-time.js.map