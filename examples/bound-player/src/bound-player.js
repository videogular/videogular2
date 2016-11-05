"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var core_2 = require('videogular2/core');
var BoundPlayer = (function () {
    function BoundPlayer() {
        this.controls = false;
        this.autoplay = false;
        this.loop = false;
        this.preload = 'auto';
        this.fsAPI = core_2.VgFullscreenAPI;
        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ];
    }
    BoundPlayer.prototype.onPlayerReady = function (api) {
        var _this = this;
        this.api = api;
        this.api.getDefaultMedia().subscriptions.ended.subscribe(function () {
            _this.api.getDefaultMedia().currentTime = 0;
        });
    };
    BoundPlayer.prototype.onClickUpdateSource = function () {
        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg",
                type: "video/ogg"
            }
        ];
    };
    BoundPlayer = __decorate([
        core_1.Component({
            selector: 'bound-player',
            templateUrl: 'src/bound-player.html'
        }), 
        __metadata('design:paramtypes', [])
    ], BoundPlayer);
    return BoundPlayer;
}());
exports.BoundPlayer = BoundPlayer;
//# sourceMappingURL=bound-player.js.map