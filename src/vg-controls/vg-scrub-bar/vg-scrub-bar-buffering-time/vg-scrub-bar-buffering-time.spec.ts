import {VgScrubBarBufferingTime} from "./vg-scrub-bar-buffering-time";
import {VgAPI} from "../../../services/vg-api";
import {ElementRef} from "@angular/core";

describe('Scrub bar buffering time', () => {
    let scrubBarBufferingTime: VgScrubBarBufferingTime;
    let ref:ElementRef;
    let api:VgAPI;

    beforeEach(() => {
        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                }
            }
        };

        api = new VgAPI();

        scrubBarBufferingTime = new VgScrubBarBufferingTime(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(scrubBarBufferingTime.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById');

        scrubBarBufferingTime.onPlayerReady();

        expect(scrubBarBufferingTime.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    describe('getPercentage', () => {
        it('should return 50% when buffer end is 10 and total time is 20', () => {
            scrubBarBufferingTime.target = {
                time: {
                    total: 20
                },
                buffer: {
                    end: 10
                },
                buffered: [1]
            };

            let percent = scrubBarBufferingTime.getBufferTime();

            expect(percent).toEqual('50%');
        });

        it('should return 25% when buffer end is 5 and total time is 20', () => {
            scrubBarBufferingTime.target = {
                time: {
                    total: 20
                },
                buffer: {
                    end: 5
                },
                buffered: [1]
            };

            let percent = scrubBarBufferingTime.getBufferTime();

            expect(percent).toEqual('25%');
        });

        it('should return 0% when no buffer is loaded', () => {
            scrubBarBufferingTime.target = {
                buffer: null
            };

            let percent = scrubBarBufferingTime.getBufferTime();

            expect(percent).toEqual('0%');
        });
    });
});
