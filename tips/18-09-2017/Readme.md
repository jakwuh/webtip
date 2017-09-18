Today I learned from the [`WebStandarts`][1] podcast (which I am listening to) about a fun tool named `npx` that is installed alongside `npm@5.2.0+`. It allows to execute npm packages without installing them neither globally nor locally (think of it as of disposable `npm`).

A few examples of using it:

```
# see the forever's help without installing it
npx forever --help

# execute gist
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

Unfortunately I did not found any sufficient way to "install" a few packages and run `node` where I can play with them. It'd be definitely a great addition to the `npx` itself.

More details could be found [at the npm's blog][2].


[1]: https://soundcloud.com/web-standards
[2]: http://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
