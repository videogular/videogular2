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
var common_1 = require('@angular/common');
var vg_overlay_play_1 = require('./src/vg-overlay-play/vg-overlay-play');
var VgOverlayPlayModule = (function () {
    function VgOverlayPlayModule() {
    }
    VgOverlayPlayModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_overlay_play_1.VgOverlayPlay
            ],
            exports: [
                vg_overlay_play_1.VgOverlayPlay
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VgOverlayPlayModule);
    return VgOverlayPlayModule;
}());
exports.VgOverlayPlayModule = VgOverlayPlayModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3ZlcmxheS1wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFFL0MsZ0NBQTRCLHVDQUF1QyxDQUFDLENBQUE7QUFXcEU7SUFBQTtJQUFrQyxDQUFDO0lBVG5DO1FBQUMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBRTtZQUN6QixZQUFZLEVBQUU7Z0JBQ1YsK0JBQWE7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsK0JBQWE7YUFDaEI7U0FDSixDQUFDOzsyQkFBQTtJQUNnQywwQkFBQztBQUFELENBQUMsQUFBbkMsSUFBbUM7QUFBdEIsMkJBQW1CLHNCQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1ZnT3ZlcmxheVBsYXl9IGZyb20gJy4vc3JjL3ZnLW92ZXJsYXktcGxheS92Zy1vdmVybGF5LXBsYXknO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFZnT3ZlcmxheVBsYXlcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVmdPdmVybGF5UGxheVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdPdmVybGF5UGxheU1vZHVsZSB7fVxuIl19