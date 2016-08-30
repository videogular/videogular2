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
var vg_events_1 = require("../events/vg-events");
var Observable_1 = require("rxjs/Observable");
var vg_states_1 = require("../states/vg-states");
var VgSlides = (function () {
    function VgSlides(ref) {
        this.state = 'paused';
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.subscriptions = {};
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isCompleted = false;
        this.duration = 0;
        this.currentTime = 0;
        this.volume = 0;
        this.playbackRate = 0;
        this.buffered = {
            end: function (index) { return 0; },
            start: function (index) { return 0; },
            length: 0
        };
        this.lastTime = 0;
        this.elem = ref.nativeElement;
        this.expose();
    }
    VgSlides.prototype.ngOnInit = function () {
        this.currentSlide = this.slides[0];
        for (var i = 0, l = this.slides.length; i < l; i++) {
            this.duration += this.slides[i].end - this.slides[i].start;
        }
        this.expose();
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_LOADED_METADATA));
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_TIME_UPDATE));
        Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_SEEK)
            .subscribe(this.onSeek.bind(this));
    };
    VgSlides.prototype.onSeek = function () {
        this.currentTime = this.elem.currentTime;
        this.onProgress(this.lastTime);
        if (this.progress) {
            cancelAnimationFrame(this.progress.data.handleId);
            this.lastTime = 0;
            this.progress = undefined;
        }
    };
    VgSlides.prototype.expose = function () {
        for (var prop in this) {
            if (typeof this[prop] === 'function') {
                this.elem[prop] = this[prop].bind(this);
            }
            else {
                this.elem[prop] = this[prop];
            }
        }
    };
    VgSlides.prototype.play = function () {
        var _this = this;
        this.state = vg_states_1.VgStates.VG_PLAYING;
        this.progress = requestAnimationFrame(function (currentTime) { return _this.onProgress(currentTime); });
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_PLAY));
    };
    VgSlides.prototype.pause = function () {
        if (this.progress) {
            cancelAnimationFrame(this.progress.data.handleId);
            this.lastTime = 0;
            this.progress = undefined;
        }
        this.state = vg_states_1.VgStates.VG_PAUSED;
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_PAUSE));
    };
    VgSlides.prototype.changeToSlide = function (slide) {
        this.currentSlide = slide;
    };
    VgSlides.prototype.onProgress = function (currentTime) {
        var _this = this;
        if (!this.lastTime)
            this.lastTime = currentTime;
        this.currentTime += (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.elem.currentTime = this.currentTime;
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_TIME_UPDATE));
        if (this.state === vg_states_1.VgStates.VG_PLAYING) {
            this.progress = requestAnimationFrame(function (currentTime) { return _this.onProgress(currentTime); });
        }
        for (var i = 0, l = this.slides.length; i < l; i++) {
            var slide = this.slides[i];
            if (i === l - 1 && this.currentTime >= slide.end && this.currentSlide != slide) {
                this.changeToSlide(slide);
                break;
            }
            if (this.currentTime >= slide.start && this.currentTime <= slide.end && this.currentSlide != slide) {
                this.changeToSlide(slide);
                break;
            }
        }
        if (this.currentTime >= this.duration)
            this.onComplete();
    };
    VgSlides.prototype.onComplete = function () {
        if (this.progress) {
            cancelAnimationFrame(this.progress.data.handleId);
        }
        this.state = vg_states_1.VgStates.VG_ENDED;
        this.lastTime = 0;
        this.time.left = 0;
        this.progress = undefined;
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_PAUSE));
        this.elem.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_ENDED));
    };
    __decorate([
        core_1.Input('slides'), 
        __metadata('design:type', Array)
    ], VgSlides.prototype, "slides", void 0);
    VgSlides = __decorate([
        core_1.Component({
            selector: 'vg-slides',
            template: "\n        <img [src]=\"currentSlide.src\">\n    ",
            styles: ["\n        :host {\n            margin: auto;\n        }\n        \n        img {\n            width: 100%;\n        }\n    "
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VgSlides);
    return VgSlides;
}());
exports.VgSlides = VgSlides;
//# sourceMappingURL=vg-slides.js.map