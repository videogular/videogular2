# VgScrubBarCurrentTime @Component

Component to display the current time in percentage as an horizontal bar.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to display the current time. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| vgSlider | Boolean value to display a big dot at the end of the bar. Default is `false`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-scrub-bar>
            <vg-scrub-bar-current-time vgFor="my-video" [vgSlider]="true"></vg-scrub-bar-current-time>
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
