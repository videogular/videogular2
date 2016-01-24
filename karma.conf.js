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
            // paths loaded by Karma
            'node_modules/zone.js/dist/zone-microtask.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',

            'node_modules/es6-module-loader/dist/es6-module-loader.js',

            'node_modules/traceur/bin/traceur-runtime.js', // Required by PhantomJS2, otherwise it shouts ReferenceError: Can't find variable: require
            'node_modules/traceur/bin/traceur.js',

            'node_modules/systemjs/dist/system.src.js',
            'node_modules/reflect-metadata/Reflect.js',

            {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},

            {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it


            // paths loaded via module imports
            {pattern: 'dist/**/*.js', included: false, watched: true},

            // paths to support debugging with source maps in dev tools
            {pattern: 'src/**/*.ts', included: false, watched: false},
            {pattern: 'dist/**/*.js.map', included: false, watched: false},

            'karma-test-shim.js'
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

        browsers: ['Chrome'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher'
        ],

        // Coverage reporter generates the coverage
        reporters: ['progress', 'dots', 'coverage'],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'dist/**/!(*spec).js': ['coverage']
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
    }

    config.set(configuration);
};
