# VgMedia @Directive

The `VgMedia` directive exposes through the `VgAPI` all the events and properties of the element reference passed via the `@Input` property `vgMedia`.

To create the `VgAPI`, Videogular needs that each `VgMedia` directive has an `id` to build an internal map with all media objects.

## Inputs

| Input | Description |
|--- |--- |
| vgMedia | Element reference to a `video` tag, `audio` tag or a @Component that implements `IPlayable` |
| vgMaster | Boolean to define if this `vgMedia` is the master media registered on the `VgAPI` |

## Methods

### play():Promise<any>

Call to the `play` method of the element reference passed via the `@Input` property `vgMedia`. This usually is a `video` or `audio` element.

### pause():void

Call to the `pause` method of the element reference passed via the `@Input` property `vgMedia`. This usually is a `video` or `audio` element.

### seekTime(value:number, byPercent:boolean = false):void

Seek to an specified `value` by second or percentage defined by `byPercent` property.

### addTextTrack(type:'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata', label?:string, language?:string, mode?:'disabled' | 'hidden' | 'showing')

Create a `TextTrack` dynamically. You can add `VTTCue` objects using the `addCue` method available in the `TextTrack` class.

## Properties

### id [read-only] :string

Returns the `id` of the element.

### duration [read-only] :number

Returns the `duration` in seconds.

### currentTime [read-write] :number

Returns the `currentTime` in seconds.

### volume [read-write] :number

Returns the `volume` value (between 0 and 1).

### playbackRate [read-write] :number

Returns the `playbackRate`. Where `1` is normal speed and `2` is double speed.

### buffered [read-only] :TimeRanges

Returns a <a href="https://developer.mozilla.org/en/docs/Web/API/TimeRanges">`TimeRanges`</a> object as defined by the HTML5 API.

### time [read-only] :{ current: 0, total: 0, left: 0 };

Returns an object with `current`, `total` and `left` properties in milliseconds of the element.

### subscriptions [read-only] :IMediaSubscriptions;

Returns an `IMediaSubscriptions` object of event subscriptions to subscribe to several `Observables`.

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

### canPlay [read-only] :boolean;

Returns a `boolean` value to know if the element can start playing.

### canPlayThrough [read-only] :boolean;

Returns a `boolean` value to know if the element can start playing without buffering.

### isBufferDetected [read-only] :boolean;

Returns a `boolean` value to know if buffer has been detected.

### isMetadataLoaded [read-only] :boolean;

Returns a `boolean` value to know if the metadata has been loaded.

### isWaiting [read-only] :boolean;

Returns a `boolean` value to know if the element is waiting for buffer.

### isCompleted [read-only] :boolean;

Returns a `boolean` value to know if the element has been completed.

### isLive [read-only] :boolean;

Returns a `boolean` value to know if the element is a live streaming

### textTracks [read-only] :TextTrackList

Returns a `TextTrackList` object. Use this array to get your track to add and remove `VTTCue` objects dynamically.

## HTML Definition

```html
<vg-player>
    <video #myMedia
           [vgMedia]="myMedia"
           [vgMaster]="true" id="my-video"
           src="http://static.videogular.com/assets/videos/videogular.mp4"
           type="video/mp4">
    </video>
</vg-player>
```
