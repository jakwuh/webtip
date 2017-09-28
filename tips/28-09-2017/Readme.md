To measure asset's parse time one could do something like the following (at first sight):

```html
<script>
// this will not measure full parse time
performance.mark('parse:start');
// your code
performance.mark('parse:end');
</script>
```

However, the code above does not take into account a parse delay, which takes place before a script evaluation.

Thus, to measure a real asset's parsing time we should [use the following][1].

```html
<script>
// this will
performance.mark('parse:start');
</script>
<script>
// your code
</script>
<script>
performance.mark('parse:end');
</script>
```

Keep in mind this will still work improperly if a user's script is cached.

[1]: https://twitter.com/nolanlawson/status/817077573012180992
