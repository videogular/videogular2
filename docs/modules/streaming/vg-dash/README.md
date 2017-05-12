# VgDASH @Directive

Component to stream with DASH an `mpd` file.

You can combine `VgDASH` and `VgHLS` together. If you pass a VOD file (that means, not HLS or DASH) it will fallback to the native video implementation.

In this example you can pass either an `mpd`, `m3u8` or `mp4` file.

```html
<vg-player>
    <video #media
           [vgMedia]="media"
           [vgDash]="currentStream"
           [vgHls]="currentStream"
           id="singleVideo"
           controls
           crossorigin>
    </video>
</vg-player>
```

## Inputs

| Input | Description |
|--- |--- |
| vgDash | Url to DASH `mpd` file. |

## HTML Definition

```html
<vg-player>
    <video #myMedia
           [vgDash]="'http://static.videogular.com/assets/videos/videogular.mpd'"
           id="my-video"
           type="video/mp4"
           controls>
    </video>
</vg-player>
```
