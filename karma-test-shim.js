// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};
function isJsFile(path) {
    return path.slice(-3) == '.js';
}

function isSpecFile(path) {
    return path.slice(-8) == '.spec.js' && path.indexOf('node_modules') < 0;
}

function isBuiltFile(path) {
    var includedPaths = '/base/';
    return isJsFile(path) && (path.substr(0, includedPaths.length) === includedPaths);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

// Load our SystemJS configuration.
System.config(
    {
        paths: {
            // paths serve as alias
            'npm:': 'base/node_modules/'
        },
        map: {
            'rxjs': 'npm:rxjs',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // angular testing umd bundles
            '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
            '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
            '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
            '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
            '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
            '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',

            'buffering': 'base/buffering/',
            'controls': 'base/controls/',
            'core': 'base/core/',
            'ima-ads': 'base/ima-ads/',
            'overlay-play': 'base/overlay-play/',
            'slides': 'base/slides/',
            'streaming': 'base/streaming/'
        },
        packages: {
            'buffering': {
                defaultExtension: 'js'
            },
            'controls': {
                defaultExtension: 'js'
            },
            'core': {
                defaultExtension: 'js'
            },
            'ima-ads': {
                defaultExtension: 'js'
            },
            'overlay-play': {
                defaultExtension: 'js'
            },
            'slides': {
                defaultExtension: 'js'
            },
            'streaming': {
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            }
        }
    });

Promise
    .all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing')
    ])
    .then(
        function (providers) {
            var testing = providers[0];
            var testingBrowser = providers[1];

            testing.TestBed.initTestEnvironment(
                testingBrowser.BrowserDynamicTestingModule,
                testingBrowser.platformBrowserDynamicTesting()
            );
        }
    )
    .then(
        function () {
            // Finally, load all spec files.
            // This will run the tests directly.
            return Promise.all(
                allSpecFiles.map(function (moduleName) {
                    return System.import(moduleName);
                }));
        }
    )
    .then(
        __karma__.start, __karma__.error
    );

