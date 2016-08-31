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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY3VlLXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWN1ZS1wb2ludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFpRSxlQUFlLENBQUMsQ0FBQTtBQUNqRiwwQkFBdUIscUJBQXFCLENBQUMsQ0FBQTtBQUM3QyxtQkFBeUIsU0FBUyxDQUFDLENBQUE7QUFLbkM7SUFNSSxxQkFBbUIsR0FBYztRQUFkLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFMTixvQkFBZSxHQUFxQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0RCxxQkFBZ0IsR0FBcUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUQsbUJBQWMsR0FBcUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDbEQsdUJBQWtCLEdBQXFCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBSXhGLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxNQUFNLEdBQUcsZUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLEtBQUs7UUFDUixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBUSxDQUFDLEVBQUUsQ0FBQyxHQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xELElBQUksT0FBTyxHQUFHLGVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTNDLElBQUksTUFBTSxHQUFHLGVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLG9CQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxLQUFLO1FBQ1IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFsQ0Q7UUFBQyxhQUFNLENBQUMsaUJBQWlCLENBQUM7O3dEQUFBO0lBQzFCO1FBQUMsYUFBTSxDQUFDLGtCQUFrQixDQUFDOzt5REFBQTtJQUMzQjtRQUFDLGFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7dURBQUE7SUFDekI7UUFBQyxhQUFNLENBQUMsb0JBQW9CLENBQUM7OzJEQUFBO0lBUGpDO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1NBQzVCLENBQUM7O21CQUFBO0lBcUNGLGtCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSxtQkFBVyxjQW9DdkIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZnRXZlbnRzfSBmcm9tICcuLi9ldmVudHMvdmctZXZlbnRzJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9SeCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZnQ3VlUG9pbnRzXSdcbn0pXG5leHBvcnQgY2xhc3MgVmdDdWVQb2ludHMge1xuICAgIEBPdXRwdXQoJ29uRW50ZXJDdWVQb2ludCcpIG9uRW50ZXJDdWVQb2ludDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvblVwZGF0ZUN1ZVBvaW50Jykgb25VcGRhdGVDdWVQb2ludDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkV4aXRDdWVQb2ludCcpIG9uRXhpdEN1ZVBvaW50OkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uQ29tcGxldGVDdWVQb2ludCcpIG9uQ29tcGxldGVDdWVQb2ludDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWY6RWxlbWVudFJlZikge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHZhciBvbkxvYWQgPSBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLnJlZi5uYXRpdmVFbGVtZW50LCBWZ0V2ZW50cy5WR19MT0FEKTtcbiAgICAgICAgb25Mb2FkLnN1YnNjcmliZSh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1ZXMgPSBldmVudC50YXJnZXQudHJhY2suY3VlcztcblxuICAgICAgICB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmN1ZXMgPSBjdWVzO1xuXG4gICAgICAgIGZvciAodmFyIGk6bnVtYmVyPTAsIGw6bnVtYmVyPWN1ZXMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9uRW50ZXIgPSBPYnNlcnZhYmxlLmZyb21FdmVudChjdWVzW2ldLCBWZ0V2ZW50cy5WR19FTlRFUik7XG4gICAgICAgICAgICBvbkVudGVyLnN1YnNjcmliZSh0aGlzLm9uRW50ZXIuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHZhciBvbkV4aXQgPSBPYnNlcnZhYmxlLmZyb21FdmVudChjdWVzW2ldLCBWZ0V2ZW50cy5WR19FWElUKTtcbiAgICAgICAgICAgIG9uRXhpdC5zdWJzY3JpYmUodGhpcy5vbkV4aXQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVudGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FbnRlckN1ZVBvaW50Lm5leHQoZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBvbkV4aXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkV4aXRDdWVQb2ludC5uZXh0KGV2ZW50LnRhcmdldCk7XG4gICAgfVxufVxuIl19