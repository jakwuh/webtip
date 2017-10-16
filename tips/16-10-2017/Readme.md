By saying `instance` decorator I mean decorator which has to be applied on a class `instance` rather than on a class itself. For example, `debounce` decorator should have a separate "tracking pipe" for each instance. In other words if we have two variables `a` and `b` - both instances of class `X`, then calling debounced `a.debouncedFn()` should not affect `b` at all.

The only way to implement such behavior is to mutate instance method at the moment it is accessed for the first time. The initial implementation:

```js
function Debounce(wait) {
    return function (target, key, descriptor) {
        let fn = descriptor.value;

        return {
            configurable: true,
            enumerable: descriptor.enumerable,

            get() {
                let decoratedFn = debounce(fn, wait);

                Object.defineProperty(this, key, {
                    value: decoratedFn,
                    configurable: true,
                    enumerable: descriptor.enumerable
                });

                return decoratedFn;
            }
        }
    }
}
```

There is at least one case unhandled though. We obviously want to preserve the property value in case it is set manually:

```js
let a = new X();
a.f = myCustomFunction
a.f() // should call myCustomFunction()
```

We could achieve that requirement by using `hasOwnProperty`. Therefore we come to the final implementation:

```js
/**
 * Usage:
 *
 * class X {
 *   @Debounce(100)
 *   sendData() {}
 * }
 *
 */
function Debounce(wait) {
    return function (target, key, descriptor) {
        let fn = descriptor.value;

        let defineProperty = (target, key, value) => {
            Object.defineProperty(target, key, {
                value,
                configurable: true,
                enumerable: descriptor.enumerable
            });
        };

        return {
            configurable: true,
            enumerable: descriptor.enumerable,

            get() {
                if (this.hasOwnProperty(key)) {
                    return fn;
                }

                let decoratedFn = debounce(fn, wait);

                defineProperty(this, key, decoratedFn);

                return decoratedFn;
            },

            set(value) {
                defineProperty(this, key, value);
            }

        }

    }
}
```

[1]: https://github.com/jakwuh/es-decorators/blob/master/src/DecorateInstance.js
