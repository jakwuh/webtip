Today I've understood we misuse sometimes a link tag in our project. Namely, we have the following elements:

- It's a link (`<a>`)
- It has an event listener which calls `.preventDefault()`

If you think a bit about it you'll find the better solution:

- Replace link tag with button (`<button>`)
- Remove `.preventDefault()` entirely

`button`'s default behaviour is empty, so if you call `preventDefault()` on a link tag then you likely have to replace it with a button.

BTW [Vadim Makeev][1] has an interesting talk on a similar topic. Slides are available [in Russian][2] and [in English][3].

[1]: https://twitter.com/pepelsbey
[2]: https://pepelsbey.net/pres/inhuman-ui/
[3]: https://pepelsbey.net/pres/inhuman-ui/en/
