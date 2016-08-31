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
var core_1 = require('@angular/core');
var vg_api_1 = require('../../../services/vg-api');
var vg_abstract_control_1 = require('../../vg-abstract-control');
var VgScrubBarBufferingTime = (function (_super) {
    __extends(VgScrubBarBufferingTime, _super);
    function VgScrubBarBufferingTime(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgScrubBarBufferingTime.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBarBufferingTime.prototype.getBufferTime = function () {
        var bufferTime = "0%";
        if (this.target && this.target.buffer && this.target.buffered.length) {
            bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
        }
        return bufferTime;
    };
    VgScrubBarBufferingTime = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar-buffering-time',
            template: "<div class=\"background\" [style.width]=\"getBufferTime()\"></div>",
            styles: ["\n        :host {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        :host .background {\n            background-color: rgba(255, 255, 255, 0.3);\n        }\n\n        vg-controls :host {\n            position: absolute;\n            top: calc(50% - 3px);\n        }\n\n        vg-controls :host .background {\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgScrubBarBufferingTime);
    return VgScrubBarBufferingTime;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgScrubBarBufferingTime = VgScrubBarBufferingTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUUzRCx1QkFBb0IsMEJBQTBCLENBQUMsQ0FBQTtBQUMvQyxvQ0FBZ0MsMkJBQTJCLENBQUMsQ0FBQTtBQThCNUQ7SUFBNkMsMkNBQWlCO0lBSzFELGlDQUFZLEdBQWMsRUFBUyxHQUFTO1FBQ3hDLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRG9CLFFBQUcsR0FBSCxHQUFHLENBQU07UUFFeEMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsK0NBQWEsR0FBYjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUV0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkUsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2pGLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFuREw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxRQUFRLEVBQUUsb0VBQWdFO1lBQzFFLE1BQU0sRUFBRSxDQUFDLCtpQkF1QlIsQ0FBQztTQUNMLENBQUM7OytCQUFBO0lBeUJGLDhCQUFDO0FBQUQsQ0FBQyxBQXhCRCxDQUE2Qyx1Q0FBaUIsR0F3QjdEO0FBeEJZLCtCQUF1QiwwQkF3Qm5DLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1ZnQVBJfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHtWZ0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnLi4vLi4vdmctYWJzdHJhY3QtY29udHJvbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgW3N0eWxlLndpZHRoXT1cImdldEJ1ZmZlclRpbWUoKVwiPjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDVweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgLmJhY2tncm91bmQge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMgOmhvc3Qge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiBjYWxjKDUwJSAtIDNweCk7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1jb250cm9scyA6aG9zdCAuYmFja2dyb3VuZCB7XG4gICAgICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgIC1tb3otYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWUgZXh0ZW5kcyBWZ0Fic3RyYWN0Q29udHJvbCB7XG4gICAgZWxlbTpIVE1MRWxlbWVudDtcbiAgICB2Z0Zvcjogc3RyaW5nO1xuICAgIHRhcmdldDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocmVmOkVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6VmdBUEkpIHtcbiAgICAgICAgc3VwZXIoQVBJKTtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy52Z0ZvciA9IHRoaXMuZWxlbS5nZXRBdHRyaWJ1dGUoJ3ZnLWZvcicpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICB9XG5cbiAgICBnZXRCdWZmZXJUaW1lKCkge1xuICAgICAgICB2YXIgYnVmZmVyVGltZSA9IFwiMCVcIjtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQuYnVmZmVyICYmIHRoaXMudGFyZ2V0LmJ1ZmZlcmVkLmxlbmd0aCkge1xuICAgICAgICAgICAgYnVmZmVyVGltZSA9ICgodGhpcy50YXJnZXQuYnVmZmVyLmVuZCAvIHRoaXMudGFyZ2V0LnRpbWUudG90YWwpICogMTAwKSArICclJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBidWZmZXJUaW1lO1xuICAgIH1cbn1cbiJdfQ==