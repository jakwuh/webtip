[`#TIL`][1]

##### Task

Create a function that accepts a list of functions, and calls them with provided arguments checking if they all result in a *truthy* value.

##### Solution

```js
import {overEvery, isNumber} from 'lodash';

function isEven(n) {
    return n % 2 === 0;
}

function isPositive(n) {
    return n > 0;
}

const isSuitable = overEvery(isNumber, isEven, isPositive);

console.log(isSuitable(2)); // true
console.log(isSuitable(-2)); // false
console.log(isSuitable('abc')); // false
```

[1]: http://www.urbandictionary.com/define.php?term=TIL
