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
var vg_events_1 = require('../events/vg-events');
var Rx_1 = require('rxjs/Rx');
var VgCuePoints = (function () {
    function VgCuePoints(ref) {
        this.ref = ref;
        this.onEnterCuePoint = new core_1.EventEmitter();
        this.onUpdateCuePoint = new core_1.EventEmitter();
        this.onExitCuePoint = new core_1.EventEmitter();
        this.onCompleteCuePoint = new core_1.EventEmitter();
    }
    VgCuePoints.prototype.ngOnInit = function () {
        var onLoad = Rx_1.Observable.fromEvent(this.ref.nativeElement, vg_events_1.VgEvents.VG_LOAD);
        onLoad.subscribe(this.onLoad.bind(this));
    };
    VgCuePoints.prototype.onLoad = function (event) {
        var cues = event.target.track.cues;
        this.ref.nativeElement.cues = cues;
        for (var i = 0, l = cues.length; i < l; i++) {
            var onEnter = Rx_1.Observable.fromEvent(cues[i], vg_events_1.VgEvents.VG_ENTER);
            onEnter.subscribe(this.onEnter.bind(this));
            var onExit = Rx_1.Observable.fromEvent(cues[i], vg_events_1.VgEvents.VG_EXIT);
            onExit.subscribe(this.onExit.bind(this));
        }
    };
    VgCuePoints.prototype.onEnter = function (event) {
        this.onEnterCuePoint.next(event.target);
    };
    VgCuePoints.prototype.onExit = function (event) {
        this.onExitCuePoint.next(event.target);
    };
    __decorate([
        core_1.Output('onEnterCuePoint'), 
        __metadata('design:type', core_1.EventEmitter)
    ], VgCuePoints.prototype, "onEnterCuePoint", void 0);
    __decorate([
        core_1.Output('onUpdateCuePoint'), 
        __metadata('design:type', core_1.EventEmitter)
    ], VgCuePoints.prototype, "onUpdateCuePoint", void 0);
    __decorate([
        core_1.Output('onExitCuePoint'), 
        __metadata('design:type', core_1.EventEmitter)
    ], VgCuePoints.prototype, "onExitCuePoint", void 0);
    __decorate([
        core_1.Output('onCompleteCuePoint'), 
        __metadata('design:type', core_1.EventEmitter)
    ], VgCuePoints.prototype, "onCompleteCuePoint", void 0);
    VgCuePoints = __decorate([
        core_1.Directive({
            selector: '[vgCuePoints]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VgCuePoints);
    return VgCuePoints;
}());
exports.VgCuePoints = VgCuePoints;
//# sourceMappingURL=vg-cue-points.js.map