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
var common_1 = require("@angular/common");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_2 = require("@angular/common");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var single_media_player_1 = require("./single-media-player");
var multiple_media_player_1 = require("./multiple-media-player");
var audio_player_1 = require("./audio-player");
var bound_player_1 = require("./bound-player");
var cue_points_player_1 = require("./cue-points-player");
var video_360_player_1 = require("./video-360-player");
var video_vr_player_1 = require("./video-vr-player");
var image_player_1 = require("./image-player");
var master_media_1 = require("./master-media");
var VgDemo = (function () {
    function VgDemo(router, location) {
        this.router = router;
        this.location = location;
    }
    VgDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.router.subscribe(function () {
            _this.activeView = _this.location.path();
        });
    };
    VgDemo = __decorate([
        core_1.Component({
            selector: 'vg-demo',
            templateUrl: 'src/app.html',
            styles: [
                "\n        :host {\n            display: block;\n            margin: 0 auto;\n            max-width: 1200px;\n            font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        }\n\n        :host header {\n            padding: 10px 30px;\n            color: white;\n            background-color: #507EB3;\n            z-index: 1;\n            position: relative;\n        }\n\n        :host aside {\n            width: 250px;\n            height: 100%;\n            position: fixed;\n            top: 0;\n            padding-top: 100px;\n            color: white;\n            background-color: #507EB3;\n        }\n\n        :host aside nav {\n            width: 100%;\n            color: white;\n            background-color: #507EB3;\n        }\n\n        :host aside nav ul {\n            padding: 0;\n            list-style-type: none;\n        }\n\n        :host aside nav ul li a {\n            text-decoration: none;\n            color: #ffffff;\n            font-size: 1.2em;\n            width: calc(100% - 20px);\n            display: inline-block;\n            padding: 10px;\n        }\n\n        :host aside nav ul li a:hover {\n            color: #507EB3;\n            background-color: white;\n            text-decoration: none;\n        }\n\n        :host aside nav ul li a.router-link-active {\n            color: #507EB3;\n            background-color: white;\n            text-decoration: none;\n        }\n\n        :host section {\n            padding-left: 280px;\n            padding-right: 30px;\n            margin: auto;\n        }\n\n        :host section .router-container {\n            margin: 0 auto;\n        }\n        "
            ],
            directives: [
                router_deprecated_1.ROUTER_DIRECTIVES
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/single-media-player', name: 'SingleMediaPlayer', component: single_media_player_1.SingleMediaPlayer, useAsDefault: true },
            { path: '/multiple-media-player', name: 'MultipleMediaPlayer', component: multiple_media_player_1.MultipleMediaPlayer },
            { path: '/audio-player', name: 'AudioPlayer', component: audio_player_1.AudioPlayer },
            { path: '/bound-player', name: 'BoundPlayer', component: bound_player_1.BoundPlayer },
            { path: '/cue-points-player', name: 'CuePointsPlayer', component: cue_points_player_1.CuePointsPlayer },
            { path: '/video-360', name: 'Video360Player', component: video_360_player_1.Video360Player },
            { path: '/video-vr', name: 'VideoVrPlayer', component: video_vr_player_1.VideoVrPlayer },
            { path: '/image-player', name: 'ImagePlayer', component: image_player_1.ImagePlayer },
            { path: '/master-media', name: 'MasterMedia', component: master_media_1.MasterMedia },
            { path: '/**', redirectTo: ['SingleMediaPlayer'] }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, common_1.Location])
    ], VgDemo);
    return VgDemo;
}());
exports.VgDemo = VgDemo;
platform_browser_dynamic_1.bootstrap(VgDemo, [
    router_deprecated_1.ROUTER_PROVIDERS,
    core_1.bind(common_2.LocationStrategy).toClass(common_2.HashLocationStrategy)
]);
//# sourceMappingURL=app.js.map