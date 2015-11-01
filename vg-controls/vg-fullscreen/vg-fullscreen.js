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
var VgFullscreen = (function () {
    function VgFullscreen(API) {
        this.API = API;
    }
    VgFullscreen.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgFullscreen.prototype.onClick = function () {
        var element = this.target;
        if (this.target instanceof api_1.VgAPI) {
            element = null;
        }
        this.API.toggleFullscreen(element);
    };
    VgFullscreen = __decorate([
        angular2_1.Component({
            selector: 'vg-fullscreen',
            inputs: [
                'targetId: for'
            ],
            host: {
                '(click)': 'onClick()'
            }
        }),
        angular2_1.View({
            template: "<div class=\"icon\"\n             [class.normal]=\"!API.isFullscreen()\"\n             [class.fullscreen]=\"API.isFullscreen()\">\n        </div>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-fullscreen/vg-fullscreen.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgFullscreen);
    return VgFullscreen;
})();
exports.VgFullscreen = VgFullscreen;
//# sourceMappingURL=vg-fullscreen.js.map