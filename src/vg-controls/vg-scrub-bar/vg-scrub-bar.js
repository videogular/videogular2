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
var vg_api_1 = require('../../services/vg-api');
var vg_abstract_control_1 = require('../vg-abstract-control');
var VgScrubBar = (function (_super) {
    __extends(VgScrubBar, _super);
    function VgScrubBar(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgScrubBar.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBar.prototype.onMouseDownScrubBar = function ($event) {
        var percentage = $event.offsetX * 100 / this.elem.scrollWidth;
        this.target.seekTime(percentage, true);
    };
    VgScrubBar = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar',
            host: {
                '(mousedown)': 'onMouseDownScrubBar($event)'
            },
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            position: absolute;\n            width: 100%;\n            height: 5px;\n            bottom: 50px;\n            margin: 0;\n            cursor: pointer;\n            align-items: center;\n            background: rgba(0, 0, 0, 0.75);\n            z-index: 250;\n        }\n\n        vg-controls :host {\n            position: relative;\n            bottom: initial;\n            background: initial;\n            height: 50px;\n            flex-grow: 1;\n            flex-basis: 0;\n            margin: 0 10px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgScrubBar);
    return VgScrubBar;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgScrubBar = VgScrubBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctc2NydWItYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUUzRCx1QkFBb0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM1QyxvQ0FBZ0Msd0JBQXdCLENBQUMsQ0FBQTtBQWdDekQ7SUFBZ0MsOEJBQWlCO0lBSzdDLG9CQUFZLEdBQWMsRUFBUyxHQUFTO1FBQ3hDLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRG9CLFFBQUcsR0FBSCxHQUFHLENBQU07UUFFeEMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsd0NBQW1CLEdBQW5CLFVBQW9CLE1BQU07UUFDdEIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFqREw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsSUFBSSxFQUFFO2dCQUNGLGFBQWEsRUFBRSw2QkFBNkI7YUFDL0M7WUFDRCxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLE1BQU0sRUFBRSxDQUFDLCtpQkFzQlIsQ0FBQztTQUNMLENBQUM7O2tCQUFBO0lBcUJGLGlCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFnQyx1Q0FBaUIsR0FvQmhEO0FBcEJZLGtCQUFVLGFBb0J0QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtWZ0FQSX0gZnJvbSAnLi4vLi4vc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7VmdBYnN0cmFjdENvbnRyb2x9IGZyb20gJy4uL3ZnLWFic3RyYWN0LWNvbnRyb2wnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZnLXNjcnViLWJhcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnKG1vdXNlZG93biknOiAnb25Nb3VzZURvd25TY3J1YkJhcigkZXZlbnQpJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBib3R0b206IDUwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjc1KTtcbiAgICAgICAgICAgIHotaW5kZXg6IDI1MDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLWNvbnRyb2xzIDpob3N0IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGJvdHRvbTogaW5pdGlhbDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGluaXRpYWw7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICBmbGV4LWJhc2lzOiAwO1xuICAgICAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1NjcnViQmFyIGV4dGVuZHMgVmdBYnN0cmFjdENvbnRyb2wge1xuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIHZnRm9yOiBzdHJpbmc7XG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6RWxlbWVudFJlZiwgcHVibGljIEFQSTpWZ0FQSSkge1xuICAgICAgICBzdXBlcihBUEkpO1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnZnRm9yID0gdGhpcy5lbGVtLmdldEF0dHJpYnV0ZSgndmctZm9yJyk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duU2NydWJCYXIoJGV2ZW50KSB7XG4gICAgICAgIHZhciBwZXJjZW50YWdlID0gJGV2ZW50Lm9mZnNldFggKiAxMDAgLyB0aGlzLmVsZW0uc2Nyb2xsV2lkdGg7XG5cbiAgICAgICAgdGhpcy50YXJnZXQuc2Vla1RpbWUocGVyY2VudGFnZSwgdHJ1ZSk7XG4gICAgfVxufVxuIl19