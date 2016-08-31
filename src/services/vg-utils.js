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
var VgUtils = (function () {
    function VgUtils() {
    }
    /**
     * Inspired by Paul Irish
     * https://gist.github.com/paulirish/211209
     * @returns {number}
     */
    VgUtils.getZIndex = function () {
        var zIndex = 1;
        var elementZIndex;
        var tags = document.getElementsByTagName('*');
        for (var i = 0, l = tags.length; i < l; i++) {
            elementZIndex = parseInt(window.getComputedStyle(tags[i])["z-index"]);
            if (elementZIndex > zIndex) {
                zIndex = elementZIndex + 1;
            }
        }
        return zIndex;
    };
    // Very simple mobile detection, not 100% reliable
    VgUtils.isMobileDevice = function () {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
    };
    ;
    VgUtils.isiOSDevice = function () {
        return (navigator.userAgent.match(/ip(hone|ad|od)/i) && !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i));
    };
    ;
    VgUtils.isCordova = function () {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    };
    ;
    VgUtils = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [])
    ], VgUtils);
    return VgUtils;
}());
exports.VgUtils = VgUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFBQTtJQW1DQSxDQUFDO0lBbENHOzs7O09BSUc7SUFDSSxpQkFBUyxHQUFoQjtRQUNJLElBQUksTUFBTSxHQUFVLENBQUMsQ0FBQztRQUN0QixJQUFJLGFBQW9CLENBQUM7UUFFekIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFVLENBQUMsRUFBRSxDQUFDLEdBQVUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEQsYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV0RSxFQUFFLENBQUMsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxrREFBa0Q7SUFDM0Msc0JBQWMsR0FBckI7UUFDSSxNQUFNLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7O0lBRU0sbUJBQVcsR0FBbEI7UUFDSSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7O0lBRU0saUJBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQzs7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxlQUFPLFVBbUNuQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFZnVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEluc3BpcmVkIGJ5IFBhdWwgSXJpc2hcbiAgICAgKiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMjExMjA5XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0WkluZGV4KCk6bnVtYmVyIHtcbiAgICAgICAgdmFyIHpJbmRleDpudW1iZXIgPSAxO1xuICAgICAgICB2YXIgZWxlbWVudFpJbmRleDpudW1iZXI7XG5cbiAgICAgICAgdmFyIHRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuXG4gICAgICAgIGZvciAodmFyIGk6bnVtYmVyID0gMCwgbDpudW1iZXIgPSB0YWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgZWxlbWVudFpJbmRleCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhZ3NbaV0pW1wiei1pbmRleFwiXSk7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50WkluZGV4ID4gekluZGV4KSB7XG4gICAgICAgICAgICAgICAgekluZGV4ID0gZWxlbWVudFpJbmRleCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gekluZGV4O1xuICAgIH1cblxuICAgIC8vIFZlcnkgc2ltcGxlIG1vYmlsZSBkZXRlY3Rpb24sIG5vdCAxMDAlIHJlbGlhYmxlXG4gICAgc3RhdGljIGlzTW9iaWxlRGV2aWNlKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiB3aW5kb3cub3JpZW50YXRpb24gIT09IFwidW5kZWZpbmVkXCIpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJJRU1vYmlsZVwiKSAhPT0gLTEpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgaXNpT1NEZXZpY2UoKSB7XG4gICAgICAgIHJldHVybiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaXAoaG9uZXxhZHxvZCkvaSkgJiYgIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpZW1vYmlsZSlbXFwvXFxzXT8oW1xcd1xcLl0qKS9pKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBpc0NvcmRvdmEoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cDovLycpID09PSAtMSAmJiBkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cHM6Ly8nKSA9PT0gLTE7XG4gICAgfTtcbn1cbiJdfQ==