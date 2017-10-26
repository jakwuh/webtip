From the [previous tip][1] we have 2 questions unanswered:

- Which options should we enable in `lodash-webpack-plugin`?
- How does `lodash-webpack-plugin` actually reduce the size of a bundle?

To answer them we will repeat 2 simple steps for each option:

1. Enable the option
2. Compile a bundle and see the change of a size

Results table:

|option|size (bytes)|size diff (bytes)|description|
|---|---|---|---|
|none|252516|+0||
|cloning: true|252516|+0|Enables `clone`, `cloneDeep`, `cloneDeepWith`, `cloneWith`. Without enabling this option, `conforms`, `iteratee`, `matches`, `matchesProperty` and `omit` functions start working improperly (they store a reference to *source* objects instead of cloning them, what makes them `dirty` functions)|
|deburring: true|252516|+0|Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.
|chaining: true|252516|+0|Enables [chaining][2]|
|coercions: true|252516|+0|Enables type coercions. Allows passing string when number is expected or float when integer is expected. Basically save us from shooting ourselves in the foot|
|flattening: true|252516|+0|Enables flattening. Without enabling this option one should use `omit(object, ['a', 'b', 'c'])` instead of  `omit(object, 'a', 'b', 'c')`. The same applies to `at`, `bindAll`, `omit`, `pick`, `pullAt` and `rearg` functions|
|memoizing: true|252804|+288|Enables `lodash` [`memoize`][3] function|
|placeholders: true|252941|+425|Enables [placeholders][4] for partials and a few more functions|
|shorthands: true|253059|+543|Enables shorthands for a lot of functions. For example, in lodash `map(object, {a: 2})` is equal to `map(object, matches(cloneDeep({a: 2})))`. Without enabling this option one can't use the latter|
|paths: true|253440|+924|Enables support for deep paths. Without enabling this option `has({a: {b: 2}}, 'a.b')` returns `false` (unlike `true` if the option is enabled). Deep paths also used in `omit`, `pick`, `get`, `property` and a bunch of other functions|
|metadata: true|254291|+1775|Enables wrappers and currying metadata and optimizations. One of such optimizations is to reduce the number of functions invoked when creating a call chain with `partials` method|
|unicode: true|255868|+3352|Enables unicode support. Without enabling this option `size(<unicode str>)` returns an ascii length (a number of bytes) instead of a unicode length|
|guards: true|263942|+11426|Enables guards, again, to prevent shooting ourselves in the foot. Includes type checking|
|caching: true|265833|+13317|Enables `map` and `set` caches, `stack` and proper `indexOf` implementation. Without enabling this option `indexOf([1, 2, NaN, 3], NaN)` returns `-1`|
|collections: true|266848|+14332|Enables support for `Object` in a lot of functions like `filter`, `map`, `reduce`, `forEach`, `every` etc. Without enabling this option listed functions support arrays only|
|currying: true|270972|+18456|Enables support for `curry` (and related) functions|
|exotics: true|275712|+23196|Enables support for `Map`, `Set`, `ArrayBuffer`, `TypedArray` and more|

Legend:  
**option** - an enabled option in a `new LodashWebpackPlugin` constructor  
**size** - the size of a bundle with an appropriate option enabled  
**size diff** - the size of savings if an appropriate option **is not** enabled  
**description** - a description of the functionality which enables an appropriate option

### Analysis

Let's think a bit about the default config for a project (it should be safe enough and meet most of the wide spread requirements).

`coercions` and `guards` options prevent us from shooting ourselves in the foot, so we should definitely enable them. `cloning`, `collections`, `shorthands` and `flattening` options should be enabled as well as they introduce rather popular functionality. We could skip `deburring`, `chaining`, `placeholders`, `metadata`, `unicode`, `currying` and `exotics` options as they do not introduce a widely used functionality. `memoizing`, `paths` and `caching` options should be opt-in actually, but we enable them to make our default config safer.

### Default `lodash-webpack-plugin` config

```js
new LodashWebpackPlugin({
  cloning: true,
  coercions: true,
  flattening: true,
  memoizing: true,
  shorthands: true,
  paths: true,
  guards: true,
  caching: true,
  collections: true
})
```

The described config reduces the size of a `lodash` bundle by **18%**.

### How does `lodash-webpack-plugin` work?

Assume we have the option `memoizing` enabled. `LodashWebpackPlugin` creates a few aliases for `lodash` private & public functions:

```js
'memoizing': [
  ['_memoizeCapped', 'identity'],
  ['memoize', 'identity']
]
```

That means `memoize` function is replaced with `identity`. End of proof.

---

Credits to [@iamakulov][5] and [@drapegnik][6] for asking good questions about `lodash-webpack-plugin`.

[1]: https://github.com/jakwuh/webtip/blob/master/tips/21-08-2017/Readme.md
[2]: https://lodash.com/docs/4.17.4#chain
[3]: https://lodash.com/docs/4.17.4#memoize
[4]: https://lodash.com/docs/4.17.4#partialRight
[5]: https://github.com/iamakulov
[6]: https://github.com/drapegnik
