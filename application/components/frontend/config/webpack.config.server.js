'use strict';

const ENV = 'production';

process.env.BABEL_ENV = ENV;
process.env.NODE_ENV = ENV;

const paths = require('./paths');

module.exports = {
  mode: ENV,
  target: 'node',
  node: {
    __dirname: true,
  },
  entry: './server.js',
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
};
