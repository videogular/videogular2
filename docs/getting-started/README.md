### Getting Started

Create an Angular application with the [Angular CLI]():

```bash
ng new single-media-player --style=scss

```

Now you can install the `videogular2` library and `core-js` typings:

```bash
npm install videogular2 --save
npm install @types/core-js --save-dev
```

## Creating a simple video player

If you want to, you can use the official Videogular font to set icons on your buttons and controls. To do that you need to add a CSS on you `.angular-cli.json` file available on the root of your project.

```json
{
   ...
   "apps": [
       {
           ...
           "styles": [
               "../node_modules/videogular2/fonts/videogular.css",
               "styles.scss"
           ],
           ...
       }
   ],
   ...
}
```

If you want to set your own font and styles, you can set your custom css here or inside `styles.scss`.

To start using Videogular in your project you have to add the Videogular module to your application module.

Open `src/app/app.module.ts` and remove the FormsModule and the HttpModule, we will not need that for this demo. This is how your `app.module.ts` file should like:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {SingleMediaPlayer} from './single-media-player';

@NgModule({
    declarations: [SingleMediaPlayer],
    imports: [
        BrowserModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    providers: [],
    bootstrap: [SingleMediaPlayer]
})
export class AppModule {
}
```

Create your video player with HTML in your template `single-media-player.html`:

```html
<vg-player>
    <vg-overlay-play></vg-overlay-play>
    <vg-buffering></vg-buffering>

    <vg-scrub-bar>
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
    </vg-scrub-bar>

    <vg-controls>
        <vg-play-pause></vg-play-pause>
        <vg-playback-button></vg-playback-button>

        <vg-time-display vgProperty="current" vgFormat="mm:ss"></vg-time-display>

        <vg-scrub-bar style="pointer-events: none;"></vg-scrub-bar>

        <vg-time-display vgProperty="left" vgFormat="mm:ss"></vg-time-display>
        <vg-time-display vgProperty="total" vgFormat="mm:ss"></vg-time-display>

        <vg-track-selector></vg-track-selector>
        <vg-mute></vg-mute>
        <vg-volume></vg-volume>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video [vgMedia]="media" #media id="singleVideo" preload="auto" crossorigin>
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        <source src="http://static.videogular.com/assets/videos/videogular.ogg" type="video/ogg">
        <source src="http://static.videogular.com/assets/videos/videogular.webm" type="video/webm">

        <track kind="subtitles" label="English" src="http://static.videogular.com/assets/subs/pale-blue-dot.vtt" srclang="en" default>
        <track kind="subtitles" label="Español" src="http://static.videogular.com/assets/subs/pale-blue-dot-es.vtt" srclang="es">
    </video>
</vg-player>

```

And run the app:

```bash
npm run start
```

And this is how it should look:

// TODO: Insert iframe with demo
