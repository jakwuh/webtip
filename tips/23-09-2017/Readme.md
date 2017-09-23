Recently I have read an [article][1] written by [Daniel Khan][2] describing common NodeJS event loop misconceptions. Here are key points which I have highlighted:

**1. NodeJS Event Loop is a bunch of sequential phases:**
```
Timers(setTimeout, setInterval)
↓
IO Callbacks (network, filesystem etc.)
↓
IO Polling ()
↓
setImmediate
↓
Close (`on('close', cb)`)
```
Each step is a `tick` and that also means calling `process.nextTick` will execute callback after finishing an execution of a current step (no matter which exactly).

**2. NodeJS Event Loop utilizes `libuv` under the hood**

**3. By default `libuv` offloads asynchronous IO to system IO interfaces**  
If it is not possible, then it offloads asynchronous IO to a separate thread. The default `libuv`'s thread pool is of size 4. It is possible to change it by calling node [with a `UV_THREADPOOL_SIZE` env argument][3]:
```bash
UV_THREADPOOL_SIZE=64 node
```

Though the memory / cpu impact of it remains unclear.

[1]: https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c
[2]: https://twitter.com/dkhan
[3]: https://stackoverflow.com/a/20560242/4958421
