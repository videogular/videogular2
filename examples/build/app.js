var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var browser_1 = require('angular2/platform/browser');
var single_media_player_1 = require("./single-media-player");
var multiple_media_player_1 = require("./multiple-media-player");
var audio_player_1 = require("./audio-player");
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
            templateUrl: './src/app.html',
            styles: [
                "\n        :host {\n            display: block;\n            margin: 0 auto;\n            max-width: 1200px;\n            font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        }\n\n        :host header {\n            width: 94%;\n            padding: 3%;\n            color: white;\n            background-color: #507EB3;\n        }\n\n        :host aside {\n            width: 24%;\n            height: 100%;\n            position: fixed;\n            color: white;\n            background-color: #507EB3;\n        }\n\n        :host aside nav {\n            width: 97%;\n            color: white;\n            background-color: #507EB3;\n            padding: 0 1.5% 0 1.5%;\n        }\n\n        :host aside nav ul {\n            padding: 0;\n            list-style-type: none;\n        }\n\n        :host aside nav ul li a {\n            text-decoration: none;\n            color: #ffffff;\n            font-size: 1.2em;\n            width: 100%;\n            display: inline-block;\n            padding: 10px;\n        }\n\n        :host aside nav ul li a:hover {\n            color: #507EB3;\n            background-color: white;\n            text-decoration: none;\n        }\n\n        :host aside nav ul li a.router-link-active {\n            color: #507EB3;\n            background-color: white;\n            text-decoration: none;\n        }\n\n        :host section {\n            width: calc(76% - 60px);\n            padding-left: 30px;\n            padding-right: 30px;\n            float: right;\n        }\n\n        :host section .router-container {\n            margin: 0 auto;\n        }\n        "
            ],
            directives: [
                router_1.ROUTER_DIRECTIVES
            ]
        }),
        router_1.RouteConfig([
            { path: '/single-media-player', name: 'SingleMediaPlayer', component: single_media_player_1.SingleMediaPlayer, useAsDefault: true },
            { path: '/multiple-media-player', name: 'MultipleMediaPlayer', component: multiple_media_player_1.MultipleMediaPlayer },
            { path: '/audio-player', name: 'AudioPlayer', component: audio_player_1.AudioPlayer },
            { path: '/**', redirectTo: ['SingleMediaPlayer'] }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, router_1.Location])
    ], VgDemo);
    return VgDemo;
})();
exports.VgDemo = VgDemo;
browser_1.bootstrap(VgDemo, [
    router_1.ROUTER_PROVIDERS
]);
//# sourceMappingURL=app.js.map