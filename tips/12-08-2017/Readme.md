After seeing a bunch of implicit and really explosive `RegExp`-related bugs I've realized we have to do something with it.

Imagine we have a following `RegExp`:

```js
const {pathname} = location;
const logRegExp = new RegExp('^\\/' + pathname + '\\/log\\/');
logRegExp.test(url);
```

Lets understand what we can do better.

#### Avoid using RegExp

First of all we could use [`.startsWith()`][1] string method instead of `RegExp`.

```js
url.startsWith(`/${pathname}/log/`);
```

A few more examples:

```js
url.endsWith(`/${expectedPath}/`);
url.includes(`/${expectedPath}/`);
```

These 3 handy string methods could let us avoid using `RegExp`s in a certain amount of cases. Don't forget these are **ES2015 (formerly ES6)** features so you need to shim them (I prefer [shimming w/ babel][2]).

#### Don't forget to escape RegExp

![Escape RegExp](./escape.png)

One could say *"Sure, it's obvious"*, still it is so **easy to forget** about escaping (and I've seen one forgets it for so many times, including myself). Have a look at the following code:

```js
new RegExp('^\/' + pathname + '\/log\/');
```

It has 3(!) mistakes, 2 of which are *"obvious"*.

1. `\` should be escaped, thus: `new RegExp('^\\/' + pathname + '\\/log\\/');`
2. `pathname` should be escaped, thus: `new RegExp('^\\/' + escapeForRegExp(pathname) + '\\/log\\/');`
3. `RegExp` here is **not necessary**, thus: ``str.startsWith(`/${pathname}/log/`)``

If you still are going to use a `new RegExp` expression, an [**escape-string-regexp**][3] npm library will provide you an `escapeForRegExp` function.

#### Test it

I'll tell you a funny fact about myself: everytime I write more or less comlicated `RegExp` I start convincing myself the `RegExp` is really simple and doesn't need to be tested. After some negotiations I decide to test it and then I **bless myself** for doing it because the `RegExp` **almost always** has at least one bug.  
 
Don't neglect this rule, encapsulate a `RegExp` in a separate function and test it.

---

Do you have any other important and useful ideas about dealing with `RegExp`s? Feel free to share your knowledge!

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
[2]: http://babeljs.io/docs/usage/polyfill/
[3]: https://www.npmjs.com/package/escape-string-regexp
