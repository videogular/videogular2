import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface IVgDemo {
    label: string;
    src: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    currentDemo: SafeResourceUrl;
    selectedDemo: IVgDemo;
    isDemoEnabled = false;

    demos: IVgDemo[] = [
        { label: 'Picture-in-Picture', src: 'https://videogular.github.io/videogular2-showroom/#/master-player?standalone=true' },
        { label: 'Cue points', src: 'https://videogular.github.io/videogular2-showroom/#/cue-points-player?standalone=true' },
        { label: 'Play Anything', src: 'https://videogular.github.io/videogular2-showroom/#/custom-media?standalone=true' },
        { label: 'Advertisement', src: 'https://videogular.github.io/videogular2-showroom/#/google-ima-player?standalone=true' }
    ];

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.updateDemo(this.demos[0]);
    }

    updateDemo(demo: IVgDemo) {
        this.currentDemo = this.sanitizer.bypassSecurityTrustResourceUrl(demo.src);
        this.selectedDemo = demo;
    }
}
