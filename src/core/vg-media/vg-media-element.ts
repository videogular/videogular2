import { IMediaElement } from './i-media-element';

export class VgMediaElement implements IMediaElement {
    id: string;
    elem: any;
    get audioTracks(): AudioTrackList { return null; };
    autoplay: boolean;
    buffered: TimeRanges;
    controls: boolean;
    crossOrigin: string | any;
    currentSrc: string;
    currentTime: number;
    defaultMuted: boolean;
    defaultPlaybackRate: number;
    duration: number;
    ended: boolean;
    error: MediaError;
    loop: boolean;
    mediaKeys: MediaKeys | any;
    msAudioCategory: string;
    msAudioDeviceType: string;
    msGraphicsTrustStatus: MSGraphicsTrust;
    msKeys: MSMediaKeys;
    msPlayToDisabled: boolean;
    msPlayToPreferredSourceUri: string;
    msPlayToPrimary: boolean;
    msPlayToSource: any;
    msRealTime: boolean;
    muted: boolean;
    networkState: number;
    onencrypted: (ev: MediaEncryptedEvent) => any;
    onmsneedkey: (ev: MSMediaKeyNeededEvent) => any;
    paused: boolean;
    playbackRate: number;
    played: TimeRanges;
    preload: string;
    readyState: number;
    seekable: TimeRanges;
    seeking: boolean;
    src: string;
    srcObject: MediaStream | any;
    textTracks: TextTrackList;
    videoTracks: VideoTrackList;
    volume: number;
    HAVE_CURRENT_DATA: number;
    HAVE_ENOUGH_DATA: number;
    HAVE_FUTURE_DATA: number;
    HAVE_METADATA: number;
    HAVE_NOTHING: number;
    NETWORK_EMPTY: number;
    NETWORK_IDLE: number;
    NETWORK_LOADING: number;
    NETWORK_NO_SOURCE: number;

    addTextTrack(kind: string, label?: string, language?: string): TextTrack {
        return null;
    }

    canPlayType(type: string): string {
        return null;
    }

    load(): void {
    }

    msClearEffects(): void {
    }

    msGetAsCastingSource(): any {
        return null;
    }

    msInsertAudioEffect(activatableClassId: string, effectRequired: boolean, config?: any): void {
    }

    msSetMediaKeys(mediaKeys: MSMediaKeys): void {
    }

    msSetMediaProtectionManager(mediaProtectionManager?: any): void {
    }

    pause(): void {
    }

    play(): Promise<any> {
        return null;
    }

    setMediaKeys(mediaKeys: MediaKeys | any): Promise<void> {
        return null;
    }

    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
    }
}
