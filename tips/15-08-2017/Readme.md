> tldr; Use [lodash-webpack-plugin][1] to significally reduce your bundle size

---

(A real story)

*"[Lodash][2] has so much useless code to support Buffer, Map, Set, Symbol, unicode and other exotics - I have to do something w/ it"* - thought I while looking through the `lodash` codebase. Three days later I have had a fully rewritten `lodash` library with all tests ported, which was 3 times smaller than the original one. Not sleeping too much for those days, I fall into asleep and dreamed about `lodash` having a solution to reduce its size. I waked up quickly and [asked][3] the question. And it turned out `lodash` have **already solved** the size problem with a [lodash-webpack-plugin][1] library:

```js
'plugins': [
    new LodashModuleReplacementPlugin({
        'collections': true,
        'paths': true
    });
    new webpack.optimize.UglifyJsPlugin()
]
```

Moral: don't afraid of asking questions :)

[1]: https://www.npmjs.com/package/lodash-webpack-plugin
[2]: https://lodash.com/docs/
[3]: https://github.com/lodash/lodash/issues/3030
