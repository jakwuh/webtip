const webpack = require('webpack');
const {resolve} = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function ({paths: {root, dist}, env: {development}}) {
    return {
        devtool: development ? 'source-map' : false,
        target: 'node',
        externals: [nodeExternals()],
        entry: {
            index: [resolve(root, 'src/entries/server.js')]
        },
        output: {
            filename: '[name].js',
            path: resolve(root, 'dist/server')
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
                    test: /\.hbs$/,
                    loader: 'handlebars-loader'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('server', {root: dist}),
            new webpack.DefinePlugin({
                MANIFEST_PATH: JSON.stringify(resolve(root, 'dist/client/manifest.json')),
                ASSETS_PATH: JSON.stringify(resolve(root, 'dist/client/assets')),
                TIPS_PATH: JSON.stringify(resolve(root, '../tips')),
                ROOT_PATH: JSON.stringify(resolve(root, '..'))
            })
        ]

    }
};
