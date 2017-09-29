Finally there is an API which allows one to abort `fetch`. This sounds really exciting to me. In [his article][1] [Jake Archibald][2] describes in details the API with samples and underlying history. We will have a short look at it:

> Currently only **Firefox 57 (Nightly)** has implemented the feature

#### `AbortController`

The first part of a spec is a new class `AbortController`. It has only one method `abort` and one property `signal`:

```js
const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener('abort', () => {
  console.log(signal.aborted);
});

controller.abort();
```

#### `fetch`

The second part of a spec is adding support for `signal` option to the [`fetch` API][3]:

```js
const controller = new AbortController();
const signal = controller.signal;

// abort request if it takes more that 5 seconds
setTimeout(() => controller.abort(), 5000);

fetch(url, { signal }).then(response => {
  return response.text();
}).then(text => {
  console.log(text);
});

```

That's it!

---

BTW, for some reason implementing `signal` support in `fetch` polyfill seems to [get stucked][4].  


[1]: https://developers.google.com/web/updates/2017/09/abortable-fetch?utm_source=feed&utm_medium=feed&utm_campaign=updates_feed
[2]: https://twitter.com/jaffathecake
[3]: https://fetch.spec.whatwg.org/
[4]: https://github.com/github/fetch/issues/547
