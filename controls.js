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
var common_1 = require('@angular/common');
var vg_controls_1 = require('./src/vg-controls/vg-controls');
var vg_fullscreen_1 = require('./src/vg-controls/vg-fullscreen/vg-fullscreen');
var vg_mute_1 = require('./src/vg-controls/vg-mute/vg-mute');
var vg_play_pause_1 = require('./src/vg-controls/vg-play-pause/vg-play-pause');
var vg_playback_button_1 = require('./src/vg-controls/vg-playback-button/vg-playback-button');
var vg_scrub_bar_1 = require('./src/vg-controls/vg-scrub-bar/vg-scrub-bar');
var vg_scrub_bar_buffering_time_1 = require('./src/vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time');
var vg_scrub_bar_cue_points_1 = require('./src/vg-controls/vg-scrub-bar/vg-scrub-bar-cue-points/vg-scrub-bar-cue-points');
var vg_scrub_bar_current_time_1 = require('./src/vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time');
var vg_time_display_1 = require('./src/vg-controls/vg-time-display/vg-time-display');
var VgControlsModule = (function () {
    function VgControlsModule() {
    }
    VgControlsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_controls_1.VgControls,
                vg_fullscreen_1.VgFullscreen,
                vg_mute_1.VgMute,
                vg_play_pause_1.VgPlayPause,
                vg_playback_button_1.VgPlaybackButton,
                vg_scrub_bar_1.VgScrubBar,
                vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime,
                vg_scrub_bar_cue_points_1.VgScrubBarCuePoints,
                vg_scrub_bar_current_time_1.VgScrubBarCurrentTime,
                vg_time_display_1.VgTimeDisplay
            ],
            exports: [
                vg_controls_1.VgControls,
                vg_fullscreen_1.VgFullscreen,
                vg_mute_1.VgMute,
                vg_play_pause_1.VgPlayPause,
                vg_playback_button_1.VgPlaybackButton,
                vg_scrub_bar_1.VgScrubBar,
                vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime,
                vg_scrub_bar_cue_points_1.VgScrubBarCuePoints,
                vg_scrub_bar_current_time_1.VgScrubBarCurrentTime,
                vg_time_display_1.VgTimeDisplay
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VgControlsModule);
    return VgControlsModule;
}());
exports.VgControlsModule = VgControlsModule;
//# sourceMappingURL=controls.js.map