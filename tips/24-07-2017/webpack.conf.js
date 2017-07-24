const webpack = require('webpack');
const {join} = require('path');

module.exports = {
  entry: join(__dirname, 'index.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      GLOBAL_JQUERY_NAME: 'jQuery',
      VERSION: JSON.stringify('1.0.0'), // === VERSION: "'1.0.0'",
      FEATURES: {
        PRERENDER: 'true',
        ANIMATIONS: false,
        ADMIN: {
          ENABLED: JSON.stringify('false') // preferably
        }
      }
    })
  ]
}
