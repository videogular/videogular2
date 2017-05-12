# VgImaAds @Component

Component to display videos and banners with the [Google IMA HTML5 SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/).

## Inputs

| Input | Description |
|--- |--- |
| vgFor | Target media `id` property to play/pause the specified media. This parameter is optional and only necessary if you have more than one media registered into `VgAPI`. |
| vgAdTagUrl | Required. String to the advertisement tag url. |
| vgCompanion | Optional. String with the `id` of a container to display the companion ad. If you want to read more about it, please look [official docs](https://developers.google.com/interactive-media-ads/docs/sdks/html5/companions-gpt). |
| vgCompanionSize | Optional. Array of numbers with sizes of the companion ad. Format: `[width, height]`. |
| vgNetwork | Optional. String with the network id provided by [Google Publisher Tag](https://developers.google.com/doubleclick-gpt/). |
| vgUnitPath | Optional. String with the unit path id provided by [Google Publisher Tag](https://developers.google.com/doubleclick-gpt/). |
| vgSkipButton | Optional. String with a query selector to display a custom skip button. You must set the element with `position` style to `absolute` and `z-index` at least `1`. |

## HTML Definition

```html
<vg-player id="demo-player">
    <vg-ima-ads
        [vgCompanion]="'companion-ad'"
        [vgCompanionSize]="[728, 90]"
        [vgNetwork]="'6062'"
        [vgUnitPath]="'iab_vast_samples'"
        [vgAdTagUrl]="'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='"
        [vgSkipButton]="'.skip-button'">
    </vg-ima-ads>

    <video #myMedia
           [vgMedia]="myMedia"
           id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
<div class='skip-button'>custom skip ad button</div>
<div id="companion-ad"></div>

```
