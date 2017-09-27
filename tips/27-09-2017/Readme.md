#### Task

Solve the NodeJS riddle. Why `fs` resolves file unlike `require`?

```
> fs.readFileSync('babel-plugin-transform-es2015-instanceof/lib/index.js').toString()

'"use strict";\n\nexport...

> require('babel-plugin-transform-es2015-instanceof/lib/index.js')

Error: Cannot find module 'babel-plugin-transform-es2015-instanceof/lib/index.js'
    at Function.Module._resolveFilename (module.js:527:15)
    at Function.Module._load (module.js:476:23)
    at Module.require (module.js:568:17)
    at require (internal/module.js:11:18)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
```

#### Theory

`fs` works relative to `process.cwd()` and that is why it finds the requested JS file. `require` works in a bit different way. It tries to find the requested module within `module.paths`:

```js
> module.paths
[ '/Users/jakwuh/Source/job/dailytip/repl/node_modules',
  '/Users/jakwuh/Source/job/dailytip/node_modules',
  '/Users/jakwuh/Source/job/node_modules',
  '/Users/jakwuh/Source/node_modules',
  '/Users/jakwuh/node_modules',
  '/Users/node_modules',
  '/node_modules',
  '/Users/jakwuh/.node_modules',
  '/Users/jakwuh/.node_libraries',
  '/Users/jakwuh/.nvm/versions/node/v8.5.0/lib/node' ]
```

However it is possible to alter `module.paths` by using `NODE_PATH` env variable:

```bash
 NODE_PATH=./tips:./web node
```
```js
> module.paths
[ '/Users/jakwuh/Source/job/dailytip/repl/node_modules',
  '/Users/jakwuh/Source/job/dailytip/node_modules',
  '/Users/jakwuh/Source/job/node_modules',
  '/Users/jakwuh/Source/node_modules',
  '/Users/jakwuh/node_modules',
  '/Users/node_modules',
  '/node_modules',
  './tips', // 1
  './web', // 2
  '/Users/jakwuh/.node_modules',
  '/Users/jakwuh/.node_libraries',
  '/Users/jakwuh/.nvm/versions/node/v8.5.0/lib/node' ]
```

#### Solution

To make the example work we need to add `.` to the `module.paths`:

```bash
NODE_PATH=. node
```

```js
> require('babel-plugin-transform-es2015-instanceof/lib/index.js')
{ __esModule: true, default: [Function] }
```
