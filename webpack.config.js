const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/zelda.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/,
  //       exclude: /(node_modules)/,
  //       use: {
  //         loader: 'babel-loader',
  //         query: {
  //           presets: ['@babel/env', '@babel/react']
  //         }
  //       },
  //     }
  //   ]
  // },
  devtool: 'source-map'
};