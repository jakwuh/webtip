[Daniel Ehrenberg][3]'s [pipeline operator][1] proposal is at the stage 1. It works similar to `lodash` `chain` wrapper, allowing to transform nested functions calls into a waterfall:

```js
let result = [1, 2, 3]
  |> _ => filter(_, i => i > 1)
  |> _ => map(_, i => i ** 2)
  |> sum

// 13
```

In case you want to remove `lodash` `chain` functionality there is already [a tip][4] for that. But keep in mind that `lodash` `chain` is much more powerful wrapper because it applies a lot of optimisations based on heuristics.


[1]: https://github.com/tc39/proposal-pipeline-operator
[2]: https://www.npmjs.com/package/babel-plugin-transform-pipeline
[3]: https://twitter.com/littledan
[4]: https://github.com/jakwuh/webtip/tree/master/tips/22-08-2017
