// Karma configuration
// Generated on Wed Jan 09 2019 19:31:22 GMT-0800 (PST)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: ['src/components/**/tests/*-test.js', 'src/components/**/*.ts'],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.ts': ['typescript'],
        },

        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                sourceMap: false, // (optional) Generates corresponding .map file.
                target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'umd', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
                removeComments: true, // (optional) Do not emit comments to output.
                concatenateOutput: false, // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
            },
            // transforming the filenames
            transformPath: function(path) {
                return path.replace(/\.ts$/, '.js');
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true, // If debugging, flip this to false and the test page persists

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // Add TDD testing
        client: {
            mocha: {
                ui: 'tdd',
            },
        },
    });
};
