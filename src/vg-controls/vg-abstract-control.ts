import {VgAPI} from "../services/vg-api";

export class VgAbstractControl {
    constructor(api:VgAPI) {
        api.playerReadyEvent.subscribe((api:VgAPI) => this.onPlayerReady());
    }

    onPlayerReady() {
        throw new Error('onPlayerReady must be implemented by all controls');
    }
}
