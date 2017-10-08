#### Should I [DRY][1] or not?

There are a lot of different opinions when it comes to decision on code (de)duplication. Usually I use the following set of rules:

- Don't try to deduplicate each line of a code. The advantage of such optimisation (premature) is doubtful. Don't forget your code is compressed by gzip (brotli / zopfli) and it does compress similar pieces of code way much better than you.

- Remember you are working in a team. When making a decision think about your teammate who may want the same functionality in a future or had already implemented the functionality you need. So, if you have a relatively large (or complex) piece of code take it out in a separate function. The naming convention across the team is important.

- If you are in doubt whether a piece of code should be deduplicated, then deduplicate it. Both 2 most popular bundlers (webpack & rollup) now have [scope hoisting][3] feature. That means excess deduplication will have a 0 cost.


[1]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[2]: https://en.wikipedia.org/wiki/Bus_factor
[3]: https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
