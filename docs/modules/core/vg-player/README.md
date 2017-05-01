# VgPlayer @Component

Main component responsible of the creation of the API. This should be your root component and all videogular components must be placed inside this component.

To create the `VgAPI`, Videogular needs that each `VgMedia` directive has an `id` to build an internal map with all media objects.

## Outputs

| Output | Description |
|--- |--- |
| onPlayerReady | Triggered when player have been initialized. Returns a `VgAPI` instance. |

## HTML Definition

```html
<vg-player (onPlayerReady)="onPlayerReady($event)">
    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
