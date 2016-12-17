import {VgScrubBarCurrentTime} from "./vg-scrub-bar-current-time";
import {VgAPI} from "../../../core/services/vg-api";
import {ElementRef} from "@angular/core";

describe('Scrub bar current time', () => {
    let scrubBarCurrentTime: VgScrubBarCurrentTime;
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

        scrubBarCurrentTime = new VgScrubBarCurrentTime(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(api, 'getMediaById');

        scrubBarCurrentTime.vgFor = 'test';
        scrubBarCurrentTime.onPlayerReady();

        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });

    describe('getPercentage', () => {
        it('should return 50% when current time is 10 and total time is 20', () => {
            scrubBarCurrentTime.target = {
                time: {
                    current: 10,
                    total: 20
                }
            };

            let percent = scrubBarCurrentTime.getPercentage();

            expect(percent).toEqual('50%');
        });

        it('should return 25% when current time is 5 and total time is 20', () => {
            scrubBarCurrentTime.target = {
                time: {
                    current: 5,
                    total: 20
                }
            };

            let percent = scrubBarCurrentTime.getPercentage();

            expect(percent).toEqual('25%');
        });
    });
});
