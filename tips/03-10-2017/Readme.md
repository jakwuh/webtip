Mono repository in comparison to multiple repositories has a lot of cons and pros. In this post we explore a tool called `lerna` which is built to start, evolve and manage monorepository.

#### Installation

```bash
yarn add lerna
```

#### Usage

Imagine, you are developing `try-lerna` app. The app depends on two vendor packages: [`chalk`][2] and [`quantum-router`][3]. You are the core contributor to these 2 packages. Each time you want to introduce a small change to a library, you need to write a code, publish a new version and update your `package.json`. This means you do a lot of overhead work which could be avoided if you decide to move to a monorepository. `lerna` makes this process seamless:

First, init the `lerna` repository:

```bash
> lerna init
lerna info version 2.2.0
lerna info Updating package.json
lerna info Creating lerna.json
lerna info Creating packages directory
lerna success Initialized Lerna files
```

Update the `lerna.json`:

```js
{
  ...
  "npmClient": "yarn",
  "npmClientArgs": ["--production"]
}
```

Commit the changes:

```bash
gaa
gcmsg "Add lerna"
```

Clone dependencies:

```bash
cd /tmp
git clone git@github.com:chalk/chalk.git
git clone git@github.com:vlyahovich/quantum-router.git
```

Import the `chalk` dependency:

```bash
> lerna import /tmp/chalk
lerna info version 2.2.0
lerna info About to import 203 commits from /tmp/chalk into packages/chalk
? Are you sure you want to import these commits onto the current branch? Yes
lerna info cffc355
lerna info 466710d
lerna info 67c1392
lerna info d60eeb9
lerna info c323bf0
lerna info c8f8a1f
lerna info cbc3900
lerna info f7514e8
lerna info 38efc46
lerna info 0133342
...
lerna info a9f0c77
lerna info 37db75e
lerna info 7898eda
lerna info 5e6d5fd
lerna success import finished
```

Import the `quantum-router` dependency:

```bash
> lerna import /tmp/quantum-router
lerna info version 2.2.0
lerna info About to import 24 commits from /tmp/quantum-router into packages/quantum-router
? Are you sure you want to import these commits onto the current branch? Yes
lerna info a7ee9d8
lerna info 53224dc
lerna info a934336
lerna info 0434403
lerna info 81d02d2
lerna info 01cb111
lerna info c6d853c
lerna info 7ce5a29
lerna info a7644de
lerna info 51fb1a4
lerna info 91c86f1
lerna info 21f6f75
lerna info 3f4f754
lerna info 5c6e623
lerna info b45bee8
lerna info 39e13b3
lerna info 66d19c9
lerna info 83d875e
lerna info c3d9782
lerna info 10a1b9e
lerna info fd2ffa8
lerna info 0219c0e
lerna info 74a66e4
lerna info 7d02bb0
lerna success import finished
```

That's it! Now you have both `chalk` and `quantum-router` packages right in your `packages` directory. All `git` commits moved from the original repository to the `try-lerna` app.

At this point you could remove `chalk` and `quantum-router` dependencies from your `package.json` and instead make 2 additional steps:

**1.** Add `postinstall` script:

```js
// package.json
{
    ...
    "scripts": {
        ...
        "postinstall": "lerna bootstrap"
    }
}
```

**2.** Add `packages` folder to the modules resolver. This step depends on a project (webpack `module.resolve` option, `node`'s `module.paths` etc.).

[1]: https://github.com/lerna/lerna
[2]: https://github.com/chalk/chalk
[3]: https://github.com/vlyahovich/quantum-router
