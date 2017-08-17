Webpack 2 introduced a new way for dynamic module importing:

```js
import('./a.js').then(module => {
    // do whatever you want
})
```

However, it has 2 major issues:

1. How to name a chunk?
2. How to create an async bundle containing multiple modules?

With webpack 1 we have used to do it with the following syntax:

```js
require.ensure(['./a.js', './b.js'], () => {
    // here we go
}, 'async-chunk-name');
```

This creates an async chunk named **async-chunk-name** which contains 2 modules: `a.js` and `b.js`.

After arguing a bit about which syntax to choose to support the same features in new webpack versions, the community [has come to the next decision][1]:

```js
import(/* webpackChunkName: "async-import" */'./a.js');

Promise.all([
    import(/* webpackChunkName: "async-imports" */'./b.js'),
    import(/* webpackChunkName: "async-imports" */'./c.js')
]);
```

So, you may think I have written something weird: naming chunks by commenting them out. However this is the [current solution][2].

From my point of view [a better solution][3] would be:

```js
// unnamed chunk w/ exactly 1 module
importModules('./a.js');

// named chunk w/ exactly 1 module
importModules('./a.js', 'async-import')

// unnamed chunk containing multiple modules
importModules([
    './b.js',
    './c.js'
])

// named chunk containing multiple modules
importModules([
    './b.js',
    './c.js'
], 'async-imports')
```

This is primarly the case when `babel` comes out.

Keep your eyes open and look forward to the plugin implementation in the next tip!

[1]: https://github.com/webpack/webpack/issues/1949
[2]: https://github.com/webpack/webpack/issues/1949#issuecomment-289289959
[3]: https://github.com/jakwuh/webpack-named-imports-demo/blob/master/src/index.js
[4]: https://github.com/jakwuh/babel-plugin-webpack-named-dynamic-imports
