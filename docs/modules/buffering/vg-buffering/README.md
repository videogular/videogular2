# VgBuffering @Component

Buffering component to display a buffer icon when the media is paused and loading more media data.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to get the buffer from that specified media. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-buffering vgFor="my-video"></vg-buffering>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
