A TC39 proposal called [**Optional catch binding**][1] is on its Stage 3 now. It allows to avoid creating unnecessary variable binding in case you want to simply ignore an error (which is useful in a number of cases).

#### Syntax:

```js
try {
    // code
} catch {
    // code
}
```

instead of

```js
try {
    // code
} catch (e) {
    // code
}
```

#### Usage

```bash
yarn add babel-plugin-transform-optional-catch-binding --dev
```

```js
// .babelrc
{
    plugins: [
        'transform-optional-catch-binding'
    ]
}
```

#### Use case

```js
let data;

try {
    data = JSON.parse(string);
} catch {
    data = [];
}

return data;
```

With the release of `babel@7` the plugin will be included in `env` preset by default.

[1]: https://github.com/tc39/proposal-optional-catch-binding
