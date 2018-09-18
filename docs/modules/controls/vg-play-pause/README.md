# VgPlayPause @Component

Button to toggle between play and pause states.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to toggle between play/pause state. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-play-pause vgFor="my-video"></vg-play-pause>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
