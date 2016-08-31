import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgPlayer} from './src/vg-player/vg-player';
import {VgMedia} from './src/vg-media/vg-media';
import {VgCuePoints} from './src/vg-cue-points/vg-cue-points';
import {VgAPI} from './src/services/vg-api';
import {VgFullscreenAPI} from './src/services/vg-fullscreen-api';
import {VgUtils} from './src/services/vg-utils';
import {VgEvents} from './src/events/vg-events';
import {VgStates} from './src/states/vg-states';

export * from './src/services/vg-api';
export * from './src/services/vg-fullscreen-api';
export * from './src/services/vg-utils';
export * from './src/events/vg-events';
export * from './src/states/vg-states';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ VgPlayer, VgMedia, VgCuePoints ],
    providers: [ VgAPI, VgFullscreenAPI, VgUtils, VgEvents, VgStates ],
    exports: [ VgPlayer, VgMedia, VgCuePoints ]
})
export class VgCore {}
