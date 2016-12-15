import {VgAPI} from "../core/services/vg-api";

export class VgAbstractControl {
    constructor(api:VgAPI) {
        api.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        throw new Error('onPlayerReady must be implemented by all controls');
    }
}
