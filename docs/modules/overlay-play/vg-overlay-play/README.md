# VgOverlayPlay @Component

Component to display a big play button over the video.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to play/pause the specified media. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-overlay-play vgFor="my-video"></vg-overlay-play>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
