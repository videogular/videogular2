import {Component, bind} from 'angular2/core';
import {RouteConfig, Router, Location, LocationStrategy, HashLocationStrategy, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {SingleMediaPlayer} from "./single-media-player";
import {MultipleMediaPlayer} from "./multiple-media-player";
import {AudioPlayer} from "./audio-player";
import {BoundPlayer} from "./bound-player";
import {CuePointsPlayer} from "./cue-points-player";

@Component({
    selector: 'vg-demo',
    templateUrl: 'src/app.html',
    styles: [
        `
        :host {
            display: block;
            margin: 0 auto;
            max-width: 1200px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        :host header {
            padding: 10px 30px;
            color: white;
            background-color: #507EB3;
            z-index: 1;
            position: relative;
        }

        :host aside {
            width: 250px;
            height: 100%;
            position: fixed;
            top: 0;
            padding-top: 100px;
            color: white;
            background-color: #507EB3;
        }

        :host aside nav {
            width: 100%;
            color: white;
            background-color: #507EB3;
        }

        :host aside nav ul {
            padding: 0;
            list-style-type: none;
        }

        :host aside nav ul li a {
            text-decoration: none;
            color: #ffffff;
            font-size: 1.2em;
            width: calc(100% - 20px);
            display: inline-block;
            padding: 10px;
        }

        :host aside nav ul li a:hover {
            color: #507EB3;
            background-color: white;
            text-decoration: none;
        }

        :host aside nav ul li a.router-link-active {
            color: #507EB3;
            background-color: white;
            text-decoration: none;
        }

        :host section {
            padding-left: 280px;
            padding-right: 30px;
            margin: auto;
        }

        :host section .router-container {
            margin: 0 auto;
        }
        `
    ],
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    {path: '/single-media-player', name: 'SingleMediaPlayer', component: SingleMediaPlayer, useAsDefault: true},
    {path: '/multiple-media-player', name: 'MultipleMediaPlayer', component: MultipleMediaPlayer},
    {path: '/audio-player', name: 'AudioPlayer', component: AudioPlayer},
    {path: '/bound-player', name: 'BoundPlayer', component: BoundPlayer},
    {path: '/cue-points-player', name: 'CuePointsPlayer', component: CuePointsPlayer},
    {path: '/**', redirectTo: ['SingleMediaPlayer']}
])
export class VgDemo {
    private activeView:string;

    constructor(private router:Router, private location: Location) {

    }

    ngOnInit() {
        this.router.subscribe(() => {
            this.activeView = this.location.path();
        });
    }
}

bootstrap(VgDemo, [
    ROUTER_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);
