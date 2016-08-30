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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var vg_player_1 = require("./vg-player");
var vg_media_1 = require("../vg-media/vg-media");
var vg_api_1 = require("../services/vg-api");
var vg_fullscreen_api_1 = require("../services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var player;
    var ref;
    var api;
    beforeEach(function () {
        ref = {
            nativeElement: {
                querySelectorAll: function () {
                    return [{}];
                }
            }
        };
        api = new vg_api_1.VgAPI();
        player = new vg_player_1.VgPlayer(ref, api);
    });
    it('Should handle native fullscreen', function () {
        vg_fullscreen_api_1.VgFullscreenAPI.nativeFullscreen = true;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeFalsy();
    });
    it('Should handle emulated fullscreen enabled', function () {
        vg_fullscreen_api_1.VgFullscreenAPI.nativeFullscreen = false;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeTruthy();
        expect(player.zIndex).toBe('1');
    });
    it('Should handle emulated fullscreen enabled', function () {
        vg_fullscreen_api_1.VgFullscreenAPI.nativeFullscreen = false;
        player.onChangeFullscreen(false);
        expect(player.isFullscreen).toBeFalsy();
        expect(player.zIndex).toBe('auto');
    });
});
describe('Videogular Player', function () {
    var builder;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [VgPlayerTest]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    it('Should create a VgPlayer component', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(VgPlayerTest);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        var video = compiled.querySelector('video');
        expect(video.controls).toBe(true);
    }));
});
var VgPlayerTest = (function () {
    function VgPlayerTest() {
    }
    VgPlayerTest = __decorate([
        core_1.Component({
            template: "\n        <vg-player>\n            <video vg-media id=\"singleVideo\" preload=\"auto\" controls>\n                <source src=\"http://static.videogular.com/assets/videos/videogular.mp4\" type=\"video/mp4\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.ogg\" type=\"video/ogg\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.webm\" type=\"video/webm\">\n            </video>\n        </vg-player>\n    ",
            providers: [vg_api_1.VgAPI],
            directives: [vg_player_1.VgPlayer, vg_media_1.VgMedia]
        }), 
        __metadata('design:paramtypes', [])
    ], VgPlayerTest);
    return VgPlayerTest;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1wbGF5ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsd0JBQXFDLHVCQUF1QixDQUFDLENBQUE7QUFDN0QscUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pELDBCQUF1QixhQUFhLENBQUMsQ0FBQTtBQUNyQyx5QkFBc0Isc0JBQXNCLENBQUMsQ0FBQTtBQUM3Qyx1QkFBb0Isb0JBQW9CLENBQUMsQ0FBQTtBQUN6QyxrQ0FBOEIsK0JBQStCLENBQUMsQ0FBQTtBQUc5RCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxNQUFlLENBQUM7SUFDcEIsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFFZCxVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsZ0JBQWdCLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7YUFDSjtTQUNKLENBQUM7UUFFRixHQUFHLEdBQUcsSUFBSSxjQUFLLEVBQUUsQ0FBQztRQUNsQixNQUFNLEdBQUcsSUFBSSxvQkFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNsQyxtQ0FBZSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUV4QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtRQUM1QyxtQ0FBZSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtRQUM1QyxtQ0FBZSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzFCLElBQUksT0FBTyxDQUFDO0lBRVosVUFBVSxDQUFDO1FBQ1AsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUMzQixZQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsZUFBSyxDQUFDO1FBQ2IsaUJBQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixFQUFFLENBQUMsb0NBQW9DLEVBQ25DLGVBQUssQ0FBQztRQUNGLElBQUksT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUNsRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUNMLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQztBQWVIO0lBQUE7SUFBb0IsQ0FBQztJQWJyQjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbWVBUVQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFLLENBQUM7WUFDbEIsVUFBVSxFQUFFLENBQUMsb0JBQVEsRUFBRSxrQkFBTyxDQUFDO1NBQ2xDLENBQUM7O29CQUFBO0lBQ2tCLG1CQUFDO0FBQUQsQ0FBQyxBQUFyQixJQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXN5bmMsIGluamVjdCwgVGVzdEJlZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvdGVzdGluZ1wiO1xuaW1wb3J0IHtDb21wb25lbnQsIHByb3ZpZGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZnUGxheWVyfSBmcm9tIFwiLi92Zy1wbGF5ZXJcIjtcbmltcG9ydCB7VmdNZWRpYX0gZnJvbSBcIi4uL3ZnLW1lZGlhL3ZnLW1lZGlhXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQge1ZnRnVsbHNjcmVlbkFQSX0gZnJvbSBcIi4uL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpXCI7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmRlc2NyaWJlKCdWaWRlb2d1bGFyIFBsYXllcicsICgpID0+IHtcbiAgICBsZXQgcGxheWVyOlZnUGxheWVyO1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZiA9IHtcbiAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBxdWVyeVNlbGVjdG9yQWxsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbe31dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICAgICAgcGxheWVyID0gbmV3IFZnUGxheWVyKHJlZiwgYXBpKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG5hdGl2ZSBmdWxsc2NyZWVuJywgKCkgPT4ge1xuICAgICAgICBWZ0Z1bGxzY3JlZW5BUEkubmF0aXZlRnVsbHNjcmVlbiA9IHRydWU7XG5cbiAgICAgICAgcGxheWVyLm9uQ2hhbmdlRnVsbHNjcmVlbih0cnVlKTtcblxuICAgICAgICBleHBlY3QocGxheWVyLmlzRnVsbHNjcmVlbikudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBlbXVsYXRlZCBmdWxsc2NyZWVuIGVuYWJsZWQnLCAoKSA9PiB7XG4gICAgICAgIFZnRnVsbHNjcmVlbkFQSS5uYXRpdmVGdWxsc2NyZWVuID0gZmFsc2U7XG5cbiAgICAgICAgcGxheWVyLm9uQ2hhbmdlRnVsbHNjcmVlbih0cnVlKTtcblxuICAgICAgICBleHBlY3QocGxheWVyLmlzRnVsbHNjcmVlbikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QocGxheWVyLnpJbmRleCkudG9CZSgnMScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgZW11bGF0ZWQgZnVsbHNjcmVlbiBlbmFibGVkJywgKCkgPT4ge1xuICAgICAgICBWZ0Z1bGxzY3JlZW5BUEkubmF0aXZlRnVsbHNjcmVlbiA9IGZhbHNlO1xuXG4gICAgICAgIHBsYXllci5vbkNoYW5nZUZ1bGxzY3JlZW4oZmFsc2UpO1xuXG4gICAgICAgIGV4cGVjdChwbGF5ZXIuaXNGdWxsc2NyZWVuKS50b0JlRmFsc3koKTtcbiAgICAgICAgZXhwZWN0KHBsYXllci56SW5kZXgpLnRvQmUoJ2F1dG8nKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnVmlkZW9ndWxhciBQbGF5ZXInLCAoKSA9PiB7XG4gICAgdmFyIGJ1aWxkZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKHtcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW1ZnUGxheWVyVGVzdF1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBiZWZvcmVFYWNoKGFzeW5jKCgpID0+IHtcbiAgICAgICAgVGVzdEJlZC5jb21waWxlQ29tcG9uZW50cygpO1xuICAgIH0pKTtcblxuICAgIGl0KCdTaG91bGQgY3JlYXRlIGEgVmdQbGF5ZXIgY29tcG9uZW50JyxcbiAgICAgICAgYXN5bmMoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpeHR1cmUgPSBUZXN0QmVkLmNyZWF0ZUNvbXBvbmVudChWZ1BsYXllclRlc3QpO1xuICAgICAgICAgICAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBsZXQgY29tcGlsZWQgPSBmaXh0dXJlLmRlYnVnRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgbGV0IHZpZGVvID0gY29tcGlsZWQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcblxuICAgICAgICAgICAgZXhwZWN0KHZpZGVvLmNvbnRyb2xzKS50b0JlKHRydWUpO1xuICAgICAgICB9KVxuICAgICk7XG59KTtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHZnLXBsYXllcj5cbiAgICAgICAgICAgIDx2aWRlbyB2Zy1tZWRpYSBpZD1cInNpbmdsZVZpZGVvXCIgcHJlbG9hZD1cImF1dG9cIiBjb250cm9scz5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cImh0dHA6Ly9zdGF0aWMudmlkZW9ndWxhci5jb20vYXNzZXRzL3ZpZGVvcy92aWRlb2d1bGFyLm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cImh0dHA6Ly9zdGF0aWMudmlkZW9ndWxhci5jb20vYXNzZXRzL3ZpZGVvcy92aWRlb2d1bGFyLm9nZ1wiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cImh0dHA6Ly9zdGF0aWMudmlkZW9ndWxhci5jb20vYXNzZXRzL3ZpZGVvcy92aWRlb2d1bGFyLndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgPC92Zy1wbGF5ZXI+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtWZ0FQSV0sXG4gICAgZGlyZWN0aXZlczogW1ZnUGxheWVyLCBWZ01lZGlhXVxufSlcbmNsYXNzIFZnUGxheWVyVGVzdCB7fSJdfQ==