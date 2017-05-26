# VgAPI @Injectable Service

Service that controls all media objects inside `vg-player` element.

This service is created by the element `vg-player` when it is instantiated. On component initialization, `vg-player` will register all medias inside of it but you can also register elements outside of `vg-player` element programmatically through the method `registerMedia`.

## Methods

### getDefaultMedia():void

Returns the first media registered to the API.

### getMasterMedia():IPlayable

Returns the master media registered to the API.

### isMasterDefined():boolean

Returns if there is a master media registered to the API.

### getMediaById(id:string = null):any

Returns a media by `id`. The `id` must match with the attribute `id` on the media object.

### play()

Play all medias registered.

### pause()

Pause all medias registered.

### registerElement(elem:HTMLElement)

Registers a new element as container and saves a reference internally in to the `videogularElement` property.

### registerMedia(media:any)

Register a new media element and saves internally a reference in to the `medias` property.

### seekTime(value:number, byPercent:boolean)

Will seek to `value` in seconds or in percentage if `byPercent` is true. By default `byPercent` is false. If there's a master media defined the seek by percentage would be calculated based on master media's duration.

### addTextTrack(type:'subtitles' | 'caption' | 'descriptions' | 'chapters' | 'metadata', label?:string, language?:string, mode?:'disabled' | 'hidden' | 'showing')

Create a track dynamically in all registered `medias`. You can add `VTTCue` objects using the `addCue` method available in the `TextTrack` class.

<hr>

## Properties

### duration [read-only] :number|object

Returns a `number` with media duration or an object with all durations if there are more than one media object registered.

### currentTime [read-write] :number|object

Seeks to a specific time to all medias registered.
Returns a `number` with current time or an object with all current times if there are more than one media object registered.

### state [read-write] :string|object

Updates media state to all medias registered. States can be `play` or `pause`.
Returns a `string` with current state or an object with all states if there are more than one media object registered.

### volume [read-write] :number|object

Updates volume to all medias registered. Volume is a float value between 0 and 1 where 1 is default.
Returns a `number` with current volume or an object with all volumes if there are more than one media object registered.

### playbackRate [read-write] :number|object

Updates playback speed to a specific value to all medias registered. Playback rate is a float value greater than 0 where 1 is default.
Returns a `number` with current playback rate or an object with all rates if there are more than one media object registered.

### canPlay [read-only] :boolean|object

When media object is ready to be played `canPlay` property value is `true`. Default value is `false`. It will return an object with all `canPlay` values if there are more than one media object registered.

### canPlayThrough [read-only] :boolean|object

When media object is ready to be played without buffering `canPlayThrough` property value is `true`. Default value is `false`. It will return an object with all `canPlayThrough` values if there are more than one media object registered.

### isMetadataLoaded [read-only] :boolean|object

When media metadata has been loaded `isMetadataLoaded` property value is `true`. Default value is `false`. It will return an object with all `isMetadataLoaded` values if there are more than one media object registered.

### isWaiting [read-only] :boolean|object

When media is loading data `isWaiting` property value is `true`. Default value is `false`. It will return an object with all `isWaiting` values if there are more than one media object registered.

### isCompleted [read-only] :boolean|object

When a media have been reached the end of the video `isCompleted` property value is `true`. Default value is `false`. It will return an object with all `isCompleted` values if there are more than one media object registered.

### isLive [read-only] :boolean|object

Boolean value to know if the current media is a live stream.

### isMaster [read-only] :boolean|object

Boolean value to know if the current media is the master media.

### time [read-only] :object

Returns an `object` with time information or an object with all times if there are more than one media object registered.

Object definition is:

```json
{
    current: <float>,
    total: <float>,
    left: <float>
}
```

Default value is:

```json
{
    current: 0,
    total: 0,
    left: 0
}
```

### buffer [read-only] :object

Returns an `object` with buffer information or an object with all buffers if there are more than one media object registered.

Object definition is:

```json
{
    end: <float>
}
```

Default value is:

```json
{
    end: 0
}
```

### buffered [read-only] :object

Returns an `object` with buffer information or an object with all buffers if there are more than one media object registered.

This is the native object and is different from `buffer` property which haves basically the same information in a property and transformed to milliseconds.

Object definition is:

```json
{
    end: <function>
    length: :number>
}
```

Default value is `undefined`.

### subscriptions [read-only] :IMediaSubscriptions

Returns an `IMediaSubscriptions` with a list of observables or an object with all observables in all medias if there are more than one media object registered.

### videogularElement [read-write] :object

This property haves a reference to the container element, usually `vg-player` but it could be overridden in case that you're building your own implementation of `vg-player`.

### textTracks [read-only] :TextTrack[]

Returns an array of `TextTrack` objects. Use this array to get your track to add and remove `VTTCue` objects dynamically.
