[Earlier][1] I have explained why `JSDoc` doesn't worth making effort. Still sometimes we have to use it because moving to a type system like Flow or TypeScript may be quite expensive. Here we come to a few questions:

1. How to maintain `JSDoc`? (as far as `JSDoc` is based on comments it is prone to become obsolete)
2. How to increase code quality with `JSDoc`?


[next0][2] suggested me a remarkable idea: we could create runtime assertions out of `JSDoc` comments and put them right into a code while we are in the development environment.

So I have made one step forward: created a [`jsdoc-to-condition`][3] npm package. It has a single clear aim: transform a `jsdoc` comment to a set of validation rules.  

This is the example:

```js
// @param {[string, number?]} a
Array.isArray(a) &&
    (typeof a[0] === 'string') &&
    ((a[1] == null) || (typeof a[1] === 'number'))

// @param {Object.<string, number>} b
(
    !!b &&
    (typeof b === 'object') &&
    !Array.isArray(b)
) && Object.keys(b).every(function (k) {
    return
        (typeof k === 'string') &&
        (typeof b[k] === 'number');
    })

// @param {string|number} c
(typeof c === 'string') || (typeof c === 'number')
```

The next step is to implement a babel plugin which will read comments, build assertions with the `jsdoc-to-condition` package and put them right into the code.

---

Special credits to [next0][2] for sharing the idea

[1]: https://github.com/jakwuh/dailytip/tree/master/tips/27-07-2017/Readme.md
[2]: https://github.com/next0
[3]: https://www.npmjs.com/package/jsdoc-to-condition
