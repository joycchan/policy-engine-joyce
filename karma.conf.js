// Karma configuration
// Generated on Sat May 23 2015 17:21:09 GMT-0700 (PDT)

module.exports = function (config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // bower:js
      "app/bower_components/jquery/dist/jquery.min.js",
      "app/bower_components/angular/angular.js",
      "app/bower_components/angular-bootstrap/ui-bootstrap.js",
      "app/bower_components/angular-bootstrap-checkbox/angular-bootstrap-checkbox.js",
      "app/bower_components/angular-ui-switch/angular-ui-switch.js",
      "app/bower_components/angular-ui-router/release/angular-ui-router.js",
      "app/bower_components/lodash/lodash.min.js",
      "app/bower_components/d3/d3.min.js",
      "app/bower_components/bootstrap/dist/js/bootstrap.min.js",
      "app/bower_components/ngDraggable/ngDraggable.js",
      'app/bower_components/angular-mocks/angular-mocks.js',
      "app/bower_components/angular-xeditable/dist/js/xeditable.js",
      // endbower

      'app/scripts/app.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js',
      'test/spec/**/*.js',
      'app/scripts/**/*.html'
    ],


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,


    preprocessors: {
      'app/scripts/**/*.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      //stripSufix: '.ext',
      // prepend this to the
      //prependPrefix: 'served/',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'policyEngine'
    }
  });
};
