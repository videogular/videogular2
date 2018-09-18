# VgControls @Component

Component to act as container for other components.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to listen to play/pause events (used to auto hide controls). This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| vgAutohide | Boolean value to set if we want to enable auto hide controls when video is playing. Default is `false`. |
| vgAutohideTime | Number value to specify in seconds when the controls should automatically hide after video plays. Default is `3`. |

## HTML Definition

```html
<vg-player>
    <vg-controls vgFor="my-video" [vgAutohide]="true" [vgAutohideTime]="5">
        <!-- more components here -->
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
