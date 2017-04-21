## Master media

Master media is a new feature introduced in Videogular 2 that allows you to have several `vgMedia` and decide which one is the main media.

This is very useful on some cases. Let's imagine an scenario where we have two videos playing simultaneously, quickly some questions will come.
* What should the control bar duration display if videos have different length?
* And the current time? And the volume?
* What's the state of the video player if one video is playing and the other is paused?

To solve all this questions we can use a Master media.

In this example we have two videos and `masterVideo` is the master video because we added `[vgMaster]="true"`. When a `vgMedia` is defined as master all other events and properties are ignored by `VgAPI` so all components will only be notified when a change on the master media have been happened.

```html
<vg-player>
    <vg-controls>
        <vg-play-pause></vg-play-pause>

        <vg-scrub-bar>
            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>

        <vg-time-display vgProperty="left" vgFormat="mm:ss"></vg-time-display>

        <vg-mute></vg-mute>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video [vgMedia]="master" #master [vgMaster]="true" id="masterVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
    </video>

    <video [vgMedia]="slave" #slave id="slaveVideo" preload="auto">
        <source src="http://static.videogular.com/assets/videos/vr-demo.mp4" type="video/mp4">
    </video>
</vg-player>

```

So in this case all components will response to `masterVideo` and will show the values only of that video.

Now, what happens with the user interactions? A click on play will trigger a play on both medias? The answer is yes and we have also a way to control user interactions against each media object.

## Targets

Targets is another awesome and shiny feature introduced in Videogular2. With targets you can lead user interactions to a selected media.

For example, you can have a split screen with two videos and each one with its own control bar.

Now you can add `vgFor="video-id"` to decide which `vgMedia` target when a user interacts with that component.

```html
<vg-player>
    <div class="left">
        <vg-controls>
            <vg-play-pause vgFor="leftVideo"></vg-play-pause>
    
            <vg-scrub-bar vgFor="leftVideo">
                <vg-scrub-bar-current-time vgFor="leftVideo"></vg-scrub-bar-current-time>
                <vg-scrub-bar-buffering-time vgFor="leftVideo"></vg-scrub-bar-buffering-time>
            </vg-scrub-bar>
    
            <vg-time-display vgvgProperty="left" vgvgFormat="mm:ss"></vg-time-display>
    
            <vg-mute vgFor="leftVideo"></vg-mute>
    
            <vg-fullscreen vgFor="leftVideo"></vg-fullscreen>
        </vg-controls>
    
        <video [vgMedia]="left" #left id="leftVideo" preload="auto">
            <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
        </video>
    </div>

    <div class="right">
        <vg-controls>
            <vg-play-pause vgFor="rightVideo"></vg-play-pause>
    
            <vg-scrub-bar vgFor="rightVideo">
                <vg-scrub-bar-current-time vgFor="rightVideo"></vg-scrub-bar-current-time>
                <vg-scrub-bar-buffering-time vgFor="rightVideo"></vg-scrub-bar-buffering-time>
            </vg-scrub-bar>
    
            <vg-time-display vgFor="rightVideo" vgvgProperty="left" vgvgFormat="mm:ss"></vg-time-display>
    
            <vg-mute vgFor="rightVideo"></vg-mute>
    
            <vg-fullscreen vgFor="rightVideo"></vg-fullscreen>
        </vg-controls>
        
        <video [vgMedia]="right" #right id="rightVideo" preload="auto">
            <source src="http://static.videogular.com/assets/videos/vr-demo.mp4" type="video/mp4">
        </video>
    </div>
</vg-player>

```

Of course, you can combine both `vgMaster` and `vgFor` to display data from master but interact with one component, or even you can have a play button for each media but a whole control bar that can control all medias!

The possibilities are endless!

