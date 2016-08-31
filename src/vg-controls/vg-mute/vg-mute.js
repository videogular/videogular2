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
var VgMute = (function (_super) {
    __extends(VgMute, _super);
    function VgMute(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgMute.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
        this.currentVolume = this.target.volume;
    };
    VgMute.prototype.onClick = function () {
        var volume = this.getVolume();
        if (volume === 0) {
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    };
    VgMute.prototype.getVolume = function () {
        return this.target ? this.target.volume : 0;
    };
    VgMute = __decorate([
        core_1.Component({
            selector: 'vg-mute',
            host: {
                '(click)': 'onClick()'
            },
            template: "<div class=\"icon\"\n             [class.level3]=\"getVolume() >= 0.75\"\n             [class.level2]=\"getVolume() >= 0.5 && getVolume() < 0.75\"\n             [class.level1]=\"getVolume() >= 0.25 && getVolume() < 0.5\"\n             [class.level0]=\"getVolume() > 0 && getVolume() < 0.25\"\n             [class.mute]=\"getVolume() === 0\">\n        </div>",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        :host .icon {\n            pointer-events: none;\n        }\n\n        :host .icon.level3:before {\n            content: \"\\e002\";\n        }\n\n        :host .icon.level2:before {\n            content: \"\\e003\";\n        }\n\n        :host .icon.level1:before {\n            content: \"\\e004\";\n        }\n\n        :host .icon.level0:before {\n            content: \"\\e005\";\n        }\n\n        :host .icon.mute:before {\n            content: \"\\e006\";\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgMute);
    return VgMute;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgMute = VgMute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctbXV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLW11dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBRTNELHVCQUFvQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzVDLG9DQUFnQyx3QkFBd0IsQ0FBQyxDQUFBO0FBeUR6RDtJQUE0QiwwQkFBaUI7SUFRekMsZ0JBQVksR0FBYyxFQUFTLEdBQVM7UUFDeEMsa0JBQU0sR0FBRyxDQUFDLENBQUM7UUFEb0IsUUFBRyxHQUFILEdBQUcsQ0FBTTtRQUV4QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELDhCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDNUMsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQXhGTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLFdBQVc7YUFDekI7WUFDRCxRQUFRLEVBQ0osdVdBTU87WUFDWCxNQUFNLEVBQUUsQ0FBQywrN0JBd0NSLENBQUM7U0FDTCxDQUFDOztjQUFBO0lBbUNGLGFBQUM7QUFBRCxDQUFDLEFBbENELENBQTRCLHVDQUFpQixHQWtDNUM7QUFsQ1ksY0FBTSxTQWtDbEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VmdBUEl9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQge1ZnQWJzdHJhY3RDb250cm9sfSBmcm9tICcuLi92Zy1hYnN0cmFjdC1jb250cm9sJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1tdXRlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ29uQ2xpY2soKSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOlxuICAgICAgICBgPGRpdiBjbGFzcz1cImljb25cIlxuICAgICAgICAgICAgIFtjbGFzcy5sZXZlbDNdPVwiZ2V0Vm9sdW1lKCkgPj0gMC43NVwiXG4gICAgICAgICAgICAgW2NsYXNzLmxldmVsMl09XCJnZXRWb2x1bWUoKSA+PSAwLjUgJiYgZ2V0Vm9sdW1lKCkgPCAwLjc1XCJcbiAgICAgICAgICAgICBbY2xhc3MubGV2ZWwxXT1cImdldFZvbHVtZSgpID49IDAuMjUgJiYgZ2V0Vm9sdW1lKCkgPCAwLjVcIlxuICAgICAgICAgICAgIFtjbGFzcy5sZXZlbDBdPVwiZ2V0Vm9sdW1lKCkgPiAwICYmIGdldFZvbHVtZSgpIDwgMC4yNVwiXG4gICAgICAgICAgICAgW2NsYXNzLm11dGVdPVwiZ2V0Vm9sdW1lKCkgPT09IDBcIj5cbiAgICAgICAgPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgLmljb24ge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCAuaWNvbi5sZXZlbDM6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXFxcXGUwMDJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IC5pY29uLmxldmVsMjpiZWZvcmUge1xuICAgICAgICAgICAgY29udGVudDogXCJcXFxcZTAwM1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgLmljb24ubGV2ZWwxOmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiBcIlxcXFxlMDA0XCI7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCAuaWNvbi5sZXZlbDA6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXFxcXGUwMDVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IC5pY29uLm11dGU6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXFxcXGUwMDZcIjtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIFZnTXV0ZSBleHRlbmRzIFZnQWJzdHJhY3RDb250cm9sIHtcbiAgICBlbGVtOkhUTUxFbGVtZW50O1xuICAgIHZnRm9yOiBzdHJpbmc7XG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICBjdXJyZW50Vm9sdW1lOm51bWJlcjtcblxuXG4gICAgY29uc3RydWN0b3IocmVmOkVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6VmdBUEkpIHtcbiAgICAgICAgc3VwZXIoQVBJKTtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy52Z0ZvciA9IHRoaXMuZWxlbS5nZXRBdHRyaWJ1dGUoJ3ZnLWZvcicpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gdGhpcy50YXJnZXQudm9sdW1lO1xuICAgIH1cblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLmdldFZvbHVtZSgpO1xuXG4gICAgICAgIGlmICh2b2x1bWUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnZvbHVtZSA9IHRoaXMuY3VycmVudFZvbHVtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnZvbHVtZSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWb2x1bWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldCA/IHRoaXMudGFyZ2V0LnZvbHVtZSA6IDA7XG4gICAgfVxufVxuIl19