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
var VgPlayer = (function () {
    function VgPlayer(ref, API) {
        this.onPlayerReady = new angular2_1.EventEmitter();
        this.onMediaReady = new angular2_1.EventEmitter();
        this.API = API;
        this.elem = ref.nativeElement;
        this.API.registerElement(this.elem);
        var slice = Array.prototype.slice;
        var videos = slice.call(this.elem.querySelectorAll("video"));
        var audios = slice.call(this.elem.querySelectorAll("audio"));
        var medias = videos.concat(audios);
        for (var i = 0, l = medias.length; i < l; i++) {
            this.API.registerMedia(medias[i]);
        }
    }
    VgPlayer.prototype.onInit = function () {
        this.onPlayerReady.next(this.API);
    };
    VgPlayer.prototype.onVgMediaReady = function (event) {
        this.onMediaReady.next(this.API);
    };
    VgPlayer = __decorate([
        angular2_1.Component({
            selector: 'vg-player',
            bindings: [api_1.VgAPI],
            outputs: ['onPlayerReady', 'onMediaReady']
        }),
        angular2_1.View({
            template: "<ng-content></ng-content>",
            styleUrls: ['../node_modules/videogular2/vg-player/vg-player.css'],
            encapsulation: angular2_1.ViewEncapsulation.Emulated
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, api_1.VgAPI])
    ], VgPlayer);
    return VgPlayer;
})();
exports.VgPlayer = VgPlayer;
//# sourceMappingURL=vg-player.js.map