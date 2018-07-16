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

        <vg-time-display vgProperty="current" vgFormat="mm:ss"></vg-time-display>

        <vg-scrub-bar>
            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
        </vg-scrub-bar>

        <vg-time-display vgProperty="left" vgFormat="mm:ss"></vg-time-display>
        <vg-time-display vgProperty="total" vgFormat="mm:ss"></vg-time-display>

        <vg-track-selector></vg-track-selector>
        <vg-mute></vg-mute>
        <vg-volume></vg-volume>

        <vg-fullscreen></vg-fullscreen>
    </vg-controls>

    <video [vgMedia]="media" #media id="singleVideo" preload="auto" crossorigin>
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

- **abort**: Fired when the loading of the media has been aborted.
- **canPlay**: Fired when enough data is available that the media can be played, at least for a couple of frames. This corresponds to the `HAVE_ENOUGH_DATA` readyState.
- **canPlayThrough**: Fired when the ready state changes to `CAN_PLAY_THROUGH`, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the `currentTime` will eventually fire a `canplaythrough` event in firefox. Other browsers might not fire this event.
- **durationChange**: Fired when the duration of the media has changed.
- **emptied**: Fired when the current playlist has been emptied.
- **encrypted**: Fired when the current media must be decrypted by the Encrypted Media Extensions API.
- **ended**: Fired when playback completes.
- **error**: Fired when an error occurs.  The element's error attribute contains more information.
- **loadedData**: Fired when the current frame of the media has been loaded.
- **loadedMetadata**: Fired when the media's metadata has finished loading; all attributes now contain as much useful information as they're going to.
- **loadStart**: Fired when the browser starts loading the media.
- **pause**: Fired when playback is paused.
- **play**: Fired when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event.
- **playing**: Fired when the media begins to play (either for the first time, after having been paused, or after ending and then restarting).
- **progress**: Fired periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's `buffered` attribute.
- **rateChange**: Fired when the playback rate of the media has been changed.
- **seeked**: Fired when a seek operation completes.
- **seeking**: Fired when a seek operation begins.
- **stalled**: Fired when the browser is trying to get media data but the data is not available.
- **suspend**: Fired when the browser is intentionally not getting media data.
- **timeUpdate**: Fired when the time indicated by the element's `currentTime` attribute has changed.
- **volumeChange**: Fired when the audio volume changes (both when the volume is set and when the muted attribute is changed).
- **waiting**: Fired when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
- **startAds**: Fired when an advertisement started. This event will only be triggered if you have the Videogular Google IMA in your media player.
- **endAds**: Fired when an advertisement completes. This event will only be triggered if you have the Videogular Google IMA in your media player.

Event information extracted from MDN: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
