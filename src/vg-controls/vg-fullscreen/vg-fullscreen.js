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
var vg_fullscreen_api_1 = require("../../services/vg-fullscreen-api");
var vg_abstract_control_1 = require('../vg-abstract-control');
var VgFullscreen = (function (_super) {
    __extends(VgFullscreen, _super);
    function VgFullscreen(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.elem = ref.nativeElement;
        this.fsAPI = vg_fullscreen_api_1.VgFullscreenAPI;
    }
    VgFullscreen.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgFullscreen.prototype.onClick = function () {
        var element = this.target;
        if (this.target instanceof vg_api_1.VgAPI) {
            element = null;
        }
        vg_fullscreen_api_1.VgFullscreenAPI.toggleFullscreen(element);
    };
    VgFullscreen = __decorate([
        core_1.Component({
            selector: 'vg-fullscreen',
            host: {
                '(click)': 'onClick()'
            },
            template: "<div class=\"icon\"\n             [class.normal]=\"!fsAPI.isFullscreen\"\n             [class.fullscreen]=\"fsAPI.isFullscreen\">\n        </div>",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        :host .icon {\n            pointer-events: none;\n        }\n\n        :host .icon.normal:before {\n            content: \"\\e007\";\n        }\n\n        :host .icon.fullscreen:before {\n            content: \"\\e008\";\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgFullscreen);
    return VgFullscreen;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgFullscreen = VgFullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWZ1bGxzY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBRTNELHVCQUFvQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzVDLGtDQUE4QixrQ0FBa0MsQ0FBQyxDQUFBO0FBQ2pFLG9DQUFnQyx3QkFBd0IsQ0FBQyxDQUFBO0FBMEN6RDtJQUFrQyxnQ0FBaUI7SUFNL0Msc0JBQVksR0FBYyxFQUFTLEdBQVM7UUFDeEMsa0JBQU0sR0FBRyxDQUFDLENBQUM7UUFEb0IsUUFBRyxHQUFILEdBQUcsQ0FBTTtRQUV4QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxtQ0FBZSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsOEJBQU8sR0FBUDtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWSxjQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztRQUVELG1DQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQWpFTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLFdBQVc7YUFDekI7WUFDRCxRQUFRLEVBQ0osbUpBR087WUFDWCxNQUFNLEVBQUUsQ0FBQyx5c0JBNEJSLENBQUM7U0FDTCxDQUFDOztvQkFBQTtJQTJCRixtQkFBQztBQUFELENBQUMsQUExQkQsQ0FBa0MsdUNBQWlCLEdBMEJsRDtBQTFCWSxvQkFBWSxlQTBCeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VmdBUEl9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQge1ZnRnVsbHNjcmVlbkFQSX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpXCI7XG5pbXBvcnQge1ZnQWJzdHJhY3RDb250cm9sfSBmcm9tICcuLi92Zy1hYnN0cmFjdC1jb250cm9sJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1mdWxsc2NyZWVuJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ29uQ2xpY2soKSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOlxuICAgICAgICBgPGRpdiBjbGFzcz1cImljb25cIlxuICAgICAgICAgICAgIFtjbGFzcy5ub3JtYWxdPVwiIWZzQVBJLmlzRnVsbHNjcmVlblwiXG4gICAgICAgICAgICAgW2NsYXNzLmZ1bGxzY3JlZW5dPVwiZnNBUEkuaXNGdWxsc2NyZWVuXCI+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IC5pY29uIHtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgLmljb24ubm9ybWFsOmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiBcIlxcXFxlMDA3XCI7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCAuaWNvbi5mdWxsc2NyZWVuOmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiBcIlxcXFxlMDA4XCI7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ0Z1bGxzY3JlZW4gZXh0ZW5kcyBWZ0Fic3RyYWN0Q29udHJvbCB7XG4gICAgZWxlbTpIVE1MRWxlbWVudDtcbiAgICB2Z0ZvcjpzdHJpbmc7XG4gICAgdGFyZ2V0Ok9iamVjdDtcbiAgICBmc0FQSTpWZ0Z1bGxzY3JlZW5BUEk7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6RWxlbWVudFJlZiwgcHVibGljIEFQSTpWZ0FQSSkge1xuICAgICAgICBzdXBlcihBUEkpO1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5mc0FQSSA9IFZnRnVsbHNjcmVlbkFQSTtcbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnZnRm9yID0gdGhpcy5lbGVtLmdldEF0dHJpYnV0ZSgndmctZm9yJyk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgVmdBUEkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgVmdGdWxsc2NyZWVuQVBJLnRvZ2dsZUZ1bGxzY3JlZW4oZWxlbWVudCk7XG4gICAgfVxufVxuIl19