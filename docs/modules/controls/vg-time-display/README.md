# VgControls @Component

Component to display the current time, total time or time left for the current media.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to listen to play/pause events (used to auto hide controls). This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| vgProperty | String value to set the property to display. Possible values are `current`, `total` or `left`. Default is `current`. |
| vgFormat | String value to define a time mask. Default is `mm:ss`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-time-display vgFor="my-video" [vgProperty]="'current'" [vgFormat]="'mm:ss'"></vg-time-display>
        <vg-time-display vgFor="my-video" [vgProperty]="'left'" [vgFormat]="'mm:ss'"></vg-time-display>
        <vg-time-display vgFor="my-video" [vgProperty]="'total'" [vgFormat]="'mm:ss'"></vg-time-display>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
