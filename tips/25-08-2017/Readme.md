In this post I describe the most frequent `git` use cases.

Add files to an old commit. Let commit **sha** be a `8bf5cc`:
```bash
git add -A
git commit --fixup=8bf5cc
git rebase --interactive --autosquash 8bf5cc^
```

Add files to the last commit without changing a message:

```bash
git add -A
git commit --amend --no-edit
```

Delete the last commit from the history but leave changes:

```bash
git reset HEAD~1 --soft
```
