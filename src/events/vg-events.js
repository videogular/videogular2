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
var VgEvents = (function () {
    function VgEvents() {
    }
    VgEvents.VG_ABORT = 'abort';
    VgEvents.VG_CAN_PLAY = 'canplay';
    VgEvents.VG_CAN_PLAY_THROUGH = 'canplaythrough';
    VgEvents.VG_DURATION_CHANGE = 'durationchange';
    VgEvents.VG_EMPTIED = 'emptied';
    VgEvents.VG_ENDED = 'ended';
    VgEvents.VG_ERROR = 'error';
    VgEvents.VG_LOADED_DATA = 'loadeddata';
    VgEvents.VG_LOADED_METADATA = 'loadedmetadata';
    VgEvents.VG_LOAD_START = 'loadstart';
    VgEvents.VG_PAUSE = 'pause';
    VgEvents.VG_PLAY = 'play';
    VgEvents.VG_PLAYING = 'playing';
    VgEvents.VG_PROGRESS = 'progress';
    VgEvents.VG_RATE_CHANGE = 'ratechange';
    VgEvents.VG_SEEK = 'seek';
    VgEvents.VG_SEEKED = 'seeked';
    VgEvents.VG_SEEKING = 'seeking';
    VgEvents.VG_STALLED = 'stalled';
    VgEvents.VG_SUSPEND = 'suspend';
    VgEvents.VG_TIME_UPDATE = 'timeupdate';
    VgEvents.VG_VOLUME_CHANGE = 'volumechange';
    VgEvents.VG_WAITING = 'waiting';
    VgEvents.VG_LOAD = 'load';
    VgEvents.VG_ENTER = 'enter';
    VgEvents.VG_EXIT = 'exit';
    VgEvents = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VgEvents);
    return VgEvents;
}());
exports.VgEvents = VgEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFHekM7SUFBQTtJQTRCQSxDQUFDO0lBM0JVLGlCQUFRLEdBQVcsT0FBTyxDQUFDO0lBQzNCLG9CQUFXLEdBQVcsU0FBUyxDQUFDO0lBQ2hDLDRCQUFtQixHQUFXLGdCQUFnQixDQUFDO0lBQy9DLDJCQUFrQixHQUFXLGdCQUFnQixDQUFDO0lBQzlDLG1CQUFVLEdBQVcsU0FBUyxDQUFDO0lBQy9CLGlCQUFRLEdBQVcsT0FBTyxDQUFDO0lBQzNCLGlCQUFRLEdBQVcsT0FBTyxDQUFDO0lBQzNCLHVCQUFjLEdBQVcsWUFBWSxDQUFDO0lBQ3RDLDJCQUFrQixHQUFXLGdCQUFnQixDQUFDO0lBQzlDLHNCQUFhLEdBQVcsV0FBVyxDQUFDO0lBQ3BDLGlCQUFRLEdBQVcsT0FBTyxDQUFDO0lBQzNCLGdCQUFPLEdBQVcsTUFBTSxDQUFDO0lBQ3pCLG1CQUFVLEdBQVcsU0FBUyxDQUFDO0lBQy9CLG9CQUFXLEdBQVcsVUFBVSxDQUFDO0lBQ2pDLHVCQUFjLEdBQVcsWUFBWSxDQUFDO0lBQ3RDLGdCQUFPLEdBQVcsTUFBTSxDQUFDO0lBQ3pCLGtCQUFTLEdBQVcsUUFBUSxDQUFDO0lBQzdCLG1CQUFVLEdBQVcsU0FBUyxDQUFDO0lBQy9CLG1CQUFVLEdBQVcsU0FBUyxDQUFDO0lBQy9CLG1CQUFVLEdBQVcsU0FBUyxDQUFDO0lBQy9CLHVCQUFjLEdBQVcsWUFBWSxDQUFDO0lBQ3RDLHlCQUFnQixHQUFXLGNBQWMsQ0FBQztJQUMxQyxtQkFBVSxHQUFXLFNBQVMsQ0FBQztJQUUvQixnQkFBTyxHQUFXLE1BQU0sQ0FBQztJQUN6QixpQkFBUSxHQUFXLE9BQU8sQ0FBQztJQUMzQixnQkFBTyxHQUFXLE1BQU0sQ0FBQztJQTVCcEM7UUFBQyxpQkFBVSxFQUFFOztnQkFBQTtJQTZCYixlQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSxnQkFBUSxXQTRCcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZ0V2ZW50cyB7XG4gICAgc3RhdGljIFZHX0FCT1JUOiBzdHJpbmcgPSAnYWJvcnQnO1xuICAgIHN0YXRpYyBWR19DQU5fUExBWTogc3RyaW5nID0gJ2NhbnBsYXknO1xuICAgIHN0YXRpYyBWR19DQU5fUExBWV9USFJPVUdIOiBzdHJpbmcgPSAnY2FucGxheXRocm91Z2gnO1xuICAgIHN0YXRpYyBWR19EVVJBVElPTl9DSEFOR0U6IHN0cmluZyA9ICdkdXJhdGlvbmNoYW5nZSc7XG4gICAgc3RhdGljIFZHX0VNUFRJRUQ6IHN0cmluZyA9ICdlbXB0aWVkJztcbiAgICBzdGF0aWMgVkdfRU5ERUQ6IHN0cmluZyA9ICdlbmRlZCc7XG4gICAgc3RhdGljIFZHX0VSUk9SOiBzdHJpbmcgPSAnZXJyb3InO1xuICAgIHN0YXRpYyBWR19MT0FERURfREFUQTogc3RyaW5nID0gJ2xvYWRlZGRhdGEnO1xuICAgIHN0YXRpYyBWR19MT0FERURfTUVUQURBVEE6IHN0cmluZyA9ICdsb2FkZWRtZXRhZGF0YSc7XG4gICAgc3RhdGljIFZHX0xPQURfU1RBUlQ6IHN0cmluZyA9ICdsb2Fkc3RhcnQnO1xuICAgIHN0YXRpYyBWR19QQVVTRTogc3RyaW5nID0gJ3BhdXNlJztcbiAgICBzdGF0aWMgVkdfUExBWTogc3RyaW5nID0gJ3BsYXknO1xuICAgIHN0YXRpYyBWR19QTEFZSU5HOiBzdHJpbmcgPSAncGxheWluZyc7XG4gICAgc3RhdGljIFZHX1BST0dSRVNTOiBzdHJpbmcgPSAncHJvZ3Jlc3MnO1xuICAgIHN0YXRpYyBWR19SQVRFX0NIQU5HRTogc3RyaW5nID0gJ3JhdGVjaGFuZ2UnO1xuICAgIHN0YXRpYyBWR19TRUVLOiBzdHJpbmcgPSAnc2Vlayc7XG4gICAgc3RhdGljIFZHX1NFRUtFRDogc3RyaW5nID0gJ3NlZWtlZCc7XG4gICAgc3RhdGljIFZHX1NFRUtJTkc6IHN0cmluZyA9ICdzZWVraW5nJztcbiAgICBzdGF0aWMgVkdfU1RBTExFRDogc3RyaW5nID0gJ3N0YWxsZWQnO1xuICAgIHN0YXRpYyBWR19TVVNQRU5EOiBzdHJpbmcgPSAnc3VzcGVuZCc7XG4gICAgc3RhdGljIFZHX1RJTUVfVVBEQVRFOiBzdHJpbmcgPSAndGltZXVwZGF0ZSc7XG4gICAgc3RhdGljIFZHX1ZPTFVNRV9DSEFOR0U6IHN0cmluZyA9ICd2b2x1bWVjaGFuZ2UnO1xuICAgIHN0YXRpYyBWR19XQUlUSU5HOiBzdHJpbmcgPSAnd2FpdGluZyc7XG4gICAgXG4gICAgc3RhdGljIFZHX0xPQUQ6IHN0cmluZyA9ICdsb2FkJztcbiAgICBzdGF0aWMgVkdfRU5URVI6IHN0cmluZyA9ICdlbnRlcic7XG4gICAgc3RhdGljIFZHX0VYSVQ6IHN0cmluZyA9ICdleGl0Jztcbn1cbiJdfQ==