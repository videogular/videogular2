import { Directive, ElementRef } from "@angular/core";

declare var Hls;

@Directive({
    selector: '[vg-hls]'
})
export class VgHLS {
    constructor(private ref:ElementRef) {}

    ngOnInit() {
        if (Hls.isSupported()) {
            var video:HTMLVideoElement = this.ref.nativeElement;
            var hls = new Hls();

            hls.loadSource(this.ref.nativeElement.src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                console.log('manifest parsed');
            });
        }
    }
}
