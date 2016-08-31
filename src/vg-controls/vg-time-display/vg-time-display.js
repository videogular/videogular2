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
var VgTimeDisplay = (function (_super) {
    __extends(VgTimeDisplay, _super);
    function VgTimeDisplay(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.property = 'current';
        this.format = 'mm:ss';
        this.elem = ref.nativeElement;
    }
    VgTimeDisplay.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgTimeDisplay.prototype.getTime = function () {
        var t = 0;
        if (this.target) {
            t = Math.round(this.target.time[this.property]);
            t = isNaN(t) ? 0 : t;
        }
        return t;
    };
    __decorate([
        core_1.Input('property'), 
        __metadata('design:type', String)
    ], VgTimeDisplay.prototype, "property", void 0);
    __decorate([
        core_1.Input('format'), 
        __metadata('design:type', String)
    ], VgTimeDisplay.prototype, "format", void 0);
    VgTimeDisplay = __decorate([
        core_1.Component({
            selector: 'vg-time-display',
            template: "\n        <span>{{ getTime() | date:format }}</span>\n        <ng-content></ng-content>\n    ",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 60px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n            pointer-events: none;\n            font-family: Helvetica Neue, Helvetica, Arial;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgTimeDisplay);
    return VgTimeDisplay;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgTimeDisplay = VgTimeDisplay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdGltZS1kaXNwbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctdGltZS1kaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUUzRCx1QkFBb0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM1QyxvQ0FBZ0Msd0JBQXdCLENBQUMsQ0FBQTtBQTRCekQ7SUFBbUMsaUNBQWlCO0lBUWhELHVCQUFZLEdBQWMsRUFBUyxHQUFTO1FBQ3hDLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRG9CLFFBQUcsR0FBSCxHQUFHLENBQU07UUFIekIsYUFBUSxHQUFVLFNBQVMsQ0FBQztRQUM5QixXQUFNLEdBQVUsT0FBTyxDQUFDO1FBSXJDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRUQscUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFwQkQ7UUFBQyxZQUFLLENBQUMsVUFBVSxDQUFDOzttREFBQTtJQUNsQjtRQUFDLFlBQUssQ0FBQyxRQUFRLENBQUM7O2lEQUFBO0lBaENwQjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSwrRkFHVDtZQUNELE1BQU0sRUFBRSxDQUFDLHFqQkFrQlIsQ0FBQztTQUNMLENBQUM7O3FCQUFBO0lBMkJGLG9CQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUFtQyx1Q0FBaUIsR0EwQm5EO0FBMUJZLHFCQUFhLGdCQTBCekIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VmdBUEl9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQge1ZnQWJzdHJhY3RDb250cm9sfSBmcm9tICcuLi92Zy1hYnN0cmFjdC1jb250cm9sJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy10aW1lLWRpc3BsYXknLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuPnt7IGdldFRpbWUoKSB8IGRhdGU6Zm9ybWF0IH19PC9zcGFuPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogNjBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICBmb250LWZhbWlseTogSGVsdmV0aWNhIE5ldWUsIEhlbHZldGljYSwgQXJpYWw7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1RpbWVEaXNwbGF5IGV4dGVuZHMgVmdBYnN0cmFjdENvbnRyb2wge1xuICAgIGVsZW06SFRNTEVsZW1lbnQ7XG4gICAgdmdGb3I6IHN0cmluZztcbiAgICB0YXJnZXQ6IGFueTtcblxuICAgIEBJbnB1dCgncHJvcGVydHknKSBwcm9wZXJ0eTpzdHJpbmcgPSAnY3VycmVudCc7XG4gICAgQElucHV0KCdmb3JtYXQnKSBmb3JtYXQ6c3RyaW5nID0gJ21tOnNzJztcblxuICAgIGNvbnN0cnVjdG9yKHJlZjpFbGVtZW50UmVmLCBwdWJsaWMgQVBJOlZnQVBJKSB7XG4gICAgICAgIHN1cGVyKEFQSSk7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudmdGb3IgPSB0aGlzLmVsZW0uZ2V0QXR0cmlidXRlKCd2Zy1mb3InKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgZ2V0VGltZSgpIHtcbiAgICAgICAgbGV0IHQgPSAwO1xuICAgICAgICBpZih0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdCA9IE1hdGgucm91bmQodGhpcy50YXJnZXQudGltZVt0aGlzLnByb3BlcnR5XSlcbiAgICAgICAgICAgIHQgPSBpc05hTih0KSA/IDAgOiB0O1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG59XG4iXX0=