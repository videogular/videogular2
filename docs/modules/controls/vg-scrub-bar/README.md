# VgScrubBar @Component

Component to act as container for other scrub bar components.

This component also has listeners to seek when user clicks or drag in the scrub bar.

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to listen to play/pause events (used to auto hide controls). This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| vgSlider | Boolean value to set if we want to enable drag and drop events. Default is `true`. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-scrub-bar vgFor="my-video" [vgSlider]="false">
            <!-- more components here -->
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
