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
var VgMute = (function () {
    function VgMute(API) {
        this.API = API;
    }
    VgMute.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
        this.currentVolume = this.target.volume;
    };
    VgMute.prototype.onClick = function () {
        var volume = this.getVolume();
        if (volume === 0) {
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    };
    VgMute.prototype.getVolume = function () {
        var volume;
        var result;
        if (this.target.volume instanceof Object) {
            volume = 0;
            for (var media in this.target.volume) {
                volume += this.target.volume[media];
            }
            result = (volume / Object.keys(this.target.volume).length);
        }
        else {
            result = this.target.volume;
        }
        return result;
    };
    VgMute = __decorate([
        angular2_1.Component({
            selector: 'vg-mute',
            inputs: [
                'targetId: for'
            ],
            host: {
                '(click)': 'onClick()'
            }
        }),
        angular2_1.View({
            template: "<div class=\"icon\"\n             [class.level3]=\"getVolume() >= 0.75\"\n             [class.level2]=\"getVolume() >= 0.5 && getVolume() < 0.75\"\n             [class.level1]=\"getVolume() >= 0.25 && getVolume() < 0.5\"\n             [class.level0]=\"getVolume() > 0 && getVolume() < 0.25\"\n             [class.mute]=\"getVolume() === 0\">\n        </div>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-mute/vg-mute.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgMute);
    return VgMute;
})();
exports.VgMute = VgMute;
//# sourceMappingURL=vg-mute.js.map