'use strict';

const ENV = 'development';

process.env.BABEL_ENV = ENV;
process.env.NODE_ENV = ENV;

require('dotenv').config();

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const paths = require('./paths');

const publicPath = process.env.PUBLIC_PATH || '/';

module.exports = {
  mode: ENV,
  devtool: 'cheap-module-eval-source-map',
  // Application entrypoints
  entry: [
    `webpack-hot-middleware/client?path=${publicPath}__webpack_hmr&timeout=20000&reload=true`,
    require.resolve('./polyfills'),
    paths.appSrc,
  ],
  // Webpack output
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
  },
  resolve: {
    modules: [
      'node_modules',
      'src',
    ],
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  // Loader configurations
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.sourceDir,
      },
      {
        oneOf: [
          {
            test: /\.(bmp|gif|jpe?g|png)$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            loader: require.resolve('babel-loader'),
            exclude: /node_modules/,
            include: paths.sourceDir,
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: JSON.stringify({
          PUBLIC_PATH: publicPath,
          NODE_ENV: process.env.NODE_ENV,
        }),
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.favicon,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
};
