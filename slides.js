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
var vg_slides_1 = require('./src/vg-slides/vg-slides');
var VgSlidesModule = (function () {
    function VgSlidesModule() {
    }
    VgSlidesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_slides_1.VgSlides
            ],
            exports: [
                vg_slides_1.VgSlides
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VgSlidesModule);
    return VgSlidesModule;
}());
exports.VgSlidesModule = VgSlidesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xpZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFFL0MsMEJBQXVCLDJCQUEyQixDQUFDLENBQUE7QUFXbkQ7SUFBQTtJQUE2QixDQUFDO0lBVDlCO1FBQUMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBRTtZQUN6QixZQUFZLEVBQUU7Z0JBQ1Ysb0JBQVE7YUFDWDtZQUNELE9BQU8sRUFBRTtnQkFDTCxvQkFBUTthQUNYO1NBQ0osQ0FBQzs7c0JBQUE7SUFDMkIscUJBQUM7QUFBRCxDQUFDLEFBQTlCLElBQThCO0FBQWpCLHNCQUFjLGlCQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1ZnU2xpZGVzfSBmcm9tICcuL3NyYy92Zy1zbGlkZXMvdmctc2xpZGVzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBWZ1NsaWRlc1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBWZ1NsaWRlc1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdTbGlkZXNNb2R1bGUge31cbiJdfQ==