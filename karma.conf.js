module.exports = function (karma) {  // eslint-disable-line func-names
  karma.set({

    frameworks: ['browserify', 'jasmine'],

    files: [
      'src/**/*.spec.js',
    ],

    reporters: ['dots', 'coverage'],

    preprocessors: {
      'src/**/*.spec.js': ['babel', 'browserify', 'coverage'],
    },

    browsers: ['PhantomJS'],

    logLevel: karma.LOG_DEBUG,

    singleRun: true,

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
