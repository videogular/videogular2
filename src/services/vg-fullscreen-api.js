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
var vg_utils_1 = require("./vg-utils");
var VgFullscreenAPI = (function () {
    function VgFullscreenAPI() {
    }
    VgFullscreenAPI.init = function (elem, medias) {
        this.videogularElement = elem;
        this.medias = medias;
        var APIs = {
            w3: {
                enabled: 'fullscreenEnabled',
                element: 'fullscreenElement',
                request: 'requestFullscreen',
                exit: 'exitFullscreen',
                onchange: 'fullscreenchange',
                onerror: 'fullscreenerror'
            },
            newWebkit: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitRequestFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            oldWebkit: {
                enabled: 'webkitIsFullScreen',
                element: 'webkitCurrentFullScreenElement',
                request: 'webkitRequestFullScreen',
                exit: 'webkitCancelFullScreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            moz: {
                enabled: 'mozFullScreen',
                element: 'mozFullScreenElement',
                request: 'mozRequestFullScreen',
                exit: 'mozCancelFullScreen',
                onchange: 'mozfullscreenchange',
                onerror: 'mozfullscreenerror'
            },
            ios: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitEnterFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            ms: {
                enabled: 'msFullscreenEnabled',
                element: 'msFullscreenElement',
                request: 'msRequestFullscreen',
                exit: 'msExitFullscreen',
                onchange: 'MSFullscreenChange',
                onerror: 'MSFullscreenError'
            }
        };
        for (var browser in APIs) {
            if (APIs[browser].enabled in document) {
                this.polyfill = APIs[browser];
                break;
            }
        }
        this.isAvailable = (this.polyfill != null);
    };
    VgFullscreenAPI.toggleFullscreen = function (element) {
        if (element === void 0) { element = null; }
        if (this.isFullscreen) {
            this.exit();
        }
        else {
            this.request(element);
        }
    };
    VgFullscreenAPI.request = function (elem) {
        if (!elem)
            elem = this.videogularElement;
        this.isFullscreen = true;
        this.onChangeFullscreen.next(true);
        // Perform native full screen support
        if (this.isAvailable && this.nativeFullscreen) {
            // Fullscreen for mobile devices
            if (vg_utils_1.VgUtils.isMobileDevice()) {
                // We should make fullscreen the video object if it doesn't have native fullscreen support
                // Fallback! We can't set vg-player on fullscreen, only video/audio objects
                if (!this.polyfill.enabled && elem === this.videogularElement) {
                    elem = this.medias[0];
                }
                this.enterElementInFullScreen(elem);
            }
            else {
                this.enterElementInFullScreen(this.videogularElement);
            }
        }
    };
    VgFullscreenAPI.enterElementInFullScreen = function (elem) {
        elem[this.polyfill.request]();
    };
    VgFullscreenAPI.exit = function () {
        this.isFullscreen = false;
        this.onChangeFullscreen.next(false);
        // Exit from native fullscreen
        if (this.isAvailable && this.nativeFullscreen) {
            document[this.polyfill.exit]();
        }
    };
    VgFullscreenAPI.nativeFullscreen = true;
    VgFullscreenAPI.isFullscreen = false;
    VgFullscreenAPI.onChangeFullscreen = new core_1.EventEmitter();
    VgFullscreenAPI = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VgFullscreenAPI);
    return VgFullscreenAPI;
}());
exports.VgFullscreenAPI = VgFullscreenAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1mdWxsc2NyZWVuLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLHlCQUFzQixZQUFZLENBQUMsQ0FBQTtBQUluQztJQUFBO0lBMkhBLENBQUM7SUEvR1Usb0JBQUksR0FBWCxVQUFZLElBQWdCLEVBQUUsTUFBeUI7UUFDbkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFNLElBQUksR0FBRztZQUNULEVBQUUsRUFBRTtnQkFDQSxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixPQUFPLEVBQUUsaUJBQWlCO2FBQzdCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLE9BQU8sRUFBRSx1QkFBdUI7YUFDbkM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsT0FBTyxFQUFFLGdDQUFnQztnQkFDekMsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsSUFBSSxFQUFFLHdCQUF3QjtnQkFDOUIsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsT0FBTyxFQUFFLHVCQUF1QjthQUNuQztZQUNELEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsT0FB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QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLDhCQUE4QjtRQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQyxDQUFDO0lBQ0wsQ0FBQztJQXRITSxnQ0FBZ0IsR0FBVyxJQUFJLENBQUM7SUFDaEMsNEJBQVksR0FBVyxLQUFLLENBQUM7SUFLN0Isa0NBQWtCLEdBQXFCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBWHJFO1FBQUMsaUJBQVUsRUFBRTs7dUJBQUE7SUE0SGIsc0JBQUM7QUFBRCxDQUFDLEFBM0hELElBMkhDO0FBM0hZLHVCQUFlLGtCQTJIM0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWZ1V0aWxzfSBmcm9tIFwiLi92Zy11dGlsc1wiO1xuaW1wb3J0IHtWZ01lZGlhfSBmcm9tIFwiLi4vdmctbWVkaWEvdmctbWVkaWFcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZnRnVsbHNjcmVlbkFQSSB7XG4gICAgc3RhdGljIHBvbHlmaWxsOmFueTtcbiAgICBzdGF0aWMgb25jaGFuZ2U6c3RyaW5nO1xuICAgIHN0YXRpYyBvbmVycm9yOnN0cmluZztcbiAgICBzdGF0aWMgbmF0aXZlRnVsbHNjcmVlbjpib29sZWFuID0gdHJ1ZTtcbiAgICBzdGF0aWMgaXNGdWxsc2NyZWVuOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBzdGF0aWMgaXNBdmFpbGFibGU6Ym9vbGVhbjtcbiAgICBzdGF0aWMgdmlkZW9ndWxhckVsZW1lbnQ6SFRNTEVsZW1lbnQ7XG4gICAgc3RhdGljIG1lZGlhczpRdWVyeUxpc3Q8VmdNZWRpYT47XG5cbiAgICBzdGF0aWMgb25DaGFuZ2VGdWxsc2NyZWVuOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgc3RhdGljIGluaXQoZWxlbTpIVE1MRWxlbWVudCwgbWVkaWFzOlF1ZXJ5TGlzdDxWZ01lZGlhPikge1xuICAgICAgICB0aGlzLnZpZGVvZ3VsYXJFbGVtZW50ID0gZWxlbTtcbiAgICAgICAgdGhpcy5tZWRpYXMgPSBtZWRpYXM7XG5cbiAgICAgICAgY29uc3QgQVBJcyA9IHtcbiAgICAgICAgICAgIHczOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ2Z1bGxzY3JlZW5FbmFibGVkJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnZnVsbHNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICdyZXF1ZXN0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgZXhpdDogJ2V4aXRGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBvbmNoYW5nZTogJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICdmdWxsc2NyZWVuZXJyb3InXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV3V2Via2l0OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgZXhpdDogJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBvbmNoYW5nZTogJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2xkV2Via2l0OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ3dlYmtpdElzRnVsbFNjcmVlbicsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3dlYmtpdEN1cnJlbnRGdWxsU2NyZWVuRWxlbWVudCcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogJ3dlYmtpdFJlcXVlc3RGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnd2Via2l0Q2FuY2VsRnVsbFNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICAgICBvbmVycm9yOiAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vejoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICdtb3pGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnbW96RnVsbFNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICdtb3pSZXF1ZXN0RnVsbFNjcmVlbicsXG4gICAgICAgICAgICAgICAgZXhpdDogJ21vekNhbmNlbEZ1bGxTY3JlZW4nLFxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogJ21vemZ1bGxzY3JlZW5lcnJvcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpb3M6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICd3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogJ3dlYmtpdEVudGVyRnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgZXhpdDogJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBvbmNoYW5nZTogJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXM6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnbXNGdWxsc2NyZWVuRW5hYmxlZCcsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ21zRnVsbHNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICdtc1JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnbXNFeGl0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICdNU0Z1bGxzY3JlZW5FcnJvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKHZhciBicm93c2VyIGluIEFQSXMpIHtcbiAgICAgICAgICAgIGlmIChBUElzW2Jyb3dzZXJdLmVuYWJsZWQgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbHlmaWxsID0gQVBJc1ticm93c2VyXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBdmFpbGFibGUgPSAodGhpcy5wb2x5ZmlsbCAhPSBudWxsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlRnVsbHNjcmVlbihlbGVtZW50OmFueSA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmV4aXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZXF1ZXN0KGVsZW0pIHtcbiAgICAgICAgaWYgKCFlbGVtKSBlbGVtID0gdGhpcy52aWRlb2d1bGFyRWxlbWVudDtcblxuICAgICAgICB0aGlzLmlzRnVsbHNjcmVlbiA9IHRydWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2VGdWxsc2NyZWVuLm5leHQodHJ1ZSk7XG5cbiAgICAgICAgLy8gUGVyZm9ybSBuYXRpdmUgZnVsbCBzY3JlZW4gc3VwcG9ydFxuICAgICAgICBpZiAodGhpcy5pc0F2YWlsYWJsZSAmJiB0aGlzLm5hdGl2ZUZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIC8vIEZ1bGxzY3JlZW4gZm9yIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICBpZiAoVmdVdGlscy5pc01vYmlsZURldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugc2hvdWxkIG1ha2UgZnVsbHNjcmVlbiB0aGUgdmlkZW8gb2JqZWN0IGlmIGl0IGRvZXNuJ3QgaGF2ZSBuYXRpdmUgZnVsbHNjcmVlbiBzdXBwb3J0XG4gICAgICAgICAgICAgICAgLy8gRmFsbGJhY2shIFdlIGNhbid0IHNldCB2Zy1wbGF5ZXIgb24gZnVsbHNjcmVlbiwgb25seSB2aWRlby9hdWRpbyBvYmplY3RzXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvbHlmaWxsLmVuYWJsZWQgJiYgZWxlbSA9PT0gdGhpcy52aWRlb2d1bGFyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGhpcy5tZWRpYXNbMF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlckVsZW1lbnRJbkZ1bGxTY3JlZW4oZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyRWxlbWVudEluRnVsbFNjcmVlbih0aGlzLnZpZGVvZ3VsYXJFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBlbnRlckVsZW1lbnRJbkZ1bGxTY3JlZW4oZWxlbSkge1xuICAgICAgICBlbGVtW3RoaXMucG9seWZpbGwucmVxdWVzdF0oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXhpdCgpIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4ubmV4dChmYWxzZSk7XG5cbiAgICAgICAgLy8gRXhpdCBmcm9tIG5hdGl2ZSBmdWxsc2NyZWVuXG4gICAgICAgIGlmICh0aGlzLmlzQXZhaWxhYmxlICYmIHRoaXMubmF0aXZlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnRbdGhpcy5wb2x5ZmlsbC5leGl0XSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19