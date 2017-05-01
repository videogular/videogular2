# VgUtcPipe @Pipe

Pipe used internally by `VgTimeDisplay` to display numbers in UTC date format.

Currently `VgUtcPipe` can display hours, minutes or seconds with masks `hh`, `mm` and `ss` respectively.


## HTML Definition

```html
<vg-player>
    <vg-controls>
        <span>{{ myCalculatedTime | vgUtc:'hh:mm:ss' }}</span>
    </vg-controls>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
