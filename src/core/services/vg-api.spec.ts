import {VgAPI} from "./vg-api";
import {IPlayable} from "../vg-media/i-playable";
import {VgStates} from "../states/vg-states";

describe('Videogular Player', () => {
    let api:VgAPI;

    beforeEach(() => {
        api = new VgAPI();
    });

    it('Should get the default media', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        expect(api.getDefaultMedia()).toEqual({id: 'main'});
    });

    describe('getMasterMedia', () => {
        it('Should get the master media', () => {
            api.medias = {
                main: {id: 'main'},
                secondary: {id: 'secondary', vgMaster: true}
            };

            expect(api.getMasterMedia()).toEqual({id: 'secondary', vgMaster: true});
        });
        it('Should get the default media when no master is defined', () => {
            api.medias = {
                main: {id: 'main'},
                secondary: {id: 'secondary'}
            };

            expect(api.getMasterMedia()).toEqual(api.getDefaultMedia());
        });
    });

    it('Should get the api if we do not pass an id', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        expect(api.getMediaById()).toEqual(api);
    });

    it('Should get the api if we pass an *', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        expect(api.getMediaById('*')).toEqual(api);
    });

    it('Should get a media object if we pass an id', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        expect(api.getMediaById('main')).toEqual({id: 'main'});
    });

    it('Should play all medias', () => {
        api.medias = {
            main: {id: 'main', play: () => {}},
            secondary: {id: 'secondary', play: () => {}}
        };

        spyOn((<any>api.medias).main, 'play').and.callThrough();
        spyOn((<any>api.medias).secondary, 'play').and.callThrough();

        api.play();

        expect((<any>api.medias).main.play).toHaveBeenCalled();
        expect((<any>api.medias).secondary.play).toHaveBeenCalled();
    });

    it('Should pause all medias', () => {
        api.medias = {
            main: {id: 'main', pause: () => {}},
            secondary: {id: 'secondary', pause: () => {}}
        };

        spyOn((<any>api.medias).main, 'pause').and.callThrough();
        spyOn((<any>api.medias).secondary, 'pause').and.callThrough();

        api.pause();

        expect((<any>api.medias).main.pause).toHaveBeenCalled();
        expect((<any>api.medias).secondary.pause).toHaveBeenCalled();
    });

    it('Should get duration', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let duration = api.duration;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('duration');
    });

    it('Should set a state', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.state = 'pause';

        expect(api.$$setAllProperties).toHaveBeenCalledWith('state', 'pause');
    });

    it('Should get state', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let state = api.state;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('state');
    });

    it('Should set a currentTime', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.currentTime = 50;

        expect(api.$$setAllProperties).toHaveBeenCalledWith('currentTime', 50);
    });

    it('Should get currentTime', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let currentTime = api.currentTime;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('currentTime');
    });

    it('Should set a volume', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.volume = 0.5;

        expect(api.$$setAllProperties).toHaveBeenCalledWith('volume', 0.5);
    });

    it('Should get volume', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let volume = api.volume;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('volume');
    });

    it('Should set a playback rate', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.playbackRate = 0.5;

        expect(api.$$setAllProperties).toHaveBeenCalledWith('playbackRate', 0.5);
    });

    it('Should get playbackRate', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let playbackRate = api.playbackRate;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('playbackRate');
    });

    it('Should get canPlay', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let canPlay = api.canPlay;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('canPlay');
    });

    it('Should get canPlayThrough', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let canPlayThrough = api.canPlayThrough;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('canPlayThrough');
    });

    it('Should get isMetadataLoaded', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let isMetadataLoaded = api.isMetadataLoaded;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('isMetadataLoaded');
    });

    it('Should get isWaiting', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let isWaiting = api.isWaiting;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('isWaiting');
    });

    it('Should get isCompleted', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let isCompleted = api.isCompleted;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('isCompleted');
    });

    it('Should get time', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let time = api.time;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('time');
    });

    it('Should get buffer', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let time = api.buffer;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('buffer');
    });

    it('Should get buffered', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let buffered = api.buffered;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('buffered');
    });

    it('Should get subscriptions', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        let subscriptions = api.subscriptions;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('subscriptions');
    });

    it('Should seek to a specified time by second', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        spyOn(api, '$$seek').and.callFake(() => {});

        api.seekTime(10);

        expect(api.$$seek).toHaveBeenCalledWith({id: 'main'}, 10, false);
        expect(api.$$seek).toHaveBeenCalledWith({id: 'secondary'}, 10, false);
    });

    it('Should seek to a specified time by percentage', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        spyOn(api, '$$seek').and.callFake(() => {});

        api.seekTime(10, true);

        expect(api.$$seek).toHaveBeenCalledWith({id: 'main'}, 10, true);
        expect(api.$$seek).toHaveBeenCalledWith({id: 'secondary'}, 10, true);
    });

    it('Should seek media files to a specified time by second', () => {
        let media = {
            currentTime: 0
        };

        api.$$seek(<IPlayable>media, 10);

        expect(media.currentTime).toBe(10);
    });

    it('Should seek media files to a specified time by percentage', () => {
        let media = {
            duration: 200,
            currentTime: 0,
            subscriptions: {}
        };

        api.$$seek(<any>media, 10, true);

        expect(media.currentTime).toBe(20);
    });

    it('Should get a property from all media objects and return an object', () => {
        api.medias = {
            main: {id: 'main', state: VgStates.VG_PLAYING},
            secondary: {id: 'secondary', state: VgStates.VG_PAUSED}
        };

        let states = api.$$getAllProperties('state');

        expect(states).toEqual(VgStates.VG_PLAYING);
    });

    it('Should get a property from all media objects and return a plain value if there is only one media object', () => {
        api.medias = {
            main: {id: 'main', state: VgStates.VG_PLAYING}
        };

        let states = api.$$getAllProperties('state');

        expect(states).toEqual(VgStates.VG_PLAYING);
    });

    it('Should set a property to all media objects', () => {
        api.medias = {
            main: {id: 'main', state: 'stop'},
            secondary: {id: 'secondary', state: 'stop'}
        };

        api.$$setAllProperties('state', VgStates.VG_PLAYING);

        expect((<any>api.medias).main.state).toBe(VgStates.VG_PLAYING);
        expect((<any>api.medias).secondary.state).toBe(VgStates.VG_PLAYING);
    });

    it('Should register a new media object', () => {
        let media = {id: 'main'};

        api.registerMedia(<IPlayable>media);

        expect(api.medias['main']).toBe(media);
    });

    it('Should register a new media object', () => {
        let media = {id: 'main'};
        api['main'] = {};

        api.unregisterMedia(<IPlayable>media);

        expect(api.medias['main']).toBe(undefined);
    });
});
