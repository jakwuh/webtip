In [the previous tip][1] we have a look at a better webpack dynamic imports:

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
], 'async-imports');
```

Finally, there is a package in npm named [babel-plugin-webpack-named-dynamic-imports][2] which does exactly the same.

While implementing it, I've learned a few *gotchas*.

- The only way to create a valid AST of a code with comments is to use [`babylon`][3]:

```js
let ast = babylon.parse('import(/* webpackChunkName: "test" */"./a.js")')
```

- For some reason `babylon` wasn't able to parse `dynamic import` statement. Both with `babel-plugin-syntax-dynamic-import` plugin enabled and `sourceType: 'module'` option used. This forced me to [hack a bit][4].

Hope you'll find the plugin useful!

**Source code**

```js
CallExpression(path) {
        const node = path.node;

        if (t.isIdentifier(node.callee, {name: 'importModules'})) {
            const elements = [],
                modules = node.arguments[0],
                chunkName = node.arguments[1];

            if (t.isArrayExpression(modules)) {
                modules.elements.forEach(el => elements.push(el));
            } else if (t.isStringLiteral(modules)) {
                elements.push(modules);
            } else {
                throw new Error('Invalid importModules() syntax');
            }

            if (elements.length === 0) {
                path.remove();
            } else if (elements.length === 1) {
                path.replaceWith(generateImport(elements[0], chunkName));
            } else {
                path.replaceWith(generateImports(elements, chunkName));
            }
        }

    }
}
```

[1]: https://github.com/jakwuh/dailytip/tree/master/tips/17-08-2017
[2]: https://github.com/jakwuh/babel-plugin-webpack-named-dynamic-imports
[3]: https://www.npmjs.com/package/babylon
[4]: https://github.com/jakwuh/babel-plugin-webpack-named-dynamic-imports/blob/master/index.js#L7-L21
