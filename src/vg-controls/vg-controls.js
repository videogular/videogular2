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
var vg_api_1 = require("../services/vg-api");
var VgControls = (function () {
    function VgControls(api, element, renderer) {
        this.api = api;
        this.element = element;
        this.renderer = renderer;
        this.autohide = false;
        this.autohideTime = 3;
    }
    VgControls.prototype.ngOnInit = function () {
        var mouseEnter = Observable_1.Observable.fromEvent(this.api.videogularElement, 'mouseenter');
        mouseEnter.subscribe(this.show.bind(this));
        var mouseLeave = Observable_1.Observable.fromEvent(this.api.videogularElement, 'mouseleave');
        mouseLeave.subscribe(this.hide.bind(this));
    };
    VgControls.prototype.ngAfterViewInit = function () {
        if (this.autohide) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    VgControls.prototype.hide = function () {
        if (this.autohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    };
    VgControls.prototype.show = function () {
        clearTimeout(this.timer);
        this.renderer.setElementClass(this.element.nativeElement, 'hide', false);
    };
    VgControls.prototype.hideAsync = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.renderer.setElementClass(_this.element.nativeElement, 'hide', true);
        }, this.autohideTime * 1000);
    };
    __decorate([
        core_1.Input('autohide'), 
        __metadata('design:type', Boolean)
    ], VgControls.prototype, "autohide", void 0);
    __decorate([
        core_1.Input('autohide-time'), 
        __metadata('design:type', Number)
    ], VgControls.prototype, "autohideTime", void 0);
    VgControls = __decorate([
        core_1.Component({
            selector: 'vg-controls',
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            position: absolute;\n            display: flex;\n            width: 100%;\n            height: 50px;\n            z-index: 300;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, 0.5);\n            -webkit-transition: bottom 1s;\n            -khtml-transition: bottom 1s;\n            -moz-transition: bottom 1s;\n            -ms-transition: bottom 1s;\n            transition: bottom 1s;\n        }\n\n        :host.hide {\n          bottom: -50px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [vg_api_1.VgAPI, core_1.ElementRef, core_1.Renderer])
    ], VgControls);
    return VgControls;
}());
exports.VgControls = VgControls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1jb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZELGVBQWUsQ0FBQyxDQUFBO0FBQzdFLDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLHVCQUFvQixvQkFBb0IsQ0FBQyxDQUFBO0FBMEJ6QztJQU9JLG9CQUFvQixHQUFTLEVBQVUsT0FBa0IsRUFBVSxRQUFpQjtRQUFoRSxRQUFHLEdBQUgsR0FBRyxDQUFNO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVM7UUFMakUsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFVLENBQUMsQ0FBQztJQU1oRCxDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUNJLElBQUksVUFBVSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEYsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksVUFBVSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEYsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxvQ0FBZSxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUFJLEdBQUo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUFJLEdBQUo7UUFDSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sOEJBQVMsR0FBakI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBMUNEO1FBQUMsWUFBSyxDQUFDLFVBQVUsQ0FBQzs7Z0RBQUE7SUFDbEI7UUFBQyxZQUFLLENBQUMsZUFBZSxDQUFDOztvREFBQTtJQTNCM0I7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxNQUFNLEVBQUUsQ0FBQyxxZ0JBbUJSLENBQUM7U0FDTCxDQUFDOztrQkFBQTtJQThDRixpQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksa0JBQVUsYUE2Q3RCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRWxlbWVudFJlZiwgUmVuZGVyZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vc2VydmljZXMvdmctYXBpXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctY29udHJvbHMnLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB6LWluZGV4OiAzMDA7XG4gICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgICAgIC1raHRtbC10cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgICAgICAtbW96LXRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgICAgIC1tcy10cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdC5oaWRlIHtcbiAgICAgICAgICBib3R0b206IC01MHB4O1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmdDb250cm9scyB7XG5cbiAgICBASW5wdXQoJ2F1dG9oaWRlJykgYXV0b2hpZGU6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgnYXV0b2hpZGUtdGltZScpIGF1dG9oaWRlVGltZTpudW1iZXIgPSAzO1xuXG4gICAgcHJpdmF0ZSB0aW1lcjpudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTpWZ0FQSSwgcHJpdmF0ZSBlbGVtZW50OkVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB2YXIgbW91c2VFbnRlciA9IE9ic2VydmFibGUuZnJvbUV2ZW50KHRoaXMuYXBpLnZpZGVvZ3VsYXJFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgICBtb3VzZUVudGVyLnN1YnNjcmliZSh0aGlzLnNob3cuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdmFyIG1vdXNlTGVhdmUgPSBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLmFwaS52aWRlb2d1bGFyRWxlbWVudCwgJ21vdXNlbGVhdmUnKTtcbiAgICAgICAgbW91c2VMZWF2ZS5zdWJzY3JpYmUodGhpcy5oaWRlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2hpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvaGlkZSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgICAgdGhpcy5oaWRlQXN5bmMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdoaWRlJywgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUFzeW5jKCkge1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2hpZGUnLCB0cnVlKTtcbiAgICAgICAgfSwgdGhpcy5hdXRvaGlkZVRpbWUgKiAxMDAwKTtcbiAgICB9XG59XG4iXX0=