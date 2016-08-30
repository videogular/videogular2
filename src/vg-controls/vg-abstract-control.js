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
//# sourceMappingURL=vg-abstract-control.js.map