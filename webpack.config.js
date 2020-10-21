const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'assets', 'js'),
    filename: 'bundle.min.js',
    libraryTarget: 'umd',
  },
  devServer: {
    port: 8080,
    publicPath: '/assets/js',
    open: true,
  },
};