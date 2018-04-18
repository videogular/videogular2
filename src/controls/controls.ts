import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgControls } from './vg-controls';
import { VgFullscreen } from './vg-fullscreen/vg-fullscreen';
import { VgMute } from './vg-mute/vg-mute';
import { VgVolume } from './vg-volume/vg-volume';
import { VgPlayPause } from './vg-play-pause/vg-play-pause';
import { VgPlaybackButton } from './vg-playback-button/vg-playback-button';
import { VgScrubBar } from './vg-scrub-bar/vg-scrub-bar';
import { VgScrubBarBufferingTime } from './vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time';
import { VgScrubBarCuePoints } from './vg-scrub-bar/vg-scrub-bar-cue-points/vg-scrub-bar-cue-points';
import { VgScrubBarCurrentTime } from './vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time';
import { VgTimeDisplay, VgUtcPipe } from './vg-time-display/vg-time-display';
import { VgTrackSelector } from './vg-track-selector/vg-track-selector';
import { VgControlsHidden } from '../core/services/vg-controls-hidden';
import { VgQualitySelector } from './vg-quality-selector/vg-quality-selector';

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
        VgUtcPipe,
        VgTrackSelector,
        VgQualitySelector
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
        VgUtcPipe,
        VgTrackSelector,
        VgQualitySelector
    ],
    providers: [ VgControlsHidden ]
})
export class VgControlsModule {
}
