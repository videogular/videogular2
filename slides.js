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
var vg_slides_1 = require('./src/vg-slides/vg-slides');
var slide_model_1 = require('./src/vg-slides/slide-model');
__export(require('./src/vg-slides/slide-model'));
var VgSlidesModule = (function () {
    function VgSlidesModule() {
    }
    VgSlidesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [vg_slides_1.VgSlides],
            providers: [slide_model_1.SlideModel],
            exports: [vg_slides_1.VgSlides]
        }), 
        __metadata('design:paramtypes', [])
    ], VgSlidesModule);
    return VgSlidesModule;
}());
exports.VgSlidesModule = VgSlidesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFFL0MsMEJBQXVCLDJCQUEyQixDQUFDLENBQUE7QUFDbkQsNEJBQXlCLDZCQUE2QixDQUFDLENBQUE7QUFFdkQsaUJBQWMsNkJBQTZCLENBQUMsRUFBQTtBQVE1QztJQUFBO0lBQTZCLENBQUM7SUFOOUI7UUFBQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBRSxxQkFBWSxDQUFFO1lBQ3pCLFlBQVksRUFBRSxDQUFFLG9CQUFRLENBQUU7WUFDMUIsU0FBUyxFQUFFLENBQUUsd0JBQVUsQ0FBRTtZQUN6QixPQUFPLEVBQUUsQ0FBRSxvQkFBUSxDQUFFO1NBQ3hCLENBQUM7O3NCQUFBO0lBQzJCLHFCQUFDO0FBQUQsQ0FBQyxBQUE5QixJQUE4QjtBQUFqQixzQkFBYyxpQkFBRyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7VmdTbGlkZXN9IGZyb20gJy4vc3JjL3ZnLXNsaWRlcy92Zy1zbGlkZXMnO1xuaW1wb3J0IHtTbGlkZU1vZGVsfSBmcm9tICcuL3NyYy92Zy1zbGlkZXMvc2xpZGUtbW9kZWwnO1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy92Zy1zbGlkZXMvc2xpZGUtbW9kZWwnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbIFZnU2xpZGVzIF0sXG4gICAgcHJvdmlkZXJzOiBbIFNsaWRlTW9kZWwgXSxcbiAgICBleHBvcnRzOiBbIFZnU2xpZGVzIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdTbGlkZXNNb2R1bGUge31cbiJdfQ==