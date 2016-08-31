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
var Observable_1 = require("rxjs/Observable");
var vg_events_1 = require("../events/vg-events");
var vg_states_1 = require("../states/vg-states");
var VgMedia = (function () {
    function VgMedia(ref) {
        this._vgMaster = false;
        this.state = vg_states_1.VgStates.VG_PAUSED;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.subscriptions = {};
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isCompleted = false;
        this.elem = ref.nativeElement;
    }
    Object.defineProperty(VgMedia.prototype, "isMaster", {
        get: function () {
            return this._vgMaster;
        },
        set: function (value) {
            this._vgMaster = value;
        },
        enumerable: true,
        configurable: true
    });
    VgMedia.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.canPlay = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_CAN_PLAY);
        this.subscriptions.canPlayThrough = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_CAN_PLAY_THROUGH);
        this.subscriptions.loadedMetadata = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOADED_METADATA);
        this.subscriptions.waiting = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_WAITING);
        this.subscriptions.progress = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PROGRESS);
        this.subscriptions.ended = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_ENDED);
        this.subscriptions.playing = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PLAYING);
        this.subscriptions.play = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PLAY);
        this.subscriptions.pause = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PAUSE);
        this.subscriptions.timeUpdate = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_TIME_UPDATE);
        this.subscriptions.volumeChange = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_VOLUME_CHANGE);
        this.subscriptions.error = Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_ERROR);
        // See changes on <source> child elements to reload the video file
        this.subscriptions.mutation = Observable_1.Observable.create(function (observer) {
            var domObs = new MutationObserver(function (mutations) {
                observer.next(mutations);
            });
            domObs.observe(_this.elem, { childList: true });
            return function () {
                domObs.disconnect();
            };
        });
        this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
        this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
        this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
        this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
        this.subscriptions.waiting.subscribe(this.onWait.bind(this));
        this.subscriptions.progress.subscribe(this.onProgress.bind(this));
        this.subscriptions.ended.subscribe(this.onComplete.bind(this));
        this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
        this.subscriptions.play.subscribe(this.onPlay.bind(this));
        this.subscriptions.pause.subscribe(this.onPause.bind(this));
        this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
        this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
        this.subscriptions.error.subscribe(this.onError.bind(this));
    };
    VgMedia.prototype.onMutation = function (mutations) {
        var _this = this;
        this.elem.pause();
        this.elem.currentTime = 0;
        // TODO: This is ugly, we should find something cleaner
        setTimeout(function () { return _this.elem.load(); }, 1);
    };
    VgMedia.prototype.play = function () {
        this.elem.play();
    };
    VgMedia.prototype.pause = function () {
        this.elem.pause();
    };
    Object.defineProperty(VgMedia.prototype, "id", {
        get: function () {
            return this.elem.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "duration", {
        get: function () {
            return this.elem.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "currentTime", {
        get: function () {
            return this.elem.currentTime;
        },
        set: function (seconds) {
            this.elem.currentTime = seconds;
            this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_SEEK));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "volume", {
        get: function () {
            return this.elem.volume;
        },
        set: function (volume) {
            this.elem.volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "playbackRate", {
        get: function () {
            return this.elem.playbackRate;
        },
        set: function (rate) {
            this.elem.playbackRate = rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "buffered", {
        get: function () {
            return this.elem.buffered;
        },
        enumerable: true,
        configurable: true
    });
    VgMedia.prototype.onCanPlay = function (event) {
        this.canPlay = true;
    };
    VgMedia.prototype.onCanPlayThrough = function (event) {
        this.canPlayThrough = true;
    };
    VgMedia.prototype.onLoadMetadata = function (event) {
        this.isMetadataLoaded = true;
        this.time.total = this.duration * 1000;
    };
    VgMedia.prototype.onWait = function (event) {
        this.isWaiting = true;
    };
    VgMedia.prototype.onComplete = function (event) {
        this.isCompleted = true;
        this.state = vg_states_1.VgStates.VG_ENDED;
    };
    VgMedia.prototype.onStartPlaying = function (event) {
        this.state = vg_states_1.VgStates.VG_PLAYING;
    };
    VgMedia.prototype.onPlay = function (event) {
        this.state = vg_states_1.VgStates.VG_PLAYING;
    };
    VgMedia.prototype.onPause = function (event) {
        this.state = vg_states_1.VgStates.VG_PAUSED;
    };
    VgMedia.prototype.onTimeUpdate = function (event) {
        var end = this.buffered.length - 1;
        this.time.current = this.currentTime * 1000;
        this.time.left = (this.duration - this.currentTime) * 1000;
        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    };
    VgMedia.prototype.onProgress = function (event) {
        var end = this.buffered.length - 1;
        if (end >= 0) {
            this.buffer.end = this.buffered.end(end) * 1000;
        }
    };
    VgMedia.prototype.onVolumeChange = function (event) {
        // TODO: Save to localstorage the current volume
    };
    VgMedia.prototype.onError = function (event) {
        // TODO: Handle error messages
    };
    __decorate([
        core_1.Input('vg-master'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], VgMedia.prototype, "isMaster", null);
    VgMedia = __decorate([
        core_1.Directive({
            selector: '[vg-media]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VgMedia);
    return VgMedia;
}());
exports.VgMedia = VgMedia;
//# sourceMappingURL=vg-media.js.map