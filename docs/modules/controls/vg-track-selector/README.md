# VgTrackSelector @Component

Component to display a selector for tracks of kind `subtitles` registered to the current media.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to display the tracks to select. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-track-selector vgFor="my-video"></vg-track-selector>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">

           <track kind="subtitles" label="English" src="assets/subs/pale-blue-dot.vtt" srclang="en" default>
           <track kind="subtitles" label="Español" src="assets/subs/pale-blue-dot-es.vtt" srclang="es">

    </video>
</vg-player>
```
