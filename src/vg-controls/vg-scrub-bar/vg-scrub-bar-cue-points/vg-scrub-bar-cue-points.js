"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var vg_api_1 = require("../../../services/vg-api");
var vg_abstract_control_1 = require('../../vg-abstract-control');
var VgScrubBarCuePoints = (function (_super) {
    __extends(VgScrubBarCuePoints, _super);
    function VgScrubBarCuePoints(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.onLoadedMetadataCalled = false;
        this.elem = ref.nativeElement;
    }
    VgScrubBarCuePoints.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        var onTimeUpdate = this.target.subscriptions.loadedMetadata;
        onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this));
        if (this.onLoadedMetadataCalled) {
            this.onLoadedMetadata();
        }
    };
    VgScrubBarCuePoints.prototype.onLoadedMetadata = function () {
        if (this.cuePoints) {
            for (var i = 0, l = this.cuePoints.length; i < l; i++) {
                var end = (this.cuePoints[i].endTime >= 0) ? this.cuePoints[i].endTime : this.cuePoints[i].startTime + 1;
                var cuePointDuration = (end - this.cuePoints[i].startTime) * 1000;
                var position = '0';
                var percentWidth = '0';
                if (typeof cuePointDuration === 'number' && this.target.time.total) {
                    percentWidth = ((cuePointDuration * 100) / this.target.time.total) + "%";
                    position = (this.cuePoints[i].startTime * 100 / (Math.round(this.target.time.total / 1000))) + "%";
                }
                this.cuePoints[i].$$style = {
                    width: percentWidth,
                    left: position
                };
            }
        }
    };
    VgScrubBarCuePoints.prototype.ngOnChanges = function (changes) {
        if (changes['cuePoints'].currentValue) {
            if (!this.target) {
                this.onLoadedMetadataCalled = true;
                return;
            }
            this.onLoadedMetadata();
        }
    };
    __decorate([
        core_1.Input('cuePoints'), 
        __metadata('design:type', TextTrackCueList)
    ], VgScrubBarCuePoints.prototype, "cuePoints", void 0);
    VgScrubBarCuePoints = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar-cue-points',
            template: "\n        <div class=\"cue-point-container\">\n            <span *ngFor=\"let cp of cuePoints\" [style.width]=\"cp.$$style?.width\" [style.left]=\"cp.$$style?.left\" class=\"cue-point\"></span>\n        </div>\n        ",
            styles: ["\n        :host {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        :host .cue-point-container .cue-point {\n            position: absolute;\n            height: 5px;\n            background-color: rgba(255, 204, 0, 0.7);\n        }\n\n        vg-controls :host {\n            position: absolute;\n            top: calc(50% - 3px);\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgScrubBarCuePoints);
    return VgScrubBarCuePoints;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgScrubBarCuePoints = VgScrubBarCuePoints;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWN1ZS1wb2ludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1zY3J1Yi1iYXItY3VlLXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBb0UsZUFBZSxDQUFDLENBQUE7QUFDcEYsdUJBQW9CLDBCQUEwQixDQUFDLENBQUE7QUFDL0Msb0NBQWdDLDJCQUEyQixDQUFDLENBQUE7QUE4QjVEO0lBQXlDLHVDQUFpQjtJQVF0RCw2QkFBWSxHQUFjLEVBQVMsR0FBUztRQUN4QyxrQkFBTSxHQUFHLENBQUMsQ0FBQztRQURvQixRQUFHLEdBQUgsR0FBRyxDQUFNO1FBSjVDLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQU1wQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELDJDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUM1RCxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6RCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBRUQsOENBQWdCLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3BELElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RyxJQUFJLGdCQUFnQixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNsRSxJQUFJLFFBQVEsR0FBVSxHQUFHLENBQUM7Z0JBQzFCLElBQUksWUFBWSxHQUFVLEdBQUcsQ0FBQztnQkFFOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDakUsWUFBWSxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ3pFLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZHLENBQUM7Z0JBRUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxPQUFPLEdBQUc7b0JBQy9CLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDakIsQ0FBQztZQUNOLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxPQUEyQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQyxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQWhERDtRQUFDLFlBQUssQ0FBQyxXQUFXLENBQUM7OzBEQUFBO0lBbEN2QjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSw2TkFJTDtZQUNMLE1BQU0sRUFBRSxDQUFDLHNkQW1CUixDQUFDO1NBQ0wsQ0FBQzs7MkJBQUE7SUF3REYsMEJBQUM7QUFBRCxDQUFDLEFBdkRELENBQXlDLHVDQUFpQixHQXVEekQ7QUF2RFksMkJBQW1CLHNCQXVEL0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2V9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQge1ZnQWJzdHJhY3RDb250cm9sfSBmcm9tICcuLi8uLi92Zy1hYnN0cmFjdC1jb250cm9sJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1zY3J1Yi1iYXItY3VlLXBvaW50cycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImN1ZS1wb2ludC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBjcCBvZiBjdWVQb2ludHNcIiBbc3R5bGUud2lkdGhdPVwiY3AuJCRzdHlsZT8ud2lkdGhcIiBbc3R5bGUubGVmdF09XCJjcC4kJHN0eWxlPy5sZWZ0XCIgY2xhc3M9XCJjdWUtcG9pbnRcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IC5jdWUtcG9pbnQtY29udGFpbmVyIC5jdWUtcG9pbnQge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjA0LCAwLCAwLjcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMgOmhvc3Qge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiBjYWxjKDUwJSAtIDNweCk7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1NjcnViQmFyQ3VlUG9pbnRzIGV4dGVuZHMgVmdBYnN0cmFjdENvbnRyb2wgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIGVsZW06SFRNTEVsZW1lbnQ7XG4gICAgdmdGb3I6IHN0cmluZztcbiAgICB0YXJnZXQ6IGFueTtcbiAgICBvbkxvYWRlZE1ldGFkYXRhQ2FsbGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoJ2N1ZVBvaW50cycpIGN1ZVBvaW50czpUZXh0VHJhY2tDdWVMaXN0O1xuXG4gICAgY29uc3RydWN0b3IocmVmOkVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6VmdBUEkpIHtcbiAgICAgICAgc3VwZXIoQVBJKTtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy52Z0ZvciA9IHRoaXMuZWxlbS5nZXRBdHRyaWJ1dGUoJ3ZnLWZvcicpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcblxuICAgICAgICB2YXIgb25UaW1lVXBkYXRlID0gdGhpcy50YXJnZXQuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YTtcbiAgICAgICAgb25UaW1lVXBkYXRlLnN1YnNjcmliZSh0aGlzLm9uTG9hZGVkTWV0YWRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm9uTG9hZGVkTWV0YWRhdGFDYWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Mb2FkZWRNZXRhZGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkZWRNZXRhZGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VlUG9pbnRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuY3VlUG9pbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSAodGhpcy5jdWVQb2ludHNbaV0uZW5kVGltZSA+PSAwKSA/IHRoaXMuY3VlUG9pbnRzW2ldLmVuZFRpbWUgOiB0aGlzLmN1ZVBvaW50c1tpXS5zdGFydFRpbWUgKyAxO1xuICAgICAgICAgICAgICAgIHZhciBjdWVQb2ludER1cmF0aW9uID0gKGVuZCAtIHRoaXMuY3VlUG9pbnRzW2ldLnN0YXJ0VGltZSkgKiAxMDAwO1xuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbjpzdHJpbmcgPSAnMCc7XG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnRXaWR0aDpzdHJpbmcgPSAnMCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1ZVBvaW50RHVyYXRpb24gPT09ICdudW1iZXInICYmIHRoaXMudGFyZ2V0LnRpbWUudG90YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudFdpZHRoID0gKChjdWVQb2ludER1cmF0aW9uICogMTAwKSAvIHRoaXMudGFyZ2V0LnRpbWUudG90YWwpICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gKHRoaXMuY3VlUG9pbnRzW2ldLnN0YXJ0VGltZSAqIDEwMCAvIChNYXRoLnJvdW5kKHRoaXMudGFyZ2V0LnRpbWUudG90YWwgLyAxMDAwKSkpICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgKDxhbnk+dGhpcy5jdWVQb2ludHNbaV0pLiQkc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBwZXJjZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2N1ZVBvaW50cyddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgaWYoIXRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRlZE1ldGFkYXRhQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uTG9hZGVkTWV0YWRhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==