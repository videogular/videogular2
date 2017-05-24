# VgHLS @Directive

Component to stream with HLS an m3u8 playlist.

You can combine `VgDASH` and `VgHLS` together. If you pass a VOD file (that means, not HLS or DASH) it will fallback to the native video implementation.

In this example `currentStream` can contain either an `mpd`, `m3u8` or `mp4` file.

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


This module is dependant of `hls.js` library and you need to install via `npm install hls.js --save` and include it on your `.angular-cli.json` config file:

```json
{
    ...
    "apps": [
        {
            ...
            "scripts": [
                "../node_modules/hls.js/dist/hls.min.js"
            ],
            ...
        }
    ],
    ...
}

```

## Inputs

| Input | Description |
|--- |--- |
| vgHls | Url to an HLS m3u8 file. |

## HTML Definition

```html
<vg-player>
    <video #myMedia
           [vgHls]="'http://static.videogular.com/assets/videos/videogular.m3u8'"
           id="my-video"
           type="video/mp4"
           controls>
    </video>
</vg-player>
```
