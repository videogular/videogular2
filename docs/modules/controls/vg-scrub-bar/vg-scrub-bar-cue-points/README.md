# VgScrubBarCuePoints @Component

Component to display in a bar all cue points in a `TextTrackCueList`.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to read the current progress to match against the `vgCuePoints` passed. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| vgCuePoints | Target cue points list as a `TextTrackCueList`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-scrub-bar>
            <vg-scrub-bar-cue-points vgFor="my-video" [vgCuePoints]="metadataTrack.cues"></vg-scrub-bar-cue-points>
        </vg-scrub-bar>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
        <track src="../data/cue-points.vtt"
               kind="metadata"
               label="Cue Points"
               default
               #metadataTrack
               vgCuePoints>
    </video>
</vg-player>
```
