const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

let config = {};

config.entry = [
  SRC_DIR + '/client/js/index.jsx'
];

config.output = {
  path: DIST_DIR + '/client/js',
  publicPath: '/js/',
  filename: 'bundle.js'
};

config.module = {
  rules: [
    {
      test: /\.js(x|)$/,
      include: SRC_DIR,
      exclude: /(node_modules|bower_components)/,
      use: ['babel']
    }
  ]
};

module.exports = config;
