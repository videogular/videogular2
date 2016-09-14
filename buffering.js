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
var vg_buffering_1 = require('./src/vg-buffering/vg-buffering');
var VgBufferingModule = (function () {
    function VgBufferingModule() {
    }
    VgBufferingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_buffering_1.VgBuffering
            ],
            exports: [
                vg_buffering_1.VgBuffering
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VgBufferingModule);
    return VgBufferingModule;
}());
exports.VgBufferingModule = VgBufferingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFFL0MsNkJBQTBCLGlDQUFpQyxDQUFDLENBQUE7QUFXNUQ7SUFBQTtJQUFnQyxDQUFDO0lBVGpDO1FBQUMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBRTtZQUN6QixZQUFZLEVBQUU7Z0JBQ1YsMEJBQVc7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCwwQkFBVzthQUNkO1NBQ0osQ0FBQzs7eUJBQUE7SUFDOEIsd0JBQUM7QUFBRCxDQUFDLEFBQWpDLElBQWlDO0FBQXBCLHlCQUFpQixvQkFBRyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtWZ0J1ZmZlcmluZ30gZnJvbSAnLi9zcmMvdmctYnVmZmVyaW5nL3ZnLWJ1ZmZlcmluZyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVmdCdWZmZXJpbmdcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVmdCdWZmZXJpbmdcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFZnQnVmZmVyaW5nTW9kdWxlIHt9XG4iXX0=