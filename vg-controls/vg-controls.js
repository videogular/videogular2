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
var api_1 = require('../api');
var VgControls = (function () {
    function VgControls(API) {
        this.API = API;
    }
    VgControls = __decorate([
        angular2_1.Component({
            selector: 'vg-controls'
        }),
        angular2_1.View({
            template: "<ng-content></ng-content>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-controls.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgControls);
    return VgControls;
})();
exports.VgControls = VgControls;
//# sourceMappingURL=vg-controls.js.map