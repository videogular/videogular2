---
currentMenu: getting-started
---

### Getting Started

Use npm to install Videogular as a dependency:

```bash
npm install videogular2 --save
```

Create an Angular application with TypeScript:

```typescript
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

```

Create a module for your application:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCore} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {SingleMediaPlayer} from './single-media-player';

@NgModule({
    imports: [
        BrowserModule,
        VgCore,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    declarations: [SingleMediaPlayer],
    bootstrap: [SingleMediaPlayer]
})
export class AppModule {
}
```

Create your media player as a component:

```typescript
import {Component} from "@angular/core";

@Component({
    selector: 'single-media-player',
    templateUrl: 'src/single-media-player.html'
})
export class SingleMediaPlayer {
    sources:Array<Object>;

    constructor() {
        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ];
    }
}
```

Create your video player with HTML in your template:

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

        <vg-time-display property="current" format="mm:ss"></vg-time-display>

        <vg-scrub-bar style="pointer-events: none;"></vg-scrub-bar>

        <vg-time-display property="left" format="mm:ss"></vg-time-display>
        <vg-time-display property="total" format="mm:ss"></vg-time-display>

        <vg-track-selector></vg-track-selector>
        <vg-mute></vg-mute>
        <vg-volume></vg-volume>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video vgMedia #media id="singleVideo" preload="auto" crossorigin>
        <source *ngFor="let video of sources" [src]="video.src" [type]="video.type">
        <track kind="subtitles" label="English" src="http://static.videogular.com/assets/subs/pale-blue-dot.vtt" srclang="en" default>
        <track kind="subtitles" label="Español" src="http://static.videogular.com/assets/subs/pale-blue-dot-es.vtt" srclang="es">
    </video>
</vg-player>

```
