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
var VgScrubBarCurrentTime = (function () {
    function VgScrubBarCurrentTime(API) {
        this.API = API;
    }
    VgScrubBarCurrentTime.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgScrubBarCurrentTime.prototype.getPercentage = function () {
        return ((this.target.time.current * 100 / this.target.time.total)) + '%';
    };
    VgScrubBarCurrentTime = __decorate([
        angular2_1.Component({
            selector: 'vg-scrub-bar-current-time',
            inputs: [
                'targetId: for'
            ]
        }),
        angular2_1.View({
            template: "<div class=\"background\" [style.width]=\"getPercentage()\"></div>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgScrubBarCurrentTime);
    return VgScrubBarCurrentTime;
})();
exports.VgScrubBarCurrentTime = VgScrubBarCurrentTime;
//# sourceMappingURL=vg-scrub-bar-current-time.js.map