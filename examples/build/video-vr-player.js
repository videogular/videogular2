var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var core_2 = require("videogular2/core");
var controls_1 = require("videogular2/controls");
var overlay_play_1 = require("videogular2/overlay-play");
var VideoVrPlayer = (function () {
    function VideoVrPlayer() {
    }
    VideoVrPlayer = __decorate([
        core_1.Component({
            selector: 'video-vr-player',
            templateUrl: 'src/video-vr-player.html',
            directives: [
                core_2.VgPlayer,
                overlay_play_1.VgOverlayPlay,
                controls_1.VgControls,
                controls_1.VgPlayPause,
                controls_1.VgPlaybackButton,
                controls_1.VgScrubBar,
                controls_1.VgScrubBarCurrentTime,
                controls_1.VgScrubBarBufferingTime,
                controls_1.VgMute,
                controls_1.VgFullscreen,
                core_2.Vg360
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VideoVrPlayer);
    return VideoVrPlayer;
})();
exports.VideoVrPlayer = VideoVrPlayer;
//# sourceMappingURL=video-vr-player.js.map