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
var VRPlayer = (function () {
    function VRPlayer(ref) {
        this.color = 34034;
        this.lastTime = 0;
        this.hexColor = '#0084f2';
        this.videoUrl = 'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/';
        this.elem = ref.nativeElement;
    }
    VRPlayer.prototype.ngOnInit = function () {
        this.dialog = this.elem.querySelector('.info-dialog');
        this.aframe = this.elem.querySelector('a-scene');
        core_2.VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    };
    VRPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (fsState) {
            this.aframe.setStereoRenderer();
            this.aframe.addState('vr-mode');
        }
    };
    VRPlayer.prototype.onMouseEnter = function ($event) {
        var _this = this;
        this.progress = requestAnimationFrame(function (currentTime) { return _this.onProgress(currentTime, $event); });
    };
    VRPlayer.prototype.onProgress = function (currentTime, $event) {
        var _this = this;
        if (!this.lastTime)
            this.lastTime = currentTime;
        var elapsedTime = currentTime - this.lastTime;
        if (elapsedTime > 3000) {
            cancelAnimationFrame(this.progress.data.handleId);
            this.lastTime = 0;
        }
        else {
            var hexNum = Number(this.color).toString(16);
            this.progress = requestAnimationFrame(function (currentTime) { return _this.onProgress(currentTime, $event); });
            this.color += 1;
            this.hexColor = '#' + Array(6 - hexNum.length + 1).join('0') + hexNum;
            $event.target.setAttribute('color', this.hexColor);
        }
    };
    VRPlayer = __decorate([
        core_1.Component({
            selector: 'vr-player',
            templateUrl: 'src/vr-player.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VRPlayer);
    return VRPlayer;
}());
exports.VRPlayer = VRPlayer;
//# sourceMappingURL=vr-player.js.map