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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var vg_player_1 = require('./src/vg-player/vg-player');
var vg_media_1 = require('./src/vg-media/vg-media');
var vg_cue_points_1 = require('./src/vg-cue-points/vg-cue-points');
var vg_api_1 = require('./src/services/vg-api');
var vg_fullscreen_api_1 = require('./src/services/vg-fullscreen-api');
var vg_utils_1 = require('./src/services/vg-utils');
var vg_events_1 = require('./src/events/vg-events');
var vg_states_1 = require('./src/states/vg-states');
__export(require('./src/services/vg-api'));
__export(require('./src/services/vg-fullscreen-api'));
var VgCore = (function () {
    function VgCore() {
    }
    VgCore = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints],
            providers: [vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_utils_1.VgUtils, vg_events_1.VgEvents, vg_states_1.VgStates],
            exports: [vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints]
        }), 
        __metadata('design:paramtypes', [])
    ], VgCore);
    return VgCore;
}());
exports.VgCore = VgCore;
//# sourceMappingURL=core.js.map