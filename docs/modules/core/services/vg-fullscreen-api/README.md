# VgFullscreenAPI @Injectable Service

Service to handle full screen events and states.

This service is created by the element `vg-player` when it is instantiated.

## Methods

### init(elem: HTMLElement, medias: QueryList<VgMedia>):void

Initialize the polyfill service.

Params:
- **elem**: Element to set to full screen mode.
- **medias**: `QueryList` of `VgMedia` to fallback to video on iOS.

### toggleFullscreen():void

Changes between full screen and normal mode.

<hr>

## Properties

### onChangeFullscreen [read-only] :EventEmitter

Observable to listen changes on the full screen state.
