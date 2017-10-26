[3 tips before][2] we discussed the idea about making assertions based on `jsdoc` comments. As the result there is a [`babel-plugin-jsdoc-to-condition`][3] package. In this post we  have a closer look at it.

### How it works

The idea behind the plugin is pretty simple. Assume we have the following function (or `FunctionDeclaration` in terms of babel):

```js
/**
 * @param {number} param - this is a param.
 * @param {string} b - this is a param.
 * @param {string[]} [c] - this is a param.
 */
function lonelyFunction(param, b, c) {
}
```

With the plugin enabled the code above transforms to the following:

```js
/**
 * @param {number} param - this is a param.
 * @param {string} b - this is a param.
 * @param {string[]} [c] - this is a param.
 */
function lonelyFunction(param, b, c) {
  if (!(typeof param === 'number')) {
    console._warn('actual.js:6:0: Expected `param` to have type number, got: ' + typeof param);
  }

  if (!(typeof b === 'string')) {
    console._warn('actual.js:6:0: Expected `b` to have type string, got: ' + typeof b);
  }

  if (!(c === undefined || Array.isArray(c) && c.every(function (n) {
    return typeof n === 'string';
  }))) {
    console._warn('actual.js:6:0: Expected `c` to have type Array.<string>=, got: ' + typeof c);
  }
}
```

### Use cases

The plugin is intended to be used in a *development* / *testing* environment to catch wrong `jsdoc` declarations and thus prevent possible bugs. One should not enable it for production builds.

### Status

✅ Support for `@param` annotation
🔲 Support for `@type` annotation
🔲 Support for `@returns` annotation
🔲 Support for `@typedef` structures
🔲 Support for not imported classes

Let me give some more explanations on the *Support for custom classes* further improvement. Have a look at the annotation:

```js
@param {Foo} model
```

To make an assertion for the annotation above we need a `Foo` class constructor. If it is already imported then the created assertion will simply work. Otherwise we need to import the class ourselves. Currently, created assertion will silently pass, but actually we need to import the class automatically and make the assertion work fairly.

### TIL

- It is possible to validate `jsdoc` at https://eslint.org/doctrine/demo/
- `@param {string=} v` is equal to `@param {string} [v]`
- Babel plugin API has a lot of methods to deal with JS scopes. One of those I have used: `path.scope.hasBinding(<string>)`.
- `babel-plugin-transform-es2015-function-name` changes function parameters names in some specific cases. For instance:

```js
className: function(options, className) {
}
```
transpiles to the following:
```js
className: function className(options, _className) {
}
```
This is important for creating proper assertions from `jsdoc` comments.

[1]: https://github.com/jakwuh/babel-plugin-jsdoc-to-condition
[2]: https://github.com/jakwuh/webtip/tree/master/tips/07-09-2017
[3]: https://www.npmjs.com/package/babel-plugin-jsdoc-to-condition
