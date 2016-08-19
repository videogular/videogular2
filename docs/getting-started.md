---
currentMenu: getting-started
----------------------------

### Getting Started

Getting started

<h3>Install</h3>

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

    <vg-controls>
        <vg-play-pause></vg-play-pause>
        <vg-time-display>{{ media?.time?.current | date:'mm:ss' }}</vg-time-display>
        <vg-scrub-bar>
            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>
        <vg-time-display>{{ media?.time?.left | date:'mm:ss' }}</vg-time-display>
        <vg-mute></vg-mute>
        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video #media id="singleVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        <source src="http://static.videogular.com/assets/videos/videogular.ogg" type="video/ogg">
        <source src="http://static.videogular.com/assets/videos/videogular.webm" type="video/webm">
    </video>
</vg-player>
```

