"use strict";
var VgAbstractControl = (function () {
    function VgAbstractControl(api) {
        var _this = this;
        api.playerReadyEvent.subscribe(function (api) { return _this.onPlayerReady(); });
    }
    VgAbstractControl.prototype.onPlayerReady = function () {
        throw new Error('onPlayerReady must be implemented by all controls');
    };
    return VgAbstractControl;
}());
exports.VgAbstractControl = VgAbstractControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctYWJzdHJhY3QtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWFic3RyYWN0LWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBQ0ksMkJBQVksR0FBUztRQUR6QixpQkFRQztRQU5PLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLHlCQUFpQixvQkFRN0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmdBUEl9IGZyb20gXCIuLi9zZXJ2aWNlcy92Zy1hcGlcIjtcblxuZXhwb3J0IGNsYXNzIFZnQWJzdHJhY3RDb250cm9sIHtcbiAgICBjb25zdHJ1Y3RvcihhcGk6VmdBUEkpIHtcbiAgICAgICAgYXBpLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKChhcGkpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKTtcbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uUGxheWVyUmVhZHkgbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhbGwgY29udHJvbHMnKTtcbiAgICB9XG59XG4iXX0=