# VgControls @Component

Component to display an horizontal slider bar to change the volume of the current media.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to change the volume. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-volume vgFor="my-video"></vg-volume>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
