## What's Videogular?

Videogular is a framework to develop video apps built on top of Angular. Videogular was created on 2013 for AngularJS and on 2015 we started the port to Angular 2+.

Videogular is different from other GREAT video players like (video.js, jwplayer, etc) because is a wrapper over the HTML5 video tag, so you just can add whatever you want. This provides a very powerful, but simple to use solution, for everybody.

The main features of Videogular are:
- **No support for Flash**: Which makes the code faster and easier to maintain.
- **Web Components**: No need to write JavaScript to create your own player. You can write HTML and CSS code.
- **Extensible**: You can create your own plugins via an intermediate API.
- **Themes**: Write plain CSS to create your own theme. No more JSON objects or config files.
- **Reactive**: Videogular's API is built on top of `rxjs/Observables` so you can listen to changes on the media player reactively.
- **Multicam**: Videogular is conceived as a framework to develop video apps. For that reason we have support for advanced features like having multiple media files inside a video player and control all of them individually or at the same time. For example, four videos synchronized at the same time, each of them is a recorded camera in a motorbike race.
- **Play ANYTHING**: With Videogular you can play literally anything. Thanks to our API you can create your own components to play maps, timers, slides, etc... and still use the same controls.
- **Easy to contribute**: Because it's based on Angular, a very popular framework, it's easy for other people to start contributing by creating plugins or fixing bugs.

To know more about what's possible to do with Videogular I recommend you to watch my talk at ngConf 2017 about Interactive Video Apps:

<div class="intrinsic-container intrinsic-container-16x9">
    <iframe src="https://www.youtube.com/embed/-wXfJvb9Ae0" frameborder="0" allowfullscreen></iframe>
</div>
