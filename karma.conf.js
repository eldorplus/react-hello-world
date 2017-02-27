module.exports = function (karma) {  // eslint-disable-line func-names
  karma.set({

    frameworks: ['browserify', 'jasmine'],

    files: [
      'test/app/**/*.spec.js',
    ],

    reporters: ['spec', 'coverage'],

    preprocessors: {
      'test/app/**/*.spec.js': ['babel', 'browserify', 'coverage'],
    },

    browsers: ['PhantomJS'],

    logLevel: karma.LOG_DEBUG,

    singleRun: true,

    captureTimeout: 60000,
    browserify: {
      debug: true,
      transform: ['babelify', 'brfs', 'browserify-shim'],
    },

    coverageReporter: {
      dir: 'coverage',
      subdir: (browser) => {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      file: 'index.html',
    },
  });
};
