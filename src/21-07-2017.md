Don't forget `JSON.stringify` is an unsafe method. Alternatively, you can use a common approach to avoid this:

```js
function stringify(json) {
    let output;
    try {
      // `null, 2` is for proper formatting
      output = JSON.stringify(json, null, 2);
    } catch (e) {
      output = `[Circular ${e.message}]`;
    }
    return output;
}
```
