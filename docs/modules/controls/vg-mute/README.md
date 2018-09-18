# VgMute @Component

Button to toggle between current selected volume and muted volume.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to toggle between volume and muted. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-mute vgFor="my-video"></vg-mute>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
