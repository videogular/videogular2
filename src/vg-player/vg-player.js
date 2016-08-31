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
var vg_api_1 = require("../services/vg-api");
var vg_fullscreen_api_1 = require("../services/vg-fullscreen-api");
var vg_utils_1 = require("../services/vg-utils");
var vg_media_1 = require("../vg-media/vg-media");
var VgPlayer = (function () {
    function VgPlayer(ref, api) {
        this.isFullscreen = false;
        this.onPlayerReady = new core_1.EventEmitter();
        this.onMediaReady = new core_1.EventEmitter();
        this.api = api;
        this.elem = ref.nativeElement;
        this.api.registerElement(this.elem);
    }
    VgPlayer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.medias.toArray().forEach(function (media) {
            _this.api.registerMedia(media);
        });
        this.api.onPlayerReady();
        this.onPlayerReady.next(this.api);
        vg_fullscreen_api_1.VgFullscreenAPI.init(this.elem, this.medias);
        vg_fullscreen_api_1.VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    };
    VgPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (!vg_fullscreen_api_1.VgFullscreenAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? vg_utils_1.VgUtils.getZIndex().toString() : 'auto';
        }
    };
    __decorate([
        core_1.HostBinding('class.fullscreen'), 
        __metadata('design:type', Boolean)
    ], VgPlayer.prototype, "isFullscreen", void 0);
    __decorate([
        core_1.HostBinding('style.z-index'), 
        __metadata('design:type', String)
    ], VgPlayer.prototype, "zIndex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], VgPlayer.prototype, "onPlayerReady", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], VgPlayer.prototype, "onMediaReady", void 0);
    __decorate([
        core_1.ContentChildren(vg_media_1.VgMedia), 
        __metadata('design:type', core_1.QueryList)
    ], VgPlayer.prototype, "medias", void 0);
    VgPlayer = __decorate([
        core_1.Component({
            selector: 'vg-player',
            directives: [vg_media_1.VgMedia],
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            font-family: 'videogular';\n            position: relative;\n            display: flex;\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            background-color: black;\n        }\n\n        :host video {\n            width: 100%;\n            height: 100%;\n        }\n\n        :host.fullscreen {\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgPlayer);
    return VgPlayer;
}());
exports.VgPlayer = VgPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFTTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFBb0Isb0JBQW9CLENBQUMsQ0FBQTtBQUN6QyxrQ0FBOEIsK0JBQStCLENBQUMsQ0FBQTtBQUM5RCx5QkFBc0Isc0JBQXNCLENBQUMsQ0FBQTtBQUM3Qyx5QkFBc0Isc0JBQXNCLENBQUMsQ0FBQTtBQTZCN0M7SUFnQkksa0JBQVksR0FBZSxFQUFFLEdBQVU7UUFaTixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUkvRCxrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUd0RCxpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU1qRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHFDQUFrQixHQUFsQjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsbUNBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsT0FBTztRQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLG1DQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLGtCQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BFLENBQUM7SUFDTCxDQUFDO0lBcENEO1FBQUMsa0JBQVcsQ0FBQyxrQkFBa0IsQ0FBQzs7a0RBQUE7SUFDaEM7UUFBQyxrQkFBVyxDQUFDLGVBQWUsQ0FBQzs7NENBQUE7SUFFN0I7UUFBQyxhQUFNLEVBQUU7O21EQUFBO0lBR1Q7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBR1Q7UUFBQyxzQkFBZSxDQUFDLGtCQUFPLENBQUM7OzRDQUFBO0lBeEM3QjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixVQUFVLEVBQUUsQ0FBQyxrQkFBTyxDQUFDO1lBQ3JCLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsTUFBTSxFQUFFLENBQUMsOGNBcUJSLENBQUM7U0FDTCxDQUFDOztnQkFBQTtJQTBDRixlQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxnQkFBUSxXQXlDcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgT3V0cHV0LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBRdWVyeUxpc3QsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250ZW50Q2hpbGRyZW5cbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmdBUEl9IGZyb20gXCIuLi9zZXJ2aWNlcy92Zy1hcGlcIjtcbmltcG9ydCB7VmdGdWxsc2NyZWVuQVBJfSBmcm9tIFwiLi4vc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGlcIjtcbmltcG9ydCB7VmdVdGlsc30gZnJvbSBcIi4uL3NlcnZpY2VzL3ZnLXV0aWxzXCI7XG5pbXBvcnQge1ZnTWVkaWF9IGZyb20gXCIuLi92Zy1tZWRpYS92Zy1tZWRpYVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZnLXBsYXllcicsXG4gICAgZGlyZWN0aXZlczogW1ZnTWVkaWFdLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ3ZpZGVvZ3VsYXInO1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgdmlkZW8ge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdC5mdWxsc2NyZWVuIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1BsYXllciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIGFwaTogVmdBUEk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZ1bGxzY3JlZW4nKSBpc0Z1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLnotaW5kZXgnKSB6SW5kZXg6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uUGxheWVyUmVhZHk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25NZWRpYVJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oVmdNZWRpYSlcbiAgICBtZWRpYXM6IFF1ZXJ5TGlzdDxWZ01lZGlhPjtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgYXBpOiBWZ0FQSSkge1xuICAgICAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5hcGkucmVnaXN0ZXJFbGVtZW50KHRoaXMuZWxlbSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLm1lZGlhcy50b0FycmF5KCkuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBpLnJlZ2lzdGVyTWVkaWEobWVkaWEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwaS5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeS5uZXh0KHRoaXMuYXBpKTtcblxuICAgICAgICBWZ0Z1bGxzY3JlZW5BUEkuaW5pdCh0aGlzLmVsZW0sIHRoaXMubWVkaWFzKTtcbiAgICAgICAgVmdGdWxsc2NyZWVuQVBJLm9uQ2hhbmdlRnVsbHNjcmVlbi5zdWJzY3JpYmUodGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VGdWxsc2NyZWVuKGZzU3RhdGUpIHtcbiAgICAgICAgaWYgKCFWZ0Z1bGxzY3JlZW5BUEkubmF0aXZlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPSBmc1N0YXRlO1xuICAgICAgICAgICAgdGhpcy56SW5kZXggPSBmc1N0YXRlID8gVmdVdGlscy5nZXRaSW5kZXgoKS50b1N0cmluZygpIDogJ2F1dG8nO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19