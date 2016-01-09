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
var vg_events_1 = require('../events/vg-events');
var vg_fullscreen_api_1 = require('../services/vg-fullscreen-api');
var VgAPI = (function () {
    function VgAPI() {
        this.medias = {};
        vg_fullscreen_api_1.VgFullscreenAPI.init();
    }
    VgAPI.prototype.getDefaultMedia = function () {
        for (var item in this.medias) {
            return this.medias[item];
        }
    };
    VgAPI.prototype.getMediaById = function (id) {
        var media = this.medias[id];
        if (!id || id === '*') {
            media = this;
        }
        return media;
    };
    VgAPI.prototype.play = function () {
        for (var id in this.medias) {
            this.medias[id].play();
        }
    };
    VgAPI.prototype.pause = function () {
        for (var id in this.medias) {
            this.medias[id].pause();
        }
    };
    Object.defineProperty(VgAPI.prototype, "duration", {
        get: function () {
            return this.$$getAllProperties('duration');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "state", {
        get: function () {
            return this.$$getAllProperties('state');
        },
        set: function (state) {
            this.$$setAllProperties('state', state);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "volume", {
        get: function () {
            return this.$$getAllProperties('volume');
        },
        set: function (volume) {
            this.$$setAllProperties('volume', volume);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "playbackRate", {
        get: function () {
            return this.$$getAllProperties('playbackRate');
        },
        set: function (rate) {
            this.$$setAllProperties('playbackRate', rate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "canPlay", {
        get: function () {
            return this.$$getAllProperties('canPlay');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "canPlayThrough", {
        get: function () {
            return this.$$getAllProperties('canPlayThrough');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isMetadataLoaded", {
        get: function () {
            return this.$$getAllProperties('isMetadataLoaded');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isWaiting", {
        get: function () {
            return this.$$getAllProperties('isWaiting');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isCompleted", {
        get: function () {
            return this.$$getAllProperties('isCompleted');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "time", {
        get: function () {
            return this.$$getAllProperties('time');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "buffered", {
        get: function () {
            return this.$$getAllProperties('buffered');
        },
        enumerable: true,
        configurable: true
    });
    VgAPI.prototype.seekTime = function (value, byPercent) {
        if (value === void 0) { value = 0; }
        if (byPercent === void 0) { byPercent = false; }
        for (var id in this.medias) {
            this.$$seek(this.medias[id], value, byPercent);
        }
    };
    VgAPI.prototype.$$seek = function (media, value, byPercent) {
        if (value === void 0) { value = 0; }
        if (byPercent === void 0) { byPercent = false; }
        var second;
        if (byPercent) {
            second = value * media.duration / 100;
        }
        else {
            second = value;
        }
        media.currentTime = second;
    };
    VgAPI.prototype.$$getAllProperties = function (property) {
        var result = {};
        for (var id in this.medias) {
            result[id] = this.medias[id][property];
        }
        if (Object.keys(result).length === 1)
            result = result[Object.keys(result)[0]];
        return result;
    };
    VgAPI.prototype.$$setAllProperties = function (property, value) {
        for (var id in this.medias) {
            this.medias[id][property] = value;
        }
    };
    VgAPI.prototype.registerElement = function (elem) {
        this.videogularElement = elem;
    };
    VgAPI.prototype.registerMedia = function (media) {
        var _this = this;
        media.time = {
            current: 0,
            total: 0,
            left: 0
        };
        media.buffer = {
            end: 0
        };
        media.canPlay = false;
        media.canPlayThrough = false;
        media.isMetadataLoaded = false;
        media.isWaiting = false;
        media.isCompleted = false;
        media.state = 'pause';
        media.seekTime = function (value, byPercent) {
            if (value === void 0) { value = 0; }
            if (byPercent === void 0) { byPercent = false; }
            _this.$$seek(media, value, byPercent);
        };
        this.medias[media.id] = media;
        this.connect(media);
    };
    VgAPI.prototype.toggleFullscreen = function (element) {
        if (!element)
            element = this.videogularElement;
        if (vg_fullscreen_api_1.VgFullscreenAPI.isFullscreen()) {
            vg_fullscreen_api_1.VgFullscreenAPI.exit();
        }
        else {
            vg_fullscreen_api_1.VgFullscreenAPI.request(element);
        }
    };
    VgAPI.prototype.isFullscreen = function () {
        return vg_fullscreen_api_1.VgFullscreenAPI.isFullscreen();
    };
    VgAPI.prototype.connect = function (media) {
        media.addEventListener(vg_events_1.VgEvents.VG_CAN_PLAY, this.onCanPlay.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_CAN_PLAY_THROUGH, this.onCanPlayThrough.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_LOADED_METADATA, this.onLoadMetadata.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_WAITING, this.onWait.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_PROGRESS, this.onProgress.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_ENDED, this.onComplete.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_PLAYING, this.onStartPlaying.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_PLAY, this.onPlay.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_PAUSE, this.onPause.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_PLAYBACK_CHANGE, this.onPlaybackChange.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_TIME_UPDATE, this.onTimeUpdate.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_VOLUME_CHANGE, this.onVolumeChange.bind(this, media.id), false);
        media.addEventListener(vg_events_1.VgEvents.VG_ERROR, this.onError.bind(this, media.id), false);
    };
    VgAPI.prototype.onCanPlay = function (id) {
        this.medias[id].canPlay = true;
    };
    VgAPI.prototype.onCanPlayThrough = function (id) {
        this.medias[id].canPlayThrough = true;
    };
    VgAPI.prototype.onLoadMetadata = function (id) {
        this.medias[id].isMetadataLoaded = true;
        this.medias[id].time.total = this.medias[id].duration * 1000;
    };
    VgAPI.prototype.onWait = function (id) {
        this.medias[id].isWaiting = true;
    };
    VgAPI.prototype.onComplete = function (id) {
        this.medias[id].isCompleted = true;
        this.medias[id].state = 'pause';
    };
    VgAPI.prototype.onStartPlaying = function (id) {
        this.medias[id].state = 'play';
    };
    VgAPI.prototype.onPlay = function (id) {
        this.medias[id].state = 'play';
    };
    VgAPI.prototype.onPause = function (id) {
        this.medias[id].state = 'pause';
    };
    VgAPI.prototype.onPlaybackChange = function (id, rate) {
        this.medias[id].playbackRate = rate;
    };
    VgAPI.prototype.onTimeUpdate = function (id) {
        this.medias[id].time.current = this.medias[id].currentTime * 1000;
        this.medias[id].time.left = (this.medias[id].duration - this.medias[id].currentTime) * 1000;
        this.medias[id].buffer.end = this.medias[id].buffered.end(this.medias[id].buffered.length - 1) * 1000;
    };
    VgAPI.prototype.onProgress = function (id) {
        this.medias[id].buffer.end = this.medias[id].buffered.end(this.medias[id].buffered.length - 1) * 1000;
    };
    VgAPI.prototype.onVolumeChange = function (id) {
    };
    VgAPI.prototype.onError = function (id) {
        console.log('error');
    };
    VgAPI = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VgAPI);
    return VgAPI;
})();
exports.VgAPI = VgAPI;
//# sourceMappingURL=vg-api.js.map