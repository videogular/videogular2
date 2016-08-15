System.config({
    map: {
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'videogular2': 'node_modules/videogular2',
        'audio-player': 'build'
    },
    packages: {
        'audio-player': {
            main: 'audio-player.js',
            defaultExtension: 'js'
        },
        '@angular/core': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/compiler': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/common': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/http': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/platform-browser': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/platform-browser-dynamic': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/router-deprecated': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'videogular2': {
            defaultExtension: 'js'
        }
    }
});