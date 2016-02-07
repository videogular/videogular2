import {Component} from 'angular2/core';
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';
import {SingleMediaPlayer} from "./single-media-player";
import {MultipleMediaPlayer} from "./multiple-media-player";
import {AudioPlayer} from "./audio-player";

@Component({
    selector: 'vg-demo',
    templateUrl: './src/app.html',
    styles: [
        `
        :host {
            display: block;
            margin: 0 auto;
            max-width: 1200px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        :host header {
            width: 94%;
            padding: 3%;
            color: white;
            background-color: #507EB3;
        }

        :host aside {
            width: 24%;
            height: 100%;
            position: fixed;
            color: white;
            background-color: #507EB3;
        }

        :host aside nav {
            width: 97%;
            color: white;
            background-color: #507EB3;
            padding: 0 1.5% 0 1.5%;
        }

        :host aside nav ul {
            padding: 0;
            list-style-type: none;
        }

        :host aside nav ul li a {
            text-decoration: none;
            color: #ffffff;
            font-size: 1.2em;
            width: 100%;
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
            width: calc(76% - 60px);
            padding-left: 30px;
            padding-right: 30px;
            float: right;
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
    ROUTER_PROVIDERS
]);
