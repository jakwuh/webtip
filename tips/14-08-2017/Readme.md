While writing utility tools sometimes there is a strong need in making async function work synchronously: even this is not the *NodeJS way*, an opposite solution could force a large amount of code to be rewritten. For such cases there is a [`deasync`][1] *NodeJS* module.

It simplifies things a lot:

```js
const cp = require('child_process');
const execSync = deasync(cp.exec);
console.log(execSync('ls -la')); // execSync work synchronously
```

I went even further, and create a library called [`deasync-promise`][2], which uses `deasync` under the hood. It makes promises work synchronously:

```js
console.log(deasyncPromise(fetchUsers()));
console.log('Users are fetched.');
```

`deasync` library exposes method named `run` which forces *NodeJS* event loop to start (once):

```cpp
uv_run(uv_default_loop(), UV_RUN_ONCE);
info.GetReturnValue().Set(Nan::Undefined());
```

---

PS. Do not misuse this *NodeJS* feature

[1]: https://github.com/vkurchatkin/deasync
[2]: https://github.com/jakwuh/deasync-promise
