# VgControlsHidden @Injectable Service

Service to handle when controls are hidden or shown.

The Provider for the Dependency Injection is `vg-player`.

## Methods

### state(value:boolean):void

Sets the state of the controls. Hidden is `true` and shown is `false`. To change this value will execute the `isHidden` Observable.

<hr>

## Properties

### isHidden :Observable<boolean>

Returns an Observable that returns a boolean when the controls are shown (`false`) or hidden (`true`).

## How to use

This is an example of how to use this Service in a Component:

```typescript
// Imports and @Component() decorator
// This component must be inside VgPlayer
export class MyCustomComponent implements OnDestroy {
    subscriptions: Subscription[] = [];

    constructor(private controlsHidden: VgControlsHidden) {

    }

    // @Output from vg-player component
    onPlayerReady() {
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
    }

    hideControls() {
        this.hidden.state(true);
    }

    showControls() {
        this.hidden.state(false);
    }

    onHideControls(state:boolean) {
        console.log('Are controls hidden?', state);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
```
