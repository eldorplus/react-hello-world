const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'jest']
        }
      },
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
  devtool: "source-map"
};

module.exports = config;