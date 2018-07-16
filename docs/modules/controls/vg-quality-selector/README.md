# VgQualitySelector @Component

Component to display a quality selector.

It will display a list of available videos or audios. `AUTO` will be always the first option and the default option.

The rest of labels are calculated with the `bitrate / 1000`. You can override the labels when you get the `onGetBitrate` event from `VgDASH` or `VgHLS`.

## Inputs

| Input | Description |
|--- |--- |
| bitrates | Array of `BitrateOption` to display in the list. |

## Outputs

| Output | Description |
|--- |--- |
| onBitrateChange | Emitted when the user selects an option on the menu. Sends a `BitrateOption` object. |

## HTML Definition

```html
<vg-player>
    <vg-controls>
        <vg-quality-selector [bitrates]="dashBitrates"
                             (onBitrateChange)="vgDash.setBitrate($event)">
        </vg-quality-selector>
    </vg-controls>

    <video #myMedia
           #vgDash="vgDash"
           [vgDash]="stream.source"
           (onGetBitrates)="dashBitrates = $event"
           id="my-video"
           type="video/mp4"
           controls>
    </video>
</vg-player>
```
