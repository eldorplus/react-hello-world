module.exports = function (karma) {  // eslint-disable-line func-names
  karma.set({

    frameworks: ['browserify', 'jasmine'],

    files: [
      'src/**/*.spec.js',
      'test/**/*.spec.js',
    ],

    reporters: ['dots'],

    preprocessors: {
      'src/**/*.spec.js': ['babel', 'browserify'],
      'test/**/*.spec.js': ['babel', 'browserify'],
    },

    browsers: ['PhantomJS', 'Chrome'],

    logLevel: karma.LOG_DEBUG,

    singleRun: true,

    // browserify configuration
    browserify: {
      debug: true,
      transform: ['babelify', 'brfs', 'browserify-shim'],
    },
    phantomjsLauncher: {
      exitOnResourceError: true,
    },
  });
};
