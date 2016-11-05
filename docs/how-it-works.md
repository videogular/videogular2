---
currentMenu: how-it-works
----------------------------

## How Videogular works

Videogular relies heavily on HTML5 standards allowing you to create your own video player just by adding some tags and attributes to your HTML code.

Before you create your first video player first you need to understand the main elements of Videogular.

* VgPlayer: Component where you will put all your components, directives and custom elements. It usually will be your root tag.
* VgMedia: Directive that will expose properties and events to VgAPI. Usually added to a `video` or `audio` tag.
* VgAPI: API exposed by VgPlayer that allows you to control the player from your own Components.

For example, this is the most basic video player that you can create with Videogular:

```html
<vg-player>
    <video vg-media id="singleVideo" preload="auto" controls>
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
    </video>
</vg-player>
```

Obviously, this is too basic and probably we want to add some custom controls to skin it properly.

## Adding more components

Let's go to add an overlay play and a custom control bar.

```html
<vg-player>
    <vg-overlay-play></vg-overlay-play>

    <vg-scrub-bar>
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
    </vg-scrub-bar>

    <vg-controls>
        <vg-play-pause></vg-play-pause>

        <vg-time-display property="current" format="mm:ss"></vg-time-display>

        <vg-scrub-bar style="pointer-events: none;"></vg-scrub-bar>

        <vg-time-display property="left" format="mm:ss"></vg-time-display>
        <vg-time-display property="total" format="mm:ss"></vg-time-display>

        <vg-mute></vg-mute>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video vg-media id="singleVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
    </video>
</vg-player>

```

This is great! We can add some Videogular components to have a nice UI for our video player. Notice for example that we have two VgScrubBar components. that's because it's a smart component that can work inside and outside VgControls.

The VgScrubBar inside controls has a `pointer-events: none;` to avoid clicks on it but it's necessary to create some space between components. Of course, if you like, you can remove it and create your own `div` with a `class` and it will do the job too. That's the good thing about using custom elements!

One of the most important things that you need to understand is that all components are not going to work if you don't add a `vg-media` directive to the `video` tag. So remember to add at least one `vg-media` on each player.

Now you can create your TypeScript file and compile/bundle with your favourite setup.

```typescript
// Module
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

// Media Player Component
import {Component} from "@angular/core";

@Component({
    selector: 'single-media-player',
    templateUrl: 'src/single-media-player.html'
})
export class SingleMediaPlayer {}
```

Now that we know how to create a simple player let's see in the next page how to create a more complex player.

<a href="master-media.html">Go to Master Media</a>
