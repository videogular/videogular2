### Getting Started

Create an Angular application with the [Angular CLI]():

```bash
ng new single-media-player --style=scss

```

Now you can install the `videogular2` library and `core-js` typings:

```bash
npm install videogular2 --save
npm install @types/core-js --save-dev
```

## Adding the icon font

If you want to, you can use the official Videogular font to set icons on your buttons and controls. To do that you need to add a CSS on you `.angular-cli.json` file available on the root of your project.

```json
{
   ...
   "apps": [
       {
           ...
           "styles": [
               "../node_modules/videogular2/fonts/videogular.css",
               "styles.scss"
           ],
           ...
       }
   ],
   ...
}
```

If you want to set your own font and styles, you can set your custom css here or inside `styles.scss`.

## Updating your application module

To start using Videogular in your project you have to add the Videogular module to your application module.

Open `src/app/app.module.ts` and remove the FormsModule and the HttpModule, we will not need that for this demo. This is how your `app.module.ts` file should like:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {SingleMediaPlayer} from './single-media-player';

@NgModule({
    declarations: [SingleMediaPlayer],
    imports: [
        BrowserModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    providers: [],
    bootstrap: [SingleMediaPlayer]
})
export class AppModule {
}
```

Now we're ready to start creating our video player.

In the next section we will see how to create our very first video player!

<a href="how-videogular-works.html">Go to How Videogular Works</a>
