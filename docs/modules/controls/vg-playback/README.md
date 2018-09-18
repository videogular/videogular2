# VgPlaybackButton @Component

Button to toggle between different playback speeds.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to toggle between playback speeds. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| playbackValues | Array with playback speed values in string format. Default value `[ '0.5', '1.0', '1.5', '2.0' ]`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-playback-button vgFor="my-video" [playbackValues]="[ '1.0', '2.0', '4.0' ]"></vg-playback-button>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
