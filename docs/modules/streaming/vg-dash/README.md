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

This module is dependant of `dashjs` library and you need to install via `npm install dashjs --save` and include it on your `.angular-cli.json` config file:

```json
{
    ...
    "apps": [
        {
            ...
            "scripts": [
                "../node_modules/dashjs/dist/dash.all.min.js"
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
| vgDash | Url to DASH `mpd` file. |
| vgDRMLicenseServer | An object with `IDRMLicenseServer` signature with the license servers. |
| vgDRMToken | Token to validate on license server. |

## HTML Definition

```html
<vg-player>
    <video #myMedia
           [vgDash]="stream.source"
           [vgDRMLicenseServer]="stream.licenseServers"
           [vgDRMToken]="stream.token"
           id="my-video"
           type="video/mp4"
           controls>
    </video>
</vg-player>
```

In your component create a `stream` property

```typescript
stream = {
    source: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd',
    licenseServers: {
        'com.widevine.alpha': {
            serverURL: 'https://widevine-proxy.appspot.com/proxy'
        }
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```
