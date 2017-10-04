As the `babel`'s [blog post][1] states, `typescript` support has been already planned to be included in `7.0` release. Meanwhile the `7.0.0-beta.2` babel version was published offering same features for early adopters.

> By the way, `babel` itself is a monorepository. It is orchestrated by `lerna` described in [the previous tip][4]

First, you need to update a bunch of packages:

```bash
yarn upgrade \
    babel-cli@7.0.0-beta.2 \
    babel-loader@7 \
    babel-plugin-transform-runtime@7.0.0-beta.2 \
    babel-runtime@7.0.0-beta.2 \
    babel-preset-env@2.0.0-beta.2 \
    babel-plugin-transform-typescript@7.0.0-beta.2
```

At this point you could add `transform-typescript` to your babel config:

```js
{
    ...
    plugins: [
        ...
        'transform-typescript'
    ]
}
```

The `transform-typescript` plugin works similar to `transform-flow` plugin - it strips types during compilation.

However, currently there is [a known bug][2] when using `transform-typescript` along with `transform-runtime`. As far as I can understand it, the bug happens due to the following steps:

1. `babel` start traversing a module. `transform-typescript` creates a module metadata which it will then use to strip unnecessary imports
2. Finally `transform-typescript` strips unnecessary imports and remove a module metadata
3. `transform-runtime` then adds a few more imports
4. New imports force `babel` to start traversing a module once more
5. `transform-typescript` has already removed a module metadata so it throws an exception.

To make `transform-typescript` work I've [forked][3] it and made a quick fix based on assumption that any `import` statement added by plugins dynamically shouldn't be transpiled and could be left as-is.

These are the only steps needed to start using `typescript`. Give it a try!

[1]: https://babeljs.io/blog/2017/09/12/planning-for-7.0
[2]: https://github.com/babel/babel/issues/6093
[3]: https://github.com/jakwuh/babel-plugin-transform-typescript
[4]: https://github.com/jakwuh/dailytip/tree/master/tips/03-10-2017
