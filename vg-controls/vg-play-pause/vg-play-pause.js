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
var VgPlayPause = (function () {
    function VgPlayPause(API) {
        this.API = API;
    }
    VgPlayPause.prototype.onInit = function () {
        this.target = this.API.getMediaById(this.targetId);
    };
    VgPlayPause.prototype.onClick = function () {
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
    VgPlayPause.prototype.getState = function () {
        var state;
        if (this.target.state instanceof Object) {
            state = 'pause';
            for (var media in this.target.state) {
                if (this.target.state[media] === 'play') {
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
    VgPlayPause = __decorate([
        angular2_1.Component({
            selector: 'vg-play-pause',
            inputs: [
                'targetId: for'
            ],
            host: {
                '(click)': 'onClick()'
            }
        }),
        angular2_1.View({
            template: "<div class=\"icon\"\n             [class.pause]=\"getState() === 'play'\"\n             [class.play]=\"getState() === 'pause'\">\n        </div>",
            styleUrls: ['../node_modules/videogular2/vg-controls/vg-play-pause/vg-play-pause.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [api_1.VgAPI])
    ], VgPlayPause);
    return VgPlayPause;
})();
exports.VgPlayPause = VgPlayPause;
//# sourceMappingURL=vg-play-pause.js.map