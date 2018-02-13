## videogular2/ima-ads

Module to display VAST compatible advertisement with [Google IMA library](https://developers.google.com/interactive-media-ads/docs/sdks/html5/).

To use this module you need to add this script to your `head` tag and initialize the googletag property before the declaration on the `index.html`:

```html
<script>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
    var gads = document.createElement('script');
    gads.async = true; gads.type = 'text/javascript';
    gads.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
    })();
</script>

<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
```

And you need to initialize googletag property on index.html before the declaration for the script above.

Import definition:

```typescript
...
import { VgImaAdsModule } from 'videogular2/ima-ads';

@NgModule({
    ...
    imports: [
        ...
        VgImaAdsModule
    ],
    ...
})
export class AppModule {
}
```
