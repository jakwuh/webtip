There is an interesting way of shipping browser polyfills by using so called "split points". You could split all browsers into 2+ categories, for instance: "Modern browsers" and "Obsolete browsers". Then, depending on a feature set your code depends on, you could define a condition which will detect to which group a browser belongs:

```js
let isBrowserModern =
    typeof Promise === 'function'
    && navigator.serviceWorker
    && Number.prototype.isFinite;
```

By using a condition you could ship a bundle with an appropriate set of polyfills and transformations (e.g. babel):

```js
let script = document.createElement('script');

script.defer = true;

if (isBrowserModern) {
    script.src = '/index.modern.js';
} else {
    script.src = '/index.obsolete.js';
}

document.body.appendChild(script);
```
