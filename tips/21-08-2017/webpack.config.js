const {resolve} = require('path');
const root = __dirname;
const LodashWebpackPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    index: resolve(root, 'src/index')
  },
  output: {
    path: resolve(root, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {
                modules: false
            }]],
            plugins: ['lodash']
          }
        }
    }]
},
plugins: [
    new LodashWebpackPlugin({
      cloning: true,
      coercions: true,
      flattening: true,
      memoizing: true,
      shorthands: true,
      paths: true,
      guards: true,
      caching: true,
      collections: true
    })
]
}
