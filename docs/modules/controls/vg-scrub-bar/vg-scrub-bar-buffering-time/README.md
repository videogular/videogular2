# VgScrubBarBufferingTime @Component

Component to display the current buffering percentage loaded.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to display the buffering loaded. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-scrub-bar>
            <vg-scrub-bar-buffering-time vgFor="my-video"></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
