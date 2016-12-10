module.exports = function(config) {
    var configuration = {

        // Only for travis
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        basePath: '.',

        frameworks: ['jasmine'],

        files: [
            // Polyfills.
            'node_modules/es6-shim/es6-shim.js',

            'node_modules/reflect-metadata/Reflect.js',

            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/systemjs/dist/system-polyfills.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            // RxJs.
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },


            // paths loaded via module imports
            // Angular itself
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true},

            {pattern: 'karma-test-shim.js', included: true, watched: true},

            // Our built application code
            {pattern: 'buffering/**/*.js', included: false, watched: true},
            {pattern: 'controls/**/*.js', included: false, watched: true},
            {pattern: 'core/**/*.js', included: false, watched: true},
            {pattern: 'ima-ads/**/*.js', included: false, watched: true},
            {pattern: 'overlay-play/**/*.js', included: false, watched: true},
            {pattern: 'slides/**/*.js', included: false, watched: true},
            {pattern: 'streaming/**/*.js', included: false, watched: true},

            // paths to support debugging with source maps in dev tools
            {pattern: 'buffering/**/*.ts', included: false, watched: false},
            {pattern: 'controls/**/*.ts', included: false, watched: false},
            {pattern: 'core/**/*.ts', included: false, watched: false},
            {pattern: 'ima-ads/**/*.ts', included: false, watched: false},
            {pattern: 'overlay-play/**/*.ts', included: false, watched: false},
            {pattern: 'slides/**/*.ts', included: false, watched: false},
            {pattern: 'streaming/**/*.ts', included: false, watched: false}
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            '/buffering/': '/base/buffering/',
            '/controls/': '/base/controls/',
            '/core/': '/base/core/',
            '/ima-ads/': '/base/ima-ads/',
            '/overlay-play/': '/base/overlay-play/',
            '/slides/': '/base/slides/',
            '/streaming/': '/base/streaming/'
        },

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: true,

        browsers: ['Chrome'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-spec-reporter'
        ],

        // Coverage reporter generates the coverage
        reporters: [/*'spec', 'progress',*/ 'dots', 'coverage'],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'buffering/**/!(*spec).js': ['coverage'],
            'controls/**/!(*spec).js': ['coverage'],
            'core/**/!(*spec).js': ['coverage'],
            'ima-ads/**/!(*spec).js': ['coverage'],
            'overlay-play/**/!(*spec).js': ['coverage'],
            'slides/**/!(*spec).js': ['coverage'],
            'streaming/**/!(*spec).js': ['coverage']
        },

        coverageReporter: {
            reporters:[
                {type: 'json', subdir: '.', file: 'coverage-final.json'}
            ]
        },

        singleRun: true
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
        configuration.reporters = ['spec', 'coverage'];
    }

    config.set(configuration);
};
