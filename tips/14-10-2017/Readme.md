GitHub files, both from gists and repositories could be fetched in a raw format. This could help when using a container (e.g. Docker) which do not has `git` installed:

```bash
# curl -L https://github.com/:username/:reponame/blob/:commithash/:filepath
curl -L https://github.com/jakwuh/dailytip/blob/master/Readme.md
```

```bash
# curl -L https://gist.github.com/:username/:gistid/raw/:filename
curl -L https://gist.github.com/jakwuh/0321347f3a16e72b58729e3a79c8b804/raw/.babelrc
```
