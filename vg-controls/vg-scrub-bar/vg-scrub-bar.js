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
var api_1 = require('../../api');
var VgScrubBar = (function () {
    function VgScrubBar(ref, API) {
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgScrubBar.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgScrubBar.prototype.onMouseDownScrubBar = function ($event) {
        var percentage = $event.offsetX * 100 / this.elem.scrollWidth;
        this.target.seekTime(percentage, true);
    };
    VgScrubBar = __decorate([
        angular2_1.Component({
            selector: 'vg-scrub-bar',
            inputs: [
                'targetId: for'
            ],
            host: {
                '(mousedown)': 'onMouseDownScrubBar($event)'
            }
        }),
        angular2_1.View({
            template: "<ng-content></ng-content>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-scrub-bar/vg-scrub-bar.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, api_1.VgAPI])
    ], VgScrubBar);
    return VgScrubBar;
})();
exports.VgScrubBar = VgScrubBar;
//# sourceMappingURL=vg-scrub-bar.js.map