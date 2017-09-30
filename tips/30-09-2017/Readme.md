With the release of [puppeteer][2] it's now very easy to start using Chrome headless for solving various tasks. One such task is using it as a browser for running tests with `karma`. Back then we usually used `PhantomJS` that had a lot of JS syntax unsupported and really wasn't updated for years.

#### Using [karma-chrome-launcher][3]

There is a `karma-chrome-launcher` package that launches Chrome and executes tests in it. A typical config looks like:

```js
// karma.conf.js
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'tests/index.js'
        ],

        preprocessors: {
            '**/*.js': ['sourcemap']
        },

        reporters: ['dots'],
        port: 32345,
        colors: true,

        browsers: ['CustomChrome'],

        customLaunchers: {
            'CustomChrome': {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox'
                ],
                debug: true
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-sourcemap-loader'
        ]
    });
};
```


#### Running ChromeHeadless on a raw linux

To run ChromeHeadless on a bare linux a few packages are required. To install them use the following command:

```bash
apt-get update && \
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

#### Links

[Discussion on running `puppeteer` on a raw linux][1]  
[karma-chrome-launcher][2]

[1]: https://github.com/GoogleChrome/puppeteer/issues/290
[2]: https://github.com/GoogleChrome/puppeteer
[3]: https://github.com/karma-runner/karma-chrome-launcher
