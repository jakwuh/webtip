Chrome has the feature to trace all runtime optimizations / deoptimizations of a webpage. This can shed some light on efficiency of a specific piece of code and help understand how to optimize it.

To enable Chrome (de)optimizations tracing run it with the flags enabled:

```bash
# macos
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
--js-flags="--trace-deopt --trace-opt-verbose"

# windows
chrome.exe --js-flags="--trace-deopt --trace-opt-verbose"
```

The command above will run Chrome and start tracing (de)optimizations to *stdout*:

```
[optimizing 0x32e643bd8d89 <JSFunction matchesAny (sfi = 0x32e64a4513d1)> - took 0.663, 9.130, 0.083 ms]
[completed optimizing 0x32e643bd8d89 <JSFunction matchesAny (sfi = 0x32e64a4513d1)>]
[not yet optimizing keys, not enough ticks: 0/2 and ICs changed]
[not yet optimizing 25.Events.trigger, not enough ticks: 0/2 and ICs changed]
[not yet optimizing getDefault, not enough ticks: 0/2 and ICs changed]
[not yet optimizing get$1, not enough ticks: 0/2 and ICs changed]
[not yet optimizing eventsApi, not enough ticks: 0/2 and ICs changed]
[not yet optimizing difference, not enough ticks: 0/2 and ICs changed]
[not yet optimizing contexified, not enough ticks: 0/2 and ICs changed]
[not yet optimizing onChange, not enough ticks: 0/2 and  too large for small function optimization: 10360/120]
[not yet optimizing ConvertToString, not enough type info for small function optimization: 0/3 (0%)]
[resetting ticks for onChange due from 1 due to IC change]
[not yet optimizing get$2, not enough ticks: 0/2 and  too large for small function optimization: 288/120]
```

What helpful information do we see from the output above?

- calling a function with a different signature leads to resetting IC
- to become optimized a function needs to have 2 subsequent calls with parameters which have same hidden classes

---

To print all available flags use:

```bash
... --js-flags="--help"
```
