## videogular2/ima-ads

Module to display VAST compatible advertisement with [Google IMA library](https://developers.google.com/interactive-media-ads/docs/sdks/html5/).

To use this module you need to add this script to your `head` tag on the `index.html`:

```html
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
```

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
