---
currentMenu: master-media
----------------------------

## Master media

Master media is a new feature introduced in Videogular 2 that allows you to have several `vg-media` and decide which one is the main media.

This is very useful on some cases. Let's imagine an scenario where we have two videos playing simultaneously, quickly some questions will come.
* What should the control bar duration display if videos have different length?
* And the current time? And the volume?
* What's the state of the video player if one video is playing and the other is paused?

To solve all this questions we can use a Master media.

In this example we have two videos and `masterVideo` is the master video because we added `vg-master="true"`. When a `vg-media` is defined as master all other events and properties are ignored by `VgAPI` so all components will only be notified when a change on the master media have been happened.

```html
<vg-player>
    <vg-controls>
        <vg-play-pause></vg-play-pause>

        <vg-scrub-bar>
            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>

        <vg-time-display property="left" format="mm:ss"></vg-time-display>

        <vg-mute></vg-mute>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video vg-media vg-master="true" id="masterVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
    </video>

    <video vg-media id="slaveVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/vr-demo.mp4" type="video/mp4">
    </video>
</vg-player>

```

So in this case all components will response to `masterVideo` and will show the values only of that video.

Now, what happens with the user interactions? A click on play will trigger a play on both medias? The answer is yes and we have also a way to control user interactions against each media object.

## Targets

Targets is another awesome and shiny feature introduced in Videogular2. With targets you can lead user interactions to a selected media.

For example, you can have a split screen with two videos and each one with its own control bar.

Now you can add `vg-for="video-id"` to decide which `vg-media` target when a user interacts with that component.

```html
<vg-player>
    <div class="left">
        <vg-controls>
            <vg-play-pause vg-for="leftVideo"></vg-play-pause>
    
            <vg-scrub-bar vg-for="leftVideo">
                <vg-scrub-bar-current-time vg-for="leftVideo"></vg-scrub-bar-current-time>
                <vg-scrub-bar-buffering-time vg-for="leftVideo"></vg-scrub-bar-buffering-time>
            </vg-scrub-bar>
    
            <vg-time-display property="left" format="mm:ss"></vg-time-display>
    
            <vg-mute vg-for="leftVideo"></vg-mute>
    
            <vg-fullscreen vg-for="leftVideo"></vg-fullscreen>
        </vg-controls>
    
        <video vg-media id="leftVideo" preload="auto">
            <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        </video>
    </div>

    <div class="right">
        <vg-controls>
            <vg-play-pause vg-for="rightVideo"></vg-play-pause>
    
            <vg-scrub-bar vg-for="rightVideo">
                <vg-scrub-bar-current-time vg-for="rightVideo"></vg-scrub-bar-current-time>
                <vg-scrub-bar-buffering-time vg-for="rightVideo"></vg-scrub-bar-buffering-time>
            </vg-scrub-bar>
    
            <vg-time-display vg-for="rightVideo" property="left" format="mm:ss"></vg-time-display>
    
            <vg-mute vg-for="rightVideo"></vg-mute>
    
            <vg-fullscreen vg-for="rightVideo"></vg-fullscreen>
        </vg-controls>
        
        <video vg-media id="rightVideo" preload="auto">
            <source src="http://static.videogular.com/assets/videos/vr-demo.mp4" type="video/mp4">
        </video>
    </div>
</vg-player>

```

Of course, you can combine both `vg-master` and `vg-for` to display data from master but interact with one component, or even you can have a play button for each media but a whole control bar that can control all medias!

The possibilities are endless!

