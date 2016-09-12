import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgControls} from './src/vg-controls/vg-controls';
import {VgFullscreen} from './src/vg-controls/vg-fullscreen/vg-fullscreen';
import {VgMute} from './src/vg-controls/vg-mute/vg-mute';
import {VgVolume} from './src/vg-controls/vg-volume/vg-volume';
import {VgPlayPause} from './src/vg-controls/vg-play-pause/vg-play-pause';
import {VgPlaybackButton} from './src/vg-controls/vg-playback-button/vg-playback-button';
import {VgScrubBar} from './src/vg-controls/vg-scrub-bar/vg-scrub-bar';
import {VgScrubBarBufferingTime} from './src/vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time';
import {VgScrubBarCuePoints} from './src/vg-controls/vg-scrub-bar/vg-scrub-bar-cue-points/vg-scrub-bar-cue-points';
import {VgScrubBarCurrentTime} from './src/vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time';
import {VgTimeDisplay} from './src/vg-controls/vg-time-display/vg-time-display';
import {VgTrackSelector} from './src/vg-controls/vg-track-selector/vg-track-selector';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgControls,
        VgFullscreen,
        VgMute,
        VgVolume,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarBufferingTime,
        VgScrubBarCuePoints,
        VgScrubBarCurrentTime,
        VgTimeDisplay,
        VgTrackSelector
    ],
    exports: [
        VgControls,
        VgFullscreen,
        VgMute,
        VgVolume,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarBufferingTime,
        VgScrubBarCuePoints,
        VgScrubBarCurrentTime,
        VgTimeDisplay,
        VgTrackSelector
    ]
})
export class VgControlsModule {}
