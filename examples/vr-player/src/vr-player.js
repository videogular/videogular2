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
        this.videos = [
            {
                id: 'v1',
                url: 'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/',
                hotspots: [
                    { id: "h1", point: '-1 2 -5', goto: 'v2' },
                    { id: "h2", point: '-2 3 -5', goto: 'v2' }
                ]
            },
            {
                id: 'v2',
                url: 'http://static.videogular.com/assets/videos/vr-demo.mp4',
                hotspots: [
                    { id: "h1", point: '-1 2 -5', goto: 'v1' },
                    { id: "h2", point: '-2 3 -5', goto: 'v1' }
                ]
            }
        ];
        this.myPos = '-1 2 -5';
        this.elem = ref.nativeElement;
        this.currentVideo = this.videos[0];
        this.spinning = false;
    }
    VRPlayer.prototype.ngOnInit = function () {
        this.aframe = this.elem.querySelector('a-scene');
        core_2.VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    };
    VRPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (fsState) {
            this.aframe.setStereoRenderer();
            this.aframe.addState('vr-mode');
        }
    };
    VRPlayer.prototype.onMouseEnter = function (hotSpot) {
        var _this = this;
        if (!this.spinning) {
            this.spinning = true;
            document.querySelector('#' + hotSpot.id)['emit']('startSpinning' + hotSpot.id);
            setTimeout(function () {
                _this.currentVideo = _this.videos.filter(function (v) { return v.id === hotSpot.goto; })[0];
                _this.spinning = false;
            }, 1250);
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