const LodashWebpackPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const {cloneDeep, sortBy} = require('lodash');

const options = {
    shorthands: false,
    cloning: false,
    currying: false,
    caching: false,
    collections: false,
    exotics: false,
    guards: false,
    metadata: false, // (requires currying)
    deburring: false,
    unicode: false,
    chaining: false,
    memoizing: false,
    coercions: false,
    flattening: false,
    paths: false,
    placeholders: false // (requires currying)
}

const config = require('./webpack.config.js');
const keys = [null].concat(Object.keys(options));
let results = [];

function report() {
    sortBy(results, 'size').forEach(({key, size}) => {
        console.log(size, key);
    });
}

keys.forEach(key => {
    let currentConfig = cloneDeep(config);
    let opts = key ? {[key]: true} : {};

    currentConfig.plugins = [
        new LodashWebpackPlugin(opts)
    ];

    const compiler = webpack(currentConfig);

    compiler.run((err, stats) => {
        let json = stats.toJson();

        results.push({
            key,
            size: json.assets[0].size
        });

        if (results.length == keys.length) {
            report();
        }
    });
});
