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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1tZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBR25FLDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDBCQUF1QixxQkFBcUIsQ0FBQyxDQUFBO0FBQzdDLDBCQUF1QixxQkFBcUIsQ0FBQyxDQUFBO0FBSzdDO0lBdUJJLGlCQUFZLEdBQWM7UUFwQmxCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFRbEMsVUFBSyxHQUFVLG9CQUFRLENBQUMsU0FBUyxDQUFDO1FBRWxDLFNBQUksR0FBTyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDM0MsV0FBTSxHQUFPLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQU8sRUFBRSxDQUFDO1FBRXZCLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFDeEIsbUJBQWMsR0FBVyxLQUFLLENBQUM7UUFDL0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDO1FBQ2pDLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFHeEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ2xDLENBQUM7SUFyQm1CLHNCQUFJLDZCQUFRO2FBR2hDO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQUxtQixVQUFhLEtBQWE7WUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFxQkQsMEJBQVEsR0FBUjtRQUFBLGlCQTJDQztRQTFDRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBTSxJQUFJLENBQUMs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QUksQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGFB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RCxDQUFDO0lBRUQseUJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDVCw4QkFBOEI7SUFDbEMsQ0FBQztJQXJMRDtRQUFDLFlBQUssQ0FBQyxXQUFXLENBQUM7OzsyQ0FBQTtJQVB2QjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtTQUN6QixDQUFDOztlQUFBO0lBMkxGLGNBQUM7QUFBRCxDQUFDLEFBMUxELElBMExDO0FBMUxZLGVBQU8sVUEwTG5CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIE9uSW5pdCwgRGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7SVBsYXlhYmxlfSBmcm9tIFwiLi9pLXBsYXlhYmxlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7VmdFdmVudHN9IGZyb20gXCIuLi9ldmVudHMvdmctZXZlbnRzXCI7XG5pbXBvcnQge1ZnU3RhdGVzfSBmcm9tIFwiLi4vc3RhdGVzL3ZnLXN0YXRlc1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2Zy1tZWRpYV0nXG59KVxuZXhwb3J0IGNsYXNzIFZnTWVkaWEgaW1wbGVtZW50cyBPbkluaXQsIElQbGF5YWJsZSB7XG4gICAgZWxlbTpIVE1MTWVkaWFFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBfdmdNYXN0ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgndmctbWFzdGVyJykgc2V0IGlzTWFzdGVyKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmdNYXN0ZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGlzTWFzdGVyKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92Z01hc3RlcjtcbiAgICB9XG5cbiAgICBzdGF0ZTpzdHJpbmcgPSBWZ1N0YXRlcy5WR19QQVVTRUQ7XG4gICAgXG4gICAgdGltZTphbnkgPSB7Y3VycmVudDogMCwgdG90YWw6IDAsIGxlZnQ6IDB9O1xuICAgIGJ1ZmZlcjphbnkgPSB7ZW5kOiAwfTtcbiAgICBzdWJzY3JpcHRpb25zOmFueSA9IHt9O1xuICAgIFxuICAgIGNhblBsYXk6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGNhblBsYXlUaHJvdWdoOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01ldGFkYXRhTG9hZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1dhaXRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQ29tcGxldGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihyZWY6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmNhblBsYXkgPSBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfQ0FOX1BMQVkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuY2FuUGxheVRocm91Z2ggPSBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfQ0FOX1BMQVlfVEhST1VHSCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19MT0FERURfTUVUQURBVEEpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMud2FpdGluZyA9IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19XQUlUSU5HKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnByb2dyZXNzID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1BST0dSRVNTKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmVuZGVkID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0VOREVEKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnBsYXlpbmcgPSBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfUExBWUlORyk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wbGF5ID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1BMQVkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucGF1c2UgPSBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfUEFVU0UpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudGltZVVwZGF0ZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19USU1FX1VQREFURSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy52b2x1bWVDaGFuZ2UgPSBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfVk9MVU1FX0NIQU5HRSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5lcnJvciA9IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19FUlJPUik7XG5cbiAgICAgICAgLy8gU2VlIGNoYW5nZXMgb24gPHNvdXJjZT4gY2hpbGQgZWxlbWVudHMgdG8gcmVsb2FkIHRoZSB2aWRlbyBmaWxlXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tdXRhdGlvbiA9IE9ic2VydmFibGUuY3JlYXRlKFxuICAgICAgICAgICAgKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRvbU9icyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChtdXRhdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZG9tT2JzLm9ic2VydmUoPGFueT50aGlzLmVsZW0sIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9tT2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tdXRhdGlvbi5zdWJzY3JpYmUodGhpcy5vbk11dGF0aW9uLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5jYW5QbGF5LnN1YnNjcmliZSh0aGlzLm9uQ2FuUGxheS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmNhblBsYXlUaHJvdWdoLnN1YnNjcmliZSh0aGlzLm9uQ2FuUGxheVRocm91Z2guYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YS5zdWJzY3JpYmUodGhpcy5vbkxvYWRNZXRhZGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLndhaXRpbmcuc3Vic2NyaWJlKHRoaXMub25XYWl0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHJvZ3Jlc3Muc3Vic2NyaWJlKHRoaXMub25Qcm9ncmVzcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmVuZGVkLnN1YnNjcmliZSh0aGlzLm9uQ29tcGxldGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wbGF5aW5nLnN1YnNjcmliZSh0aGlzLm9uU3RhcnRQbGF5aW5nLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucGxheS5zdWJzY3JpYmUodGhpcy5vblBsYXkuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wYXVzZS5zdWJzY3JpYmUodGhpcy5vblBhdXNlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudGltZVVwZGF0ZS5zdWJzY3JpYmUodGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy52b2x1bWVDaGFuZ2Uuc3Vic2NyaWJlKHRoaXMub25Wb2x1bWVDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5lcnJvci5zdWJzY3JpYmUodGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9uTXV0YXRpb24obXV0YXRpb25zKSB7XG4gICAgICAgIHRoaXMuZWxlbS5wYXVzZSgpO1xuICAgICAgICB0aGlzLmVsZW0uY3VycmVudFRpbWUgPSAwO1xuXG4gICAgICAgIC8vIFRPRE86IFRoaXMgaXMgdWdseSwgd2Ugc2hvdWxkIGZpbmQgc29tZXRoaW5nIGNsZWFuZXJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmVsZW0ubG9hZCgpLCAxKTtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmVsZW0ucGxheSgpO1xuICAgIH1cbiAgICBcbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5lbGVtLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtLmlkO1xuICAgIH1cblxuICAgIGdldCBkdXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbS5kdXJhdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFRpbWUoc2Vjb25kcykge1xuICAgICAgICB0aGlzLmVsZW0uY3VycmVudFRpbWUgPSAgc2Vjb25kcztcbiAgICAgICAgdGhpcy5lbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFZnRXZlbnRzLlZHX1NFRUspKTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW0uY3VycmVudFRpbWU7XG4gICAgfVxuXG4gICAgc2V0IHZvbHVtZSh2b2x1bWUpIHtcbiAgICAgICAgdGhpcy5lbGVtLnZvbHVtZSA9IHZvbHVtZTtcbiAgICB9XG5cbiAgICBnZXQgdm9sdW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtLnZvbHVtZTtcbiAgICB9XG5cbiAgICBzZXQgcGxheWJhY2tSYXRlKHJhdGUpIHtcbiAgICAgICAgdGhpcy5lbGVtLnBsYXliYWNrUmF0ZSA9IHJhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHBsYXliYWNrUmF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbS5wbGF5YmFja1JhdGU7XG4gICAgfVxuXG4gICAgZ2V0IGJ1ZmZlcmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtLmJ1ZmZlcmVkO1xuICAgIH1cblxuICAgIG9uQ2FuUGxheShldmVudCkge1xuICAgICAgICB0aGlzLmNhblBsYXkgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2FuUGxheVRocm91Z2goZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYW5QbGF5VGhyb3VnaCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Mb2FkTWV0YWRhdGEoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc01ldGFkYXRhTG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnRpbWUudG90YWwgPSB0aGlzLmR1cmF0aW9uICogMTAwMDtcbiAgICB9XG5cbiAgICBvbldhaXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1dhaXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQ29tcGxldGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBWZ1N0YXRlcy5WR19FTkRFRDtcbiAgICB9XG5cbiAgICBvblN0YXJ0UGxheWluZyhldmVudCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gVmdTdGF0ZXMuVkdfUExBWUlORztcbiAgICB9XG5cbiAgICBvblBsYXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZnU3RhdGVzLlZHX1BMQVlJTkc7XG4gICAgfVxuXG4gICAgb25QYXVzZShldmVudCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gVmdTdGF0ZXMuVkdfUEFVU0VEO1xuICAgIH1cblxuICAgIG9uVGltZVVwZGF0ZShldmVudCkge1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5idWZmZXJlZC5sZW5ndGggLSAxO1xuXG4gICAgICAgIHRoaXMudGltZS5jdXJyZW50ID0gdGhpcy5jdXJyZW50VGltZSAqIDEwMDA7XG4gICAgICAgIHRoaXMudGltZS5sZWZ0ID0gKHRoaXMuZHVyYXRpb24gLSB0aGlzLmN1cnJlbnRUaW1lKSAqIDEwMDA7XG5cbiAgICAgICAgaWYgKGVuZCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5lbmQgPSB0aGlzLmJ1ZmZlcmVkLmVuZChlbmQpICogMTAwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuYnVmZmVyZWQubGVuZ3RoIC0gMTtcblxuICAgICAgICBpZiAoZW5kID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyLmVuZCA9IHRoaXMuYnVmZmVyZWQuZW5kKGVuZCkgKiAxMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Wb2x1bWVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgLy8gVE9ETzogU2F2ZSB0byBsb2NhbHN0b3JhZ2UgdGhlIGN1cnJlbnQgdm9sdW1lXG4gICAgfVxuXG4gICAgb25FcnJvcihldmVudCkge1xuICAgICAgICAvLyBUT0RPOiBIYW5kbGUgZXJyb3IgbWVzc2FnZXNcbiAgICB9XG59XG4iXX0=