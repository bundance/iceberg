module.exports = function (config) {

    config.set({

        // list of files / patterns to load in the browser
        files: [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/bower_components/angular-resource/angular-resource.js',
            'public/bower_components/angular-sanitize/angular-sanitize.js',
            'public/bower_components/angular-route/angular-route.js',
            'public/bower_components/underscore/underscore.js',
            'public/scripts/app/app.js',
            'public/scripts/components/**/*.module.js',
            'public/scripts/components/**/*.service.js',
            'public/scripts/components/**/*.controller.js',
            'public/scripts/components/**/*.directive.js',
            'public/scripts/app/*.controller.js',
            'public/scripts/app/*.service.js',
            'public/scripts/testing/jasmineMatchers/*.js',
            'public/scripts/testing/mocks/mockMovies.js',
            'public/scripts/components/**/*.spec.js',
            'public/scripts/app/*.spec.js'
        ],

        // list of files to exclude
        exclude: [],


        proxies: {},

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,
        autoWatch: true,
        usePolling: true,

        // frameworks to use
        frameworks: ['jasmine'],
        browsers : ['ChromeDesktop'],

        customLaunchers: {
            ChromeDesktop: {
                base: 'Chrome',
                flags: ['--window-size=1280,720']
            }
        },

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-mocha-reporter'
        ],

        // Test results reporter to use
        // possible values: 'dots', 'progress', 'mocha', 'junit', 'growl', 'coverage'
        reporters: ['mocha'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true

    });
};



