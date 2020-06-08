const path = require('path');
const fs = require('fs');

const rootDir = fs.realpathSync(process.cwd());

const resolve = relativePath => path.resolve(rootDir, relativePath);

module.exports = {
  appSrc: resolve('src/index.jsx'),
  appHtml: resolve('public/index.html'),
  appBuild: resolve('build/dist'),
  serverBuild: resolve('build'),
  sourceDir: resolve('src'),
  favicon: resolve('public/favicon.ico'),
};
