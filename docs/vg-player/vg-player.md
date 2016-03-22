---
currentMenu: vg-player/vg-player
--------------------------------

# VgPlayer @Component

Main component that surrounds `video` and `audio` elements. All videogular components must be placed inside this component.

This component is responsible of create VgAPI and load Videogular Font.

To create VgAPI, videogular needs that each media element haves an `id` to build an internal map with all media objects.

## Outputs

| Output | Description |
|--- |--- |
| onPlayerReady | Triggered when player have been initialized. Returns a VgAPI instance. |

## HTML Definition

```html
<vg-player id="vid" (onPlayerReady)="onPlayerReady($event)">
    <video src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
</vg-player>
```
