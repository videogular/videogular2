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
var vg_api_1 = require('../services/vg-api');
var vg_states_1 = require("../states/vg-states");
var VgOverlayPlay = (function () {
    function VgOverlayPlay(ref, API) {
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgOverlayPlay.prototype.ngOnInit = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgOverlayPlay.prototype.onClick = function () {
        var state = this.getState();
        switch (state) {
            case vg_states_1.VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case vg_states_1.VgStates.VG_PAUSED:
                this.target.play();
                break;
        }
    };
    VgOverlayPlay.prototype.getState = function () {
        var state = vg_states_1.VgStates.VG_PAUSED;
        if (this.target && this.target.state instanceof Array) {
            for (var i = 0, l = this.target.state.length; i < l; i++) {
                if (this.target.state[i] === vg_states_1.VgStates.VG_PLAYING) {
                    state = vg_states_1.VgStates.VG_PLAYING;
                    break;
                }
            }
        }
        else {
            state = this.target.state;
        }
        return state;
    };
    VgOverlayPlay = __decorate([
        core_1.Component({
            selector: 'vg-overlay-play',
            host: {
                '(click)': 'onClick()',
                'class': 'vg-overlay-play'
            },
            template: "<div class=\"vg-overlay-play\">\n            <div class=\"overlay-play-container\"\n                 [class.play]=\"getState() !== 'playing'\">\n            </div>\n        </div>",
            styles: ["\n        .vg-overlay-play {\n            transition: all 0.5s;\n            cursor: pointer;\n            position: absolute;\n            display: block;\n            color: white;\n            width: 100%;\n            height: 100%;\n            z-index: 200;\n            font-size: 80px;\n            filter: alpha(opacity=60);\n            opacity: 0.6;\n        }\n\n        .vg-overlay-play .overlay-play-container.play {\n            pointer-events: none;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .vg-overlay-play .overlay-play-container.play:before {\n            transition: all 0.5s;\n            content: \"\\e000\";\n        }\n\n        .vg-overlay-play:hover {\n            filter: alpha(opacity=100);\n            opacity: 1;\n        }\n\n        .vg-overlay-play:hover .overlay-play-container.play:before {\n            transform: scale(1.2);\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgOverlayPlay);
    return VgOverlayPlay;
}());
exports.VgOverlayPlay = VgOverlayPlay;
//# sourceMappingURL=vg-overlay-play.js.map