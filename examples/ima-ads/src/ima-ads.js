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
var ImaAds = (function () {
    function ImaAds() {
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
    ImaAds = __decorate([
        core_1.Component({
            selector: 'ima-ads',
            templateUrl: 'src/ima-ads.html',
            styles: ["\n        #demo-player {\n            position: absolute;\n            width: 100%;\n            height: calc(100% - 90px);\n        }\n        .companionAd {\n            position: absolute;\n            bottom: 0;\n            width: 100%;\n            height: 90px;\n        }\n        .skipButton {\n            display: none;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], ImaAds);
    return ImaAds;
}());
exports.ImaAds = ImaAds;
//# sourceMappingURL=ima-ads.js.map