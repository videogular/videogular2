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
var vg_states_1 = require("../../states/vg-states");
var VgPlayPause = (function (_super) {
    __extends(VgPlayPause, _super);
    function VgPlayPause(ref, API) {
        _super.call(this, API);
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgPlayPause.prototype.onPlayerReady = function () {
        this.vgFor = this.elem.getAttribute('vg-for');
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgPlayPause.prototype.onClick = function () {
        var state = this.getState();
        switch (state) {
            case vg_states_1.VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case vg_states_1.VgStates.VG_PAUSED:
            case vg_states_1.VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    };
    VgPlayPause.prototype.getState = function () {
        return this.target ? this.target.state : vg_states_1.VgStates.VG_PAUSED;
    };
    VgPlayPause = __decorate([
        core_1.Component({
            selector: 'vg-play-pause',
            host: {
                '(click)': 'onClick()'
            },
            template: "<div class=\"icon\"\n             [class.pause]=\"getState() === 'playing'\"\n             [class.play]=\"getState() === 'paused' || getState() === 'ended'\">\n        </div>",
            styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        :host .icon {\n            pointer-events: none;\n        }\n\n        :host .icon.play:before {\n            content: \"\\e000\";\n        }\n\n        :host .icon.pause:before {\n            content: \"\\e001\";\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgPlayPause);
    return VgPlayPause;
}(vg_abstract_control_1.VgAbstractControl));
exports.VgPlayPause = VgPlayPause;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheS1wYXVzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLXBsYXktcGF1c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQW9DLGVBQWUsQ0FBQyxDQUFBO0FBRXBELHVCQUFvQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzVDLG9DQUFnQyx3QkFBd0IsQ0FBQyxDQUFBO0FBQ3pELDBCQUF1Qix3QkFBd0IsQ0FBQyxDQUFBO0FBMENoRDtJQUFpQywrQkFBaUI7SUFLOUMscUJBQVksR0FBYyxFQUFTLEdBQVM7UUFDeEMsa0JBQU0sR0FBRyxDQUFDLENBQUM7UUFEb0IsUUFBRyxHQUFILEdBQUcsQ0FBTTtRQUV4QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELG1DQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLG9CQUFRLENBQUMsVUFBVTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO1lBRVYsS0FBSyxvQkFBUSxDQUFDLFNBQVMsQ0FBQztZQUN4QixLQUFLLG9CQUFRLENBQUMsUUFBUTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxTQUFTLENBQUM7SUFDaEUsQ0FBQztJQXhFTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLFdBQVc7YUFDekI7WUFDRCxRQUFRLEVBQ0osZ0xBR087WUFDWCxNQUFNLEVBQUUsQ0FBQyxrc0JBNEJSLENBQUM7U0FDTCxDQUFDOzttQkFBQTtJQWtDRixrQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBaUMsdUNBQWlCLEdBaUNqRDtBQWpDWSxtQkFBVyxjQWlDdkIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtWZ0FQSX0gZnJvbSAnLi4vLi4vc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7VmdBYnN0cmFjdENvbnRyb2x9IGZyb20gJy4uL3ZnLWFic3RyYWN0LWNvbnRyb2wnO1xuaW1wb3J0IHtWZ1N0YXRlc30gZnJvbSBcIi4uLy4uL3N0YXRlcy92Zy1zdGF0ZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1wbGF5LXBhdXNlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ29uQ2xpY2soKSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOlxuICAgICAgICBgPGRpdiBjbGFzcz1cImljb25cIlxuICAgICAgICAgICAgIFtjbGFzcy5wYXVzZV09XCJnZXRTdGF0ZSgpID09PSAncGxheWluZydcIlxuICAgICAgICAgICAgIFtjbGFzcy5wbGF5XT1cImdldFN0YXRlKCkgPT09ICdwYXVzZWQnIHx8IGdldFN0YXRlKCkgPT09ICdlbmRlZCdcIj5cbiAgICAgICAgPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgLmljb24ge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCAuaWNvbi5wbGF5OmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiBcIlxcXFxlMDAwXCI7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCAuaWNvbi5wYXVzZTpiZWZvcmUge1xuICAgICAgICAgICAgY29udGVudDogXCJcXFxcZTAwMVwiO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmdQbGF5UGF1c2UgZXh0ZW5kcyBWZ0Fic3RyYWN0Q29udHJvbCB7XG4gICAgZWxlbTpIVE1MRWxlbWVudDtcbiAgICB2Z0ZvcjpzdHJpbmc7XG4gICAgdGFyZ2V0OmFueTtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjpFbGVtZW50UmVmLCBwdWJsaWMgQVBJOlZnQVBJKSB7XG4gICAgICAgIHN1cGVyKEFQSSk7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudmdGb3IgPSB0aGlzLmVsZW0uZ2V0QXR0cmlidXRlKCd2Zy1mb3InKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgVmdTdGF0ZXMuVkdfUExBWUlORzpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFZnU3RhdGVzLlZHX1BBVVNFRDpcbiAgICAgICAgICAgIGNhc2UgVmdTdGF0ZXMuVkdfRU5ERUQ6XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldCA/IHRoaXMudGFyZ2V0LnN0YXRlIDogVmdTdGF0ZXMuVkdfUEFVU0VEO1xuICAgIH1cbn1cbiJdfQ==