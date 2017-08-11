Today we will learn more about cookies in a browser by asking a few questions to ourselves.

> How browser defines a `path` value for a cookie when not specified?

It strips out the current page path from the last `/` char to the end. That means:

1. On a page `/sub` the cookie path will be `/`
2. On a page `/sub/` the cookie path will be `/sub`

> What is the difference between cookie with a path `/`, a path `/sub` and a path `/sub/`?

Page `/sub/` will inherit cookies from all 3 domains.  
Page `/sub` will inherit cookies from domains `/` and `/sub` only.  
Page `/` will inherit cookies only from domain `/`.

> Do cookies from domain `mydomain.com` are available on its subdomains (e.g. `sub.mydomain.com`)

It depends on setting the `domain` property for a cookie.

If cookie doesn't have a `domain` property explicitly set, then it will be available only on its own domain (cookie set on `mydomain.com` will only be available for `mydomain.com` and vice versa cookie set on `sub.mydomain.com` will only be available on `sub.mydomain.com`).

If cookie has a `domain` property set, then it will be propagated to all subdomains of the current domain (regardless of the current domain level).

> Does it mean that using `www.` is not so pointless?

Yes, it does. If your site is available at `www.mysite.com` and your static resources are available at `mysite.com` (without `www`) then browser will not send cookies when loading static resources. This leads to a lower network usage. Still an aesthetic side of using `mysite.com` (without `www`) as a domain will be more important cause.

[Source code](./index.js)
