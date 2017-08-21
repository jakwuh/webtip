const {resolve} = require('path');
const root = __dirname;

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
  }
}
