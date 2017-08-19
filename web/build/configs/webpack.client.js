const WebpackAssetsManifest = require('webpack-assets-manifest');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const {resolve} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function ({paths: {root, dist}, env: {development}}) {
    const baseName = development ? '[name]' : '[name].[chunkhash:8]';

    return {
        context: root,
        entry: {
            index: resolve(root, 'src/entries/client.js'),
            styles: [
                resolve(root, 'node_modules/highlight.js/styles/github.css'),
                resolve(root, 'src/styles/index.css')
            ]
        },
        output: {
            filename: `${baseName}.js`,
            path: resolve(root, 'dist/client/assets'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                }]
        },
        plugins: [
            new CleanWebpackPlugin('client', {root: dist}),
            new ExtractTextPlugin(`${baseName}.css`),
            new WebpackAssetsManifest({
                output: '../manifest.json'
            })
        ]
    }
};
