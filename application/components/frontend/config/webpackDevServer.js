'use strict';

require('dotenv').config();

const https = require('https');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');
const webpackConfig = require('./webpack.config.dev');

const PORT = process.env.PORT || 9040;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const HTTPS_OPTIONS = {
  key: fs.readFileSync(path.resolve(__dirname, 'keys/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.resolve(__dirname, 'keys/cert.pem'), 'utf8'),
};

const app = express();

const compiler = webpack(webpackConfig);

app.use(morgan('combined'));

const router = express.Router();

router.use(history());

router.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/',
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
  }),
);

router.use(webpackHotMiddleware(compiler));

app.use(PUBLIC_PATH, router);

https
  .createServer(HTTPS_OPTIONS, app)
  .listen(PORT, () => console.log(`Application listening on HTTPS port ${PORT}`));
