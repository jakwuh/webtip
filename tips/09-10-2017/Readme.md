If you have a file input which is supposed to open user's camera on mobile phones (due to business requirements or some UX decisions) then it is possible to indicate that capture of media directly from device's camera is preferred using [html media `capture`][2] attribute.

This is the code:

```js
// index.html
<input type="file" accept="image/*" capture="user">
<img src="" alt="">
```

```js
// index.js
let input = document.querySelector('input'),
    img = document.querySelector('img');

input.addEventListener('change', (event) => {
	let [file] = event.target.files;

    if (file) {
    	 img.src = URL.createObjectURL(file)
    }
});
```

Available values for `capture` attribute:

- `user` - open frontal camera
- `environment` - open rear camera
- no value - implementation-specific

In case if there is no available camera then input still acts like an input without `capture` attribute (e.g. on desktop).

Try [the result][1] on your phone.

[1]: https://jsfiddle.net/poe3wf99/4/embedded/result/
[2]: https://www.w3.org/TR/html-media-capture/
