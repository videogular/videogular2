import {VgAPI} from "../services/vg-api";

export class VgAbstractControl {
    constructor(api:VgAPI) {
        api.playerReadyEvent.subscribe((api) => this.onPlayerReady());
    }

    onPlayerReady() {
        throw new Error('onPlayerReady must be implemented by all controls');
    }
}
