module.exports = function(config) {
    var configuration = {
        basePath: '.',

        frameworks: ['jasmine'],

        files: [
            // Polyfills.
            'node_modules/core-js/client/shim.min.js',
            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/zone-testing.js',

            // RxJs.
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },


            // paths loaded via module imports
            // Angular itself
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true},

            {pattern: 'karma-test-shim.js', included: true, watched: true},


            // Our built application code
            {pattern: 'compiled/**/*.js', included: false, watched: true},

            // paths loaded via Angular's component compiler
            // (these paths need to be rewritten, see proxies section)
            // {pattern: 'dist/**/*.html', included: false, watched: true},
            // {pattern: 'dist/**/*.css', included: false, watched: true},

            // paths to support debugging with source maps in dev tools
            {pattern: 'src/**/*.ts', included: false, watched: false}
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            '/src/': '/base/src/'
        },

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: true,

        browsers: ['FirefoxHeadless'],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [ '-headless' ],
            },
        },

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-spec-reporter'
        ],

        // Coverage reporter generates the coverage
        reporters: [/*'spec', 'progress',*/ 'dots', 'coverage'],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'src/**/!(*spec).js': ['coverage']
        },

        coverageReporter: {
            reporters:[
                {type: 'json', subdir: '.', file: 'coverage-final.json'}
            ]
        },

        singleRun: true
    };

    if (process.env.TRAVIS) {
        configuration.reporters = ['spec', 'coverage'];
    }

    config.set(configuration);
};
