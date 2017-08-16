[`webpack.CommonsChunkPlugin`][1] has an option named `minChunks` which looks pretty clear and simple at first sight but actually provides a neat control on what is included into `commons` chunk. Also there are a few more obscure options like `children` and `async`. We are giving a human-understandable explanations for them here and solving an interesting bundling task.

`children: boolean` - should we use child chunks of an entry chunks for building the `commons` one? `child` chunk is a chunk which is loaded asynchronously and usually created with `require.ensure` or `import()` syntax. That means setting `children` to `true` will build the `commons` chunk out of usual chunks and their asynchronous children. The `commons` chunk will become larger, while having a common code not only for entry chunks but also for their asynchronous children. Still if we want to separate a common code into two parts: a common code for entry chunks and a common code for asynchronous chunks - we could use an `async` option for that:

`async: boolean|string` - should we create a separate chunk for a common code of asynchronous chunks? If so and we also want to provide a custom filename for that chunk we should use a string as an `async` value.

`minChunks: Infinity` - create a chunk with **only** webpack bootstrapping code.

`minChunks: number` - include a module in the `commons` chunk if only it has not less than `number` references from other modules.

`minChunks: (module, count) => boolean` - include a module in a `commons` chunk if a function returns `true`.

The `minChunks` power is hidden behind the `function` syntax. Lets see it.

#### Task

Include a `lodash` library in the `commons` chunk. Also the `commons` chunk should include all other modules which were referenced more that 2 times.

#### Solution

```js

plugins: [
    entry: {
        vendor: [
        ]
    },
    // ...
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
            return module.resource && module.resource.indexOf('node_modules/lodash') > -1 || count > 2;
        }
    })
]
```

Common mistakes or why this cannot be implemented in another way:
- You cannot use `minChunks: 3` because of some lodash functions may not be referenced for more than 2 times.
- You cannot use `vendor: ['lodash']` because it will include the whole lodash codebase. We want to include only those functions we use.


[1]: https://webpack.js.org/plugins/commons-chunk-plugin/
