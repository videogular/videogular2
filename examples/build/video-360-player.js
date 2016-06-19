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
var core_1 = require("@angular/core");
var core_2 = require("videogular2/core");
var controls_1 = require("videogular2/controls");
var overlay_play_1 = require("videogular2/overlay-play");
var Video360Player = (function () {
    function Video360Player(ref) {
        this.showPointer = true;
        this.isActive = false;
        this.elem = ref.nativeElement;
    }
    Video360Player.prototype.ngOnInit = function () {
        this.hotSpots = [];
        this.dialog = this.elem.querySelector('.info-dialog');
        var hs = {};
        hs.element = this.dialog;
        hs.position = {
            x: -500,
            y: 0,
            z: 150
        };
        hs.rotation = {
            x: 0,
            y: 46,
            z: 0
        };
        this.hotSpots.push(hs);
    };
    Video360Player.prototype.onEnterHotSpot = function (object) {
        console.log('enter', object);
        this.isActive = true;
    };
    Video360Player.prototype.onLeaveHotSpot = function (object) {
        console.log('leave', object);
        this.isActive = false;
    };
    Video360Player = __decorate([
        core_1.Component({
            selector: 'video-360-player',
            templateUrl: 'src/video-360-player.html',
            providers: [core_2.VgAPI],
            directives: [
                core_2.VgPlayer,
                core_2.VgMedia,
                overlay_play_1.VgOverlayPlay,
                controls_1.VgControls,
                controls_1.VgTimeDisplay,
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
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Video360Player);
    return Video360Player;
}());
exports.Video360Player = Video360Player;
//# sourceMappingURL=video-360-player.js.map