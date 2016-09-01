---
currentMenu: getting-started
----------------------------

### Getting Started

Use npm to install Videogular as a dependency:

```bash
npm install videogular2 --save
```

Create an Angular application with TypeScript:

```typescript
import {Component} from '@angular/core';
import {VgPlayer} from 'videogular2/core';
import {VgControls, 
        VgPlayPause, 
        VgScrubBar, 
        VgScrubBarCurrentTime, 
        VgScrubBarBufferingTime, 
        VgMute, 
        VgFullscreen} from 'videogular2/controls';
import {VgOverlayPlay} from 'videogular2/overlay-play';

@Component({
    selector: 'my-player',
    templateUrl: 'src/my-player.html',
    directives: [
        VgPlayer,
        VgOverlayPlay,
        VgControls, 
        VgPlayPause, 
        VgScrubBar, 
        VgScrubBarCurrentTime, 
        VgScrubBarBufferingTime, 
        VgMute, 
        VgFullscreen
    ]
})
export class MyPlayer {}

bootstrap(MyPlayer);
```

Create your video player with HTML in your template:

```html
<vg-player>
    <vg-overlay-play></vg-overlay-play>

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

        <vg-mute></vg-mute>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video vg-media id="singleVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        <source src="http://static.videogular.com/assets/videos/videogular.ogg" type="video/ogg">
        <source src="http://static.videogular.com/assets/videos/videogular.webm" type="video/webm">
    </video>
</vg-player>
```

