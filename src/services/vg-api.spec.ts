import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {VgAPI} from "../services/vg-api";
import {VgFullscreenAPI} from "../services/vg-fullscreen-api";
import {VgEvents} from "../events/vg-events";


describe('Videogular Player', () => {
    let api:VgAPI;

    beforeEach(() => {
        api = new VgAPI();
    });

    it('Should initialize fullscreen api when api is created', () => {
        spyOn(VgFullscreenAPI, 'init').and.callFake(() => {});
        api = new VgAPI();
        expect(VgFullscreenAPI.init).toHaveBeenCalled();
    });

    it('Should get the default media', () => {
        api.medias = {
            main: {id: 'main'},
            secondary: {id: 'secondary'}
        };

        expect(api.getDefaultMedia()).toEqual({id: 'main'});
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

        var duration = api.duration;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('duration');
    });

    it('Should set a state', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.state = 'pause';

        expect(api.$$setAllProperties).toHaveBeenCalledWith('state', 'pause');
    });

    it('Should get state', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var state = api.state;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('state');
    });

    it('Should set a currentTime', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.currentTime = 50;

        expect(api.$$setAllProperties).toHaveBeenCalledWith('currentTime', 50);
    });

    it('Should get currentTime', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var currentTime = api.currentTime;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('currentTime');
    });

    it('Should set a volume', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.volume = 0.5;

        expect(api.$$setAllProperties).toHaveBeenCalledWith('volume', 0.5);
    });

    it('Should get volume', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var volume = api.volume;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('volume');
    });

    it('Should set a playback rate', () => {
        spyOn(api, '$$setAllProperties').and.callFake(() => {});

        api.playbackRate = 0.5;

        expect(api.$$setAllProperties).toHaveBeenCalledWith('playbackRate', 0.5);
    });

    it('Should get playbackRate', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var playbackRate = api.playbackRate;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('playbackRate');
    });

    it('Should get canPlay', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var canPlay = api.canPlay;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('canPlay');
    });

    it('Should get canPlayThrough', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var canPlayThrough = api.canPlayThrough;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('canPlayThrough');
    });

    it('Should get isMetadataLoaded', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var isMetadataLoaded = api.isMetadataLoaded;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('isMetadataLoaded');
    });

    it('Should get isWaiting', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var isWaiting = api.isWaiting;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('isWaiting');
    });

    it('Should get isCompleted', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var isCompleted = api.isCompleted;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('isCompleted');
    });

    it('Should get time', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var time = api.time;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('time');
    });

    it('Should get buffer', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var time = api.buffer;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('buffer');
    });

    it('Should get buffered', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var buffered = api.buffered;

        expect(api.$$getAllProperties).toHaveBeenCalledWith('buffered');
    });

    it('Should get subscriptions', () => {
        spyOn(api, '$$getAllProperties').and.callFake(() => {});

        var subscriptions = api.subscriptions;

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
        var media = {
            currentTime: 0
        };

        api.$$seek(<HTMLVideoElement>media, 10);

        expect(media.currentTime).toBe(10);
    });

    it('Should seek media files to a specified time by percentage', () => {
        var media = {
            duration: 200,
            currentTime: 0,
            subscriptions: {}
        };

        api.$$seek(<any>media, 10, true);

        expect(media.currentTime).toBe(20);
    });

    it('Should get a property from all media objects and return an object', () => {
        api.medias = {
            main: {id: 'main', state: 'play'},
            secondary: {id: 'secondary', state: 'pause'}
        };

        var states = api.$$getAllProperties('state');

        expect(states).toEqual({
            main: 'play',
            secondary: 'pause'
        });
    });

    it('Should get a property from all media objects and return a plain value if there is only one media object', () => {
        api.medias = {
            main: {id: 'main', state: 'play'}
        };

        var states = api.$$getAllProperties('state');

        expect(states).toEqual('play');
    });

    it('Should set a property to all media objects', () => {
        api.medias = {
            main: {id: 'main', state: 'stop'},
            secondary: {id: 'secondary', state: 'stop'}
        };

        api.$$setAllProperties('state', 'play');

        expect((<any>api.medias).main.state).toBe('play');
        expect((<any>api.medias).secondary.state).toBe('play');
    });

    it('Should register a new media object', () => {
        var media = {id: 'main'};

        spyOn(api, 'connect').and.callFake(() => {});

        api.registerMedia(media);

        expect((<any>media).time.current).toBe(0);
        expect((<any>media).time.total).toBe(0);
        expect((<any>media).time.left).toBe(0);
        expect((<any>media).buffer.end).toBe(0);
        expect((<any>media).canPlay).toBeFalsy();
        expect((<any>media).canPlayThrough).toBeFalsy();
        expect((<any>media).isMetadataLoaded).toBeFalsy();
        expect((<any>media).isWaiting).toBeFalsy();
        expect((<any>media).isCompleted).toBeFalsy();
        expect((<any>media).state).toBe('pause');

        expect((<any>api.medias).main).toBe(media);

        expect(api.connect).toHaveBeenCalledWith(media);

        spyOn(api, '$$seek').and.callFake(() => {});

        (<any>media).seekTime(10);
        (<any>media).seekTime(20, true);

        expect(api.$$seek).toHaveBeenCalledWith(media, 10, false);
        expect(api.$$seek).toHaveBeenCalledWith(media, 20, true);
    });

    it('Should enter videogular element to fullscreen mode', () => {
        api.videogularElement = {id: 'vgElem'};

        spyOn(VgFullscreenAPI, 'isFullscreen').and.callFake(() => {return false;});
        spyOn(VgFullscreenAPI, 'request').and.callFake(() => {});

        api.toggleFullscreen();

        expect(VgFullscreenAPI.isFullscreen).toHaveBeenCalled();
        expect(VgFullscreenAPI.request).toHaveBeenCalledWith(api.videogularElement);
    });

    it('Should enter other element to fullscreen mode', () => {
        var element = {id: 'main'};

        api.videogularElement = {id: 'vgElem'};

        spyOn(VgFullscreenAPI, 'isFullscreen').and.callFake(() => {return false;});
        spyOn(VgFullscreenAPI, 'request').and.callFake(() => {});

        api.toggleFullscreen(element);

        expect(VgFullscreenAPI.isFullscreen).toHaveBeenCalled();
        expect(VgFullscreenAPI.request).toHaveBeenCalledWith(element);
    });

    it('Should exit from fullscreen mode', () => {
        spyOn(VgFullscreenAPI, 'isFullscreen').and.callFake(() => {return true;});
        spyOn(VgFullscreenAPI, 'exit').and.callFake(() => {});

        api.toggleFullscreen();

        expect(VgFullscreenAPI.isFullscreen).toHaveBeenCalled();
        expect(VgFullscreenAPI.exit).toHaveBeenCalled();
    });

    it('Should return if player is in fullscreen mode', () => {
        spyOn(VgFullscreenAPI, 'isFullscreen').and.callFake(() => {});

        api.isFullscreen();

        expect(VgFullscreenAPI.isFullscreen).toHaveBeenCalled();
    });

    it('Should subscribe to media listeners through Observables', () => {
        var media = {
            id: 'main',
            subscriptions: {}
        };

        api.connect(media);

        expect((<any>media.subscriptions).canPlay).toBeDefined();
        expect((<any>media.subscriptions).canPlayThrough).toBeDefined();
        expect((<any>media.subscriptions).loadedMetadata).toBeDefined();
        expect((<any>media.subscriptions).waiting).toBeDefined();
        expect((<any>media.subscriptions).progress).toBeDefined();
        expect((<any>media.subscriptions).ended).toBeDefined();
        expect((<any>media.subscriptions).playing).toBeDefined();
        expect((<any>media.subscriptions).play).toBeDefined();
        expect((<any>media.subscriptions).pause).toBeDefined();
        expect((<any>media.subscriptions).timeUpdate).toBeDefined();
        expect((<any>media.subscriptions).volumeChange).toBeDefined();
        expect((<any>media.subscriptions).error).toBeDefined();
    });

    it('Should handle onCanPlay event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', canPlay: false},
            secondary: {id: 'secondary', canPlay: false}
        };

        api.onCanPlay(event);

        expect((<any>api.medias).main.canPlay).toBeTruthy();
    });

    it('Should handle onCanPlayThrough event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', canPlayThrough: false},
            secondary: {id: 'secondary', canPlayThrough: false}
        };

        api.onCanPlayThrough(event);

        expect((<any>api.medias).main.canPlayThrough).toBeTruthy();
    });

    it('Should handle onLoadMetadata event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', isMetadataLoaded: false, duration: 97.317, time: {total: 0}},
            secondary: {id: 'secondary', isMetadataLoaded: false, duration: 297.317, time: {total: 0}}
        };

        api.onLoadMetadata(event);

        expect((<any>api.medias).main.isMetadataLoaded).toBeTruthy();
        expect((<any>api.medias).main.time.total).toBe(97317);
    });

    it('Should handle onWait event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', isWaiting: false},
            secondary: {id: 'secondary', isWaiting: false}
        };

        api.onWait(event);

        expect((<any>api.medias).main.isWaiting).toBeTruthy();
    });

    it('Should handle onComplete event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', isCompleted: false, state: 'play'},
            secondary: {id: 'secondary', isCompleted: false, state: 'play'}
        };

        api.onComplete(event);

        expect((<any>api.medias).main.isCompleted).toBeTruthy();
        expect((<any>api.medias).main.state).toBe('pause');
    });

    it('Should handle onStartPlaying event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', state: 'pause'},
            secondary: {id: 'secondary', state: 'pause'}
        };

        api.onStartPlaying(event);

        expect((<any>api.medias).main.state).toBe('play');
    });

    it('Should handle onPlay event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', state: 'pause'},
            secondary: {id: 'secondary', state: 'pause'}
        };

        api.onPlay(event);

        expect((<any>api.medias).main.state).toBe('play');
    });

    it('Should handle onPause event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {id: 'main', state: 'play'},
            secondary: {id: 'secondary', state: 'play'}
        };

        api.onPause(event);

        expect((<any>api.medias).main.state).toBe('pause');
    });

    it('Should handle onTimeUpdate event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {
                id: 'main',
                currentTime: 12.345,
                duration: 97.317,
                buffered: {
                    length: 2,
                    end: () => {
                        return 40;
                    }
                },
                time: {
                    current: 0,
                    left: 0
                },
                buffer: {
                    end: 0
                }
            }
        };

        spyOn((<any>api.medias).main.buffered, 'end').and.callThrough();

        api.onTimeUpdate(event);

        expect((<any>api.medias).main.buffered.end).toHaveBeenCalledWith(1);
        expect((<any>api.medias).main.time.current).toBe(12345);
        expect((<any>api.medias).main.time.left).toBe(84972);
        expect((<any>api.medias).main.buffer.end).toBe(40000);
    });

    it('Should handle onTimeUpdate event before metadata is loaded', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {
                id: 'main',
                currentTime: 12.345,
                duration: 97.317,
                buffered: {
                    length: 0,
                    end: () => {
                        return 40;
                    }
                },
                time: {
                    current: 0,
                    left: 0
                },
                buffer: {
                    end: 0
                }
            }
        };

        spyOn((<any>api.medias).main.buffered, 'end').and.callThrough();

        api.onTimeUpdate(event);

        expect((<any>api.medias).main.buffered.end).not.toHaveBeenCalled();
    });

    it('Should handle onProgress event', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {
                id: 'main',
                buffered: {
                    length: 2,
                    end: () => {
                        return 40;
                    }
                },
                buffer: {
                    end: 0
                }
            }
        };

        spyOn((<any>api.medias).main.buffered, 'end').and.callThrough();

        api.onProgress(event);

        expect((<any>api.medias).main.buffered.end).toHaveBeenCalledWith(1);
        expect((<any>api.medias).main.buffer.end).toBe(40000);
    });

    it('Should handle onProgress event before metadata is loaded', () => {
        var event = {
            target: {
                id: 'main'
            }
        };

        api.medias = {
            main: {
                id: 'main',
                buffered: {
                    length: 0,
                    end: () => {
                        return 40;
                    }
                },
                buffer: {
                    end: 0
                }
            }
        };

        spyOn((<any>api.medias).main.buffered, 'end').and.callThrough();

        api.onProgress(event);

        expect((<any>api.medias).main.buffered.end).not.toHaveBeenCalled();
    });

    it('Should handle onVolumeChange event', () => {
        api.onVolumeChange('main');
    });

    it('Should handle onError event', () => {
        api.onError('main');
    });
});
