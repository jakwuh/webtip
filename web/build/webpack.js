const webpack = require('webpack');
const minimist = require('minimist');
const chalk = require('chalk');
const {resolve} = require('path');

const generateClientConfig = require('./configs/webpack.client.js');
const generateServerConfig = require('./configs/webpack.server.js');

const args = minimist(process.argv);
const root = resolve(__dirname, '..');
const watch = !!args.watch;
const development = !!args.development;

const configOptions = {
    paths: {
        root,
        dist: resolve(root, 'dist')
    },
    env: {
        development
    }
};

const clientConfig = generateClientConfig(configOptions);
const serverConfig = generateServerConfig(configOptions);

function run(config) {
    const name = config.target === 'node' ? 'server' : 'client';

    function logCallback(err, stats) {
        console.log(chalk.bold.blue(`[webpack:${name}]:`));

        if (err) {
            console.error(err);
            return;
        }

        console.log(stats.toString({
            modules: false,
            chunks: false,
            colors: true
        }));
    }

    const compiler = webpack(config);

    if (watch) {
        compiler.watch({}, logCallback);
    } else {
        compiler.run(logCallback);
    }
}

run(clientConfig);
run(serverConfig);
