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
var VgOverlayPlay = (function () {
    function VgOverlayPlay(API) {
        this.API = API;
    }
    VgOverlayPlay.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgOverlayPlay.prototype.onClick = function () {
        var state = this.getState();
        switch (state) {
            case 'play':
                this.target.pause();
                break;
            case 'pause':
                this.target.play();
                break;
        }
    };
    VgOverlayPlay.prototype.getState = function () {
        var state;
        if (this.target.state instanceof Array) {
            state = 'pause';
            for (var i = 0, l = this.target.state.length; i < l; i++) {
                if (this.target.state[i] === 'play') {
                    state = 'play';
                    break;
                }
            }
        }
        else {
            state = this.target.state;
        }
        return state;
    };
    VgOverlayPlay = __decorate([
        angular2_1.Component({
            selector: 'vg-overlay-play',
            inputs: [
                'targetId: for'
            ],
            host: {
                '(click)': 'onClick()',
                'class': 'vg-overlay-play'
            }
        }),
        angular2_1.View({
            template: "<div class=\"vg-overlay-play\">\n            <div class=\"overlay-play-container\"\n                 [class.play]=\"getState() === 'pause'\">\n            </div>\n        </div>",
            styleUrls: ['../node_modules/videogular2/vg-overlay-play/vg-overlay-play.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgOverlayPlay);
    return VgOverlayPlay;
})();
exports.VgOverlayPlay = VgOverlayPlay;
//# sourceMappingURL=vg-overlay-play.js.map