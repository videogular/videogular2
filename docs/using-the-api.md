---
currentMenu: using-the-api
---

## Using the API

Videogular's API is the service that will allow you to control the media objects and listen to any change on them. It's not mandatory to use the API but if you need to control externally the medias or you want to listen to changes you need use it. 

To start using the API first you need to grab it from the player. To do that listen for the event `onPlayerReady` that will get you the API:

```html
<vg-player (onPlayerReady)="onPlayerReady($event)">
    <vg-overlay-play></vg-overlay-play>
    <vg-buffering></vg-buffering>

    <vg-controls>
        <vg-play-pause></vg-play-pause>
        <vg-playback-button></vg-playback-button>

        <vg-time-display property="current" format="mm:ss"></vg-time-display>

        <vg-scrub-bar>
            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>

        <vg-time-display property="left" format="mm:ss"></vg-time-display>
        <vg-time-display property="total" format="mm:ss"></vg-time-display>

        <vg-track-selector></vg-track-selector>
        <vg-mute></vg-mute>
        <vg-volume></vg-volume>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video vgMedia #media id="singleVideo" preload="auto" crossorigin>
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
    </video>
</vg-player>
```

Now on your `Component` get the API:

```typescript
import {Component} from '@angular/core';
import {VgAPI} from 'videogular2/core';

@Component({
    selector: 'bound-player',
    templateUrl: 'src/bound-player.html'
})
export class BoundPlayer {
    preload:string = 'auto';
    api:VgAPI;

    constructor() {}

    onPlayerReady(api:VgAPI) {
        this.api = api;
    }
}
```

Now that you have the API you can listen to changes and perform actions:

```typescript
onPlayerReady(api:VgAPI) {
    this.api = api;
    
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
            // Set the video to the beginning
            this.api.getDefaultMedia().currentTime = 0;
        }
    );
}
```

You have a lot of events to listen:

- **canPlay**: Sent when enough data is available that the media can be played, at least for a couple of frames. This corresponds to the `HAVE_ENOUGH_DATA` readyState.
- **canPlayThrough**: Sent when the ready state changes to `CAN_PLAY_THROUGH`, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the `currentTime` will eventually fire a `canplaythrough` event in firefox. Other browsers might not fire this event.
- **loadedMetadata**: The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.
- **waiting**: Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
- **progress**: Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's `buffered` attribute. 
- **seeking**: Sent when a seek operation begins.
- **seeked**: Sent when a seek operation completes.
- **ended**: Sent when playback completes.
- **playing**: Sent when the media begins to play (either for the first time, after having been paused, or after ending and then restarting). 
- **play**: Sent when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event. 
- **pause**: Sent when playback is paused. 
- **timeUpdate**: he time indicated by the element's currentTime` attribute has changed. 
- **volumeChange**: Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed). 
- **error**: Sent when an error occurs.  The element's error attribute contains more information. 
- **startAds**: Sent when an advertisement started. This event will only be triggered if you have the Videogular Google IMA in your media player. 
- **endAds**: Sent when an advertisement completes. This event will only be triggered if you have the Videogular Google IMA in your media player. 

Event information extracted from MDN: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

<a href="master-media.html">Go to Master Media</a>
