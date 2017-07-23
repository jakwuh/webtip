### Creating PRs

```bash
git push --set-upstream origin HEAD
git push -u origin HEAD
```

`-u` is an alias for `--set-upstream`. The command creates remote branch with **the same name as your current branch** and makes it an upstream. It is basically a handy way to create PRs (as we don't need to specify branch-name twice, making typos along the way). This works because of HEAD being a `symbolic-ref` for the current branch, hence [git can obtain](https://goo.gl/rkVMXw) branch name from it.

### Tagging

```bash
1. git push origin --tags
2. git push --tags
```

1st command pushes **only** tags to the `origin` branch.  
2nd command pushes **only** tags to the upstream branch

Don't forget to push branch to the remote after pushing tags by executing the same commands without `--tags` param.

### Grep in history

What I love about CVS/SVN is that it makes code cleaner allowing us not to leave comments through our code but to remove them, leaving in a version control history. Hence, we should stick to the rule **Don't leave comments in your code**.

After that, there is a simple way to grep history:

```bash
git log -p
```

The command opens a vim-like reader, where [you can find text](https://goo.gl/eFdZK4) by pressing `/` and then typing it. Pressing `Enter` will start searching throughout the whole git history. Pressing `n` will move you to the next occurrence (once it will find the first one).
