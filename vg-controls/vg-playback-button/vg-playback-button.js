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
var VgPlaybackButton = (function () {
    function VgPlaybackButton(API) {
        this.API = API;
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
    }
    VgPlaybackButton.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgPlaybackButton.prototype.onClick = function () {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;
        if (this.target instanceof api_1.VgAPI) {
            this.target.playbackRate = (this.playbackValues[this.playbackIndex]);
        }
        else {
            this.target.playbackRate[this.targetId] = (this.playbackValues[this.playbackIndex]);
        }
    };
    VgPlaybackButton = __decorate([
        angular2_1.Component({
            selector: 'vg-playback-button',
            inputs: [
                'targetId: for'
            ],
            host: {
                '(click)': 'onClick()'
            }
        }),
        angular2_1.View({
            template: "{{target.playbackRate}}x",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-playback-button/vg-playback-button.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgPlaybackButton);
    return VgPlaybackButton;
})();
exports.VgPlaybackButton = VgPlaybackButton;
//# sourceMappingURL=vg-playback-button.js.map