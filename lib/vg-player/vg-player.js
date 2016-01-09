var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var vg_api_1 = require('../services/vg-api');
var VgPlayer = (function () {
    function VgPlayer(ref, API) {
        this.onPlayerReady = new core_1.EventEmitter();
        this.onMediaReady = new core_1.EventEmitter();
        this.API = API;
        this.elem = ref.nativeElement;
        this.API.registerElement(this.elem);
        var slice = Array.prototype.slice;
        var videos = slice.call(this.elem.querySelectorAll("video"));
        var audios = slice.call(this.elem.querySelectorAll("audio"));
        var medias = videos.concat(audios);
        for (var i = 0, l = medias.length; i < l; i++) {
            this.API.registerMedia(medias[i]);
        }
    }
    VgPlayer.prototype.ngOnInit = function () {
        this.onPlayerReady.next(this.API);
    };
    VgPlayer.prototype.onVgMediaReady = function (event) {
        this.onMediaReady.next(this.API);
    };
    VgPlayer = __decorate([
        core_1.Component({
            selector: 'vg-player',
            bindings: [vg_api_1.VgAPI],
            outputs: ['onPlayerReady', 'onMediaReady'],
            template: "<ng-content></ng-content>",
            styles: ["\n        @font-face {\n            font-family: 'videogular';\n            src: url('node_modules/videogular2/src/fonts/videogular.eot');\n            src: url('node_modules/videogular2/src/fonts/videogular.eot?#iefix') format('embedded-opentype'),\n                 url('node_modules/videogular2/src/fonts/videogular.woff') format('woff'),\n                 url('node_modules/videogular2/src/fonts/videogular.ttf') format('truetype'),\n                 url('node_modules/videogular2/src/fonts/videogular.svg#videogular') format('svg');\n            font-weight: normal;\n            font-style: normal;\n        }\n\n        :host {\n            font-family: 'videogular';\n            position: relative;\n            display: flex;\n            width: 100%;\n            height: 100%;\n        }\n\n        :host video {\n            width: 100%;\n            height: 100%;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgPlayer);
    return VgPlayer;
})();
exports.VgPlayer = VgPlayer;
//# sourceMappingURL=vg-player.js.map