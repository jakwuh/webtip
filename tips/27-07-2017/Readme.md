tldr; JSDoc is pretty bad and buggy ~~typesystem~~

```js
/**
 * @param {{foo: number}} a
 * @param {Object} b
 */
 function test(a, b) {
   console.log(a.foo); // ok
   console.log(a.bar); // unresolved variable bar
   console.log(b.foo); // ok
   console.log(b.bar); // ok
   console.log(b.foo.bar); // ok
   console.log(b.bar.baz); // unresolved variable bar - wtf ??
 }

 test({}, {}); // ok
 test({foo: 1}, {bar: '2'}) // ok
 test({foo: '2'}, {bar: '2'}) // error
 ```

#### JSDoc `{{}}` vs `{Object}`:

`{{foo: number}}` means `a` is expected to have `foo` property which type is `number`. This basically does not mean `a` couldn't have any other properties. That is, every type which could be narrowed to `{{foo: number}}` will be a valid function parameter. The difference between `a` and `b` **inside** the `test` function body is that typecheker deals with `a` as if it would have only property `foo` of the corresponding type, unlike `b` which is supposed to have any property of type `any`.


#### WTF:

In the example we have 2 equal (regarding types) expressions: `console.log(b.foo.bar)` & `console.log(b.bar.baz)`. Despite of that the latter is considered to be invalid. The difference? To be frankly, I don't know. Also, I didn't manage to find answers on such questions like: *How to define a type for an object which will not use narrowing?* or *How to define a type for an object which has one property of type number and all other its keys have a type of string?*

Described questions along with my experience of using JSDoc led me to the conclusion: 

#### JSDoc is not longer worth the effort.
