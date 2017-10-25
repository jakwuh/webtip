
Chrome 63 has enabled by default a powerful feature called [**Async Iteration / Async Generators**][1]. The spec consists of the [following parts][2]:

- An async generator function, which is pretty much similar to generator function except the fact that it returns promise, not value:

```js
async function * emitAsyncChunks() {
    let chunk1 = await fetchChunk(1);

    yield chunk1;

    let chunk2 = await fetchChunk(2);
    let chunk3 = await fetchChunk(3);

    yield chunk2 + chunk3;

    yield await fetchChunk(4);
}
```

- A `Symbol.asyncIterator` which plays the same role as `Symbol.iterator` but for asynchronous iteration: defines the way an object should be iterated on:

```js
class Document {
    [Symbol.asyncIterator]() {
        return emitAsyncChunks();
    }
}
```

- An asynchronous iteration statement itself:

```js
let document = new Document();

for await (let chunk of document) {
    socket.push(chunk);
}
```

An async generator + async iterator present a lot of concepts in a web: asynchronous emitting of data, dom events or animations.

Here is an example of asynchronous html page emitter that simplifies a lot writing [SSR app with streams][3]. It is currently works in Chrome Canary but the feature is expected to appear in NodeJS soon, so the piece of code is really useful:

```js
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(resolve({
            name: 'Daily tip'
        }), 100);
    })
}

class Document {
    async * emitAsyncChunks() {
        yield '<html><head><title>Async iteration demo</title></head><body>';

        let data = await fetchData();

        yield `<div>${data.name}</div>`;

        yield '</body></html>';
    }

    [Symbol.asyncIterator]() {
        return this.emitAsyncChunks();
    }
}

let doc = new Document();

(async () => {
    let content = '';

    for await (let chunk of doc) {
        content += chunk;
    }

    console.log(content);
})();
```

[1]: https://www.chromestatus.com/feature/5727385018171392
[2]: http://2ality.com/2016/10/asynchronous-iteration.html
[3]: https://youtu.be/LmG1KxKcevE?t=48m47s
