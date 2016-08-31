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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var vg_player_1 = require('./src/vg-player/vg-player');
var vg_media_1 = require('./src/vg-media/vg-media');
var vg_cue_points_1 = require('./src/vg-cue-points/vg-cue-points');
var vg_api_1 = require('./src/services/vg-api');
var vg_fullscreen_api_1 = require('./src/services/vg-fullscreen-api');
var vg_utils_1 = require('./src/services/vg-utils');
var vg_events_1 = require('./src/events/vg-events');
var vg_states_1 = require('./src/states/vg-states');
__export(require('./src/services/vg-api'));
__export(require('./src/services/vg-fullscreen-api'));
__export(require('./src/services/vg-utils'));
__export(require('./src/events/vg-events'));
__export(require('./src/states/vg-states'));
var VgCore = (function () {
    function VgCore() {
    }
    VgCore = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints],
            providers: [vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_utils_1.VgUtils, vg_events_1.VgEvents, vg_states_1.VgStates],
            exports: [vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints]
        }), 
        __metadata('design:paramtypes', [])
    ], VgCore);
    return VgCore;
}());
exports.VgCore = VgCore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUM5Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUUvQywwQkFBdUIsMkJBQTJCLENBQUMsQ0FBQTtBQUNuRCx5QkFBc0IseUJBQXlCLENBQUMsQ0FBQTtBQUNoRCw4QkFBMEIsbUNBQW1DLENBQUMsQ0FBQTtBQUM5RCx1QkFBb0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM1QyxrQ0FBOEIsa0NBQWtDLENBQUMsQ0FBQTtBQUNqRSx5QkFBc0IseUJBQXlCLENBQUMsQ0FBQTtBQUNoRCwwQkFBdUIsd0JBQXdCLENBQUMsQ0FBQTtBQUNoRCwwQkFBdUIsd0JBQXdCLENBQUMsQ0FBQTtBQUVoRCxpQkFBYyx1QkFBdUIsQ0FBQyxFQUFBO0FBQ3RDLGlCQUFjLGtDQUFrQyxDQUFDLEVBQUE7QUFDakQsaUJBQWMseUJBQXlCLENBQUMsRUFBQTtBQUN4QyxpQkFBYyx3QkFBd0IsQ0FBQyxFQUFBO0FBQ3ZDLGlCQUFjLHdCQUF3QixDQUFDLEVBQUE7QUFRdkM7SUFBQTtJQUFxQixDQUFDO0lBTnRCO1FBQUMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBRTtZQUN6QixZQUFZLEVBQUUsQ0FBRSxvQkFBUSxFQUFFLGtCQUFPLEVBQUUsMkJBQVcsQ0FBRTtZQUNoRCxTQUFTLEVBQUUsQ0FBRSxjQUFLLEVBQUUsbUNBQWUsRUFBRSxrQkFBTyxFQUFFLG9CQUFRLEVBQUUsb0JBQVEsQ0FBRTtZQUNsRSxPQUFPLEVBQUUsQ0FBRSxvQkFBUSxFQUFFLGtCQUFPLEVBQUUsMkJBQVcsQ0FBRTtTQUM5QyxDQUFDOztjQUFBO0lBQ21CLGFBQUM7QUFBRCxDQUFDLEFBQXRCLElBQXNCO0FBQVQsY0FBTSxTQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1ZnUGxheWVyfSBmcm9tICcuL3NyYy92Zy1wbGF5ZXIvdmctcGxheWVyJztcbmltcG9ydCB7VmdNZWRpYX0gZnJvbSAnLi9zcmMvdmctbWVkaWEvdmctbWVkaWEnO1xuaW1wb3J0IHtWZ0N1ZVBvaW50c30gZnJvbSAnLi9zcmMvdmctY3VlLXBvaW50cy92Zy1jdWUtcG9pbnRzJztcbmltcG9ydCB7VmdBUEl9IGZyb20gJy4vc3JjL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQge1ZnRnVsbHNjcmVlbkFQSX0gZnJvbSAnLi9zcmMvc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuaW1wb3J0IHtWZ1V0aWxzfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy92Zy11dGlscyc7XG5pbXBvcnQge1ZnRXZlbnRzfSBmcm9tICcuL3NyYy9ldmVudHMvdmctZXZlbnRzJztcbmltcG9ydCB7VmdTdGF0ZXN9IGZyb20gJy4vc3JjL3N0YXRlcy92Zy1zdGF0ZXMnO1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9zZXJ2aWNlcy92Zy1hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvc2VydmljZXMvdmctdXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZXZlbnRzL3ZnLWV2ZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9zdGF0ZXMvdmctc3RhdGVzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogWyBWZ1BsYXllciwgVmdNZWRpYSwgVmdDdWVQb2ludHMgXSxcbiAgICBwcm92aWRlcnM6IFsgVmdBUEksIFZnRnVsbHNjcmVlbkFQSSwgVmdVdGlscywgVmdFdmVudHMsIFZnU3RhdGVzIF0sXG4gICAgZXhwb3J0czogWyBWZ1BsYXllciwgVmdNZWRpYSwgVmdDdWVQb2ludHMgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ0NvcmUge31cbiJdfQ==