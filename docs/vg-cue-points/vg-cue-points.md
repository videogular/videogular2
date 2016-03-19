---
currentMenu: home
---

# VgCuePoints @Directive

Directive to set cue points on media object. VgCuePoints are defined as an attribute in a `video` or `audio` element.

## Inputs

| Input | Description |
|--- |--- |
| vgCuePoints | Array of objects that implement ICuePoint interface |


## Outputs

| Output | Description |
|--- |--- |
| onEnterCuePoint | Triggered when player time is bigger than `start` cue point property. |
| onUpdateCuePoint | Triggered when player time is between `start` and `end` cue point properties. |
| onLeaveCuePoint | Triggered when player time moves to a position lower than cue point `start` property. |
| onCompleteCuePoint | Triggered when player time is bigger than cue point `end` property. If `end` property is not defined `start` time would be used to check if cue point is completed. |

## HTML Definition

```html
<vg-player>
    <video id="vid" preload="auto" 
               [vgCuePoints]="cuePoints"
               (onEnterCuePoint)="onEnterCuePoint($event)"
               (onUpdateCuePoint)="onUpdateCuePoint($event)"
               (onLeaveCuePoint)="onLeaveCuePoint($event)"
               (onCompleteCuePoint)="onCompleteCuePoint($event)">
            <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        </video>
</vg-player>
```
