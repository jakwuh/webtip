Recently I've started learning about JS **V8**'s internals. [Mathias Bynens][1], a **V8** contributor from Google, wrote an interesting article named [“Elements kinds” in V8][2]. He explains how JS engines usually deal with numeric properties and which patterns not to use in order to avoid performance penalty.

The general ideas are quite clear:
- Prefer *dense* arrays to *sparse*
- Prefer to fill an array with data all of the same type
- Prefer *integers* to *double* to *mixed* types
- For array creation prefer `[1]` to `x = new Array(3); x[0] = 0`

While the above unveils some information on how to write more performant code, it's still leaves a lot of ambiguities. To make things clear [Mathias][1] shows the example of debugging generated code using **d8 REPL**.

##### Building **V8** from sources

If you are on Linux/Mac I'd suggest you follow [a straightforward installation][3] process described at **V8** wiki. If you are on Windows I'd suggest you first install Docker and then follow the same installation process.

> Note: Fetching V8 took me ~10 minutes. Building it from sources took ~30 minutes. During fetch there is no any status bar so you might think something got wrong. Be patient.

I was using the following commands set:

```bash
cd ~
mkdir .v8
cd .v8
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
echo export PATH=`pwd`/depot_tools:"\$PATH" >> ~/.bashrc # or ~/.zshrc
source ~/.bashrc
gclient
fetch v8
cd v8
gclient sync
tools/dev/v8gen.py x64.debug
ninja -C out.gn/x64.debug
```

That's it. At this point we have **d8 REPL** with a wide set of special functions:

```bash
> out.gn/x64.debug/d8 --allow-natives-syntax

V8 version 6.3.0 (candidate)

d8>  const array = [1, 2, 3]; %DebugPrint(array);

DebugPrint: 0x337ae3e0c919: [JSArray]
 - map = 0x337ab90027d9 [FastProperties]
 - prototype = 0x337a3c307809
 - elements = 0x337ae3e0c891 <FixedArray[3]> [PACKED_SMI_ELEMENTS (COW)]
 - length = 3
 - properties = 0x337a1f682251 <FixedArray[0]> {
    #length: 0x337a67782949 <AccessorInfo> (const accessor descriptor)
 }
 - elements = 0x337ae3e0c891 <FixedArray[3]> {
           0: 1
           1: 2
           2: 3
 }
0x337ab90027d9: [Map]
 - type: JS_ARRAY_TYPE
 - instance size: 32
 - inobject properties: 0
 - elements kind: PACKED_SMI_ELEMENTS
 - unused property fields: 0
 - enum length: invalid
 - back pointer: 0x337a1f6822e1 <undefined>
 - instance descriptors (own) #1: 0x337a3c307a69 <FixedArray[5]>
 - layout descriptor: 0x0
 - transitions #1: 0x337a3c307979 <TransitionArray[4]>Transition array #1:
     0x337a1f684631 <Symbol: (elements_transition_symbol)>: (transition to HOLEY_SMI_ELEMENTS) -> 0x337ab9002889 <Map(HOLEY_SMI_ELEMENTS)>

 - prototype: 0x337a3c307809 <JSArray[0]>
 - constructor: 0x337a3c304f21 <JSFunction Array (sfi = 0x337a1f6a9cb1)>
 - code cache: 0x337a1f682251 <FixedArray[0]>
 - dependent code: 0x337a1f682251 <FixedArray[0]>
 - construction counter: 0

[1, 2, 3]
```

[1]: https://twitter.com/mathias
[2]: https://v8project.blogspot.ru/2017/09/elements-kinds-in-v8.html
[3]: https://github.com/v8/v8/wiki/Building-from-Source
