## How Videogular works

Videogular relies heavily on HTML5 standards allowing you to create your own video player just by adding some tags and attributes to your HTML code.

Before you create your first video player first you need to understand the main elements of Videogular.

* **VgPlayer**: Component where you will put all your components, directives and custom elements. It usually will be your root tag.
* **VgMedia**: Directive that will expose properties and events to VgAPI. Usually added to a `video` or `audio` tag.
* **VgAPI**: API exposed by VgPlayer that allows you to control the player from your own Components.

Open up `app.component.html` and let's add the most basic video player that you can create with Videogular:

```html
<vg-player>
    <video [vgMedia]="media" #media id="singleVideo" preload="auto" controls>
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
    </video>
</vg-player>
```

If you run `npm run start` this is what you will see.

<div class="intrinsic-container intrinsic-container-16x9">
    <iframe src="https://videogular.github.io/videogular2-showroom/#/simple-player?standalone=true" frameborder="0" allowfullscreen></iframe>
</div>

Obviously, this is too basic and probably we want to add some custom controls to skin it properly.

## Adding more components

Let's go to add an overlay play and a custom control bar.

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

<div class="intrinsic-container intrinsic-container-16x9">
    <iframe src="https://videogular.github.io/videogular2-showroom/#/single-player?standalone=true" frameborder="0" allowfullscreen></iframe>
</div>

This is great! We can add some Videogular components to have a nice UI for our video player. Notice for example that we have two VgScrubBar components. that's because it's a smart component that can work inside and outside VgControls.

The VgScrubBar inside controls has a `pointer-events: none;` to avoid clicks on it but it's necessary to create some space between components. Of course, if you like, you can remove it and create your own `div` with a `class` and it will do the job too. That's the good thing about using custom elements!

You can also disable slider events in the VgScrubBar using the vgSlider attribute (true is default):
```html
    <vg-scrub-bar [vgSlider]="false">
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
    </vg-scrub-bar>
```

Optionally, a circle can be shown in VgScrubBarCurrentTime using the same vgSlider attribute (false is default):

```html
    <vg-scrub-bar [vgSlider]="true">
        <vg-scrub-bar-current-time [vgSlider]="true"></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
    </vg-scrub-bar>
```

One of the most important things that you need to understand is that all components are not going to work if you don't add a `vgMedia` directive to the `video` tag. So remember to add at least one `vgMedia` on each player.

Now that we know how to create a simple player let's see in the next page how to create a more complex player.
