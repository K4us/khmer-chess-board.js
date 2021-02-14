const path = require('path');

module.exports = {
  entry: './dev.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'khmer-chess-board.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
};