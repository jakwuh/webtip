If you worry about your JS code quality, consistency and maintainability then consider reading [Angular 2 Style Guide][1] (regardless of using it or not). Here are a few most useful /  most useless key points from my point of view:

### Do agree:

[**Import line spacing**][3]

- Consider leaving one empty line between third party imports and application imports.
- Consider listing import lines alphabetized by the module.
- Consider listing destructured imported symbols alphabetically.

```js
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Hero } from './hero.model';
import { ExceptionService, SpinnerService, ToastService } from '../../core';
```

[**Extract templates and styles to their own files**][4]

- Do extract templates and styles into a separate file, when **more** than 3 lines.

Having separated templates along with a syntax for inline templates simplifies a lot of things.

[**Member sequence**][5]

- Do place properties up top followed by methods.
- Do place private members after public members, **alphabetized**.

### Do not agree

[**Constants**][2]

*Angular*:
- Consider spelling const variables in lower camel case.
- Do tolerate existing const variables that are spelled in UPPER_SNAKE_CASE.  

```js
export const mockHeroes   = ['Sam', 'Jill']; // prefer
export const heroesUrl    = 'api/heroes';    // prefer
export const VILLAINS_URL = 'api/villains';  // tolerate
```

*Me*:  
-  Consistency is important as much as convention. Because of the fact that the majority of packages use UPPER_CASE it'd be better to have a convention reflecting that fact.

[1]: https://angular.io/guide/styleguide
[2]: https://angular.io/guide/styleguide#constants
[3]: https://angular.io/guide/styleguide#import-line-spacing
[4]: https://angular.io/guide/styleguide#extract-templates-and-styles-to-their-own-files
[5]: https://angular.io/guide/styleguide#member-sequence
