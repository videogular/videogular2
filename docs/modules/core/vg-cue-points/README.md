# VgCuePoints @Directive

Directive to get events on a track object. `VgCuePoints` are defined as an attribute in a `track` element.

`VgCuePoints` will add `cues` property to the track element with all the `VTTCue` objects loaded by the `track` element. For example, you can use the `cues` property to list all the cues with a `*ngFor` or to populate the `VgScrubBarCuePoints` component.

## Outputs

| Output | Description |
|--- |--- |
| onEnterCuePoint | Triggered when player time is bigger than `start` cue point property. |
| onExitCuePoint  | Triggered when player time moves to a position lower than cue point `start` property. |

## HTML Definition

```html
<vg-player>
    <video #media [vgMedia]="media" id="vid" preload="auto">
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        
        <track src="../data/cue-points.vtt" kind="metadata" label="Cue Points" default
               #metadataTrack
               vgCuePoints
               (onEnterCuePoint)="onEnterCuePoint($event)"
               (onExitCuePoint)="onExitCuePoint($event)">
    </video>
</vg-player>
```
