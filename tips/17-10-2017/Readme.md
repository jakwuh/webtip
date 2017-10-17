In Typescript `?T` behaves equal to `T|undefined`. However there is a caveat: `undefined` as well as `null` types could be assigned to any type. That is why following pieces of code work:

```js
// 1.
let c: Human = null;

console.log(c.surname)

// 2.
interface Human {
    surname?: string
}

function printName(human: Human) {
    let message: string = human.surname;

    console.log(message);
}
```

According to [Typescript Deep Dive][1] book such a decision was taken by Typescript contributors because a lot of people used to write stuff in that way. However [`strictNullChecks`][2] compiler option change things:

```js
// 1.
let c: Human = null;
// Type 'null' is not assignable to type 'Human'.

console.log(c.surname)

// 2.
interface Human {
    surname?: string
}

function printName(human: Human) {
    let message: string = human.surname;
    // Type 'string | undefined' is not assignable to type 'string'.
    // Type 'undefined' is not assignable to type 'string'.

    console.log(message);
}
```

The conclusion is obvious: to avoid rather popular kind of bugs use `strictNullChecks` compiler option whenever possible.

[1]: https://basarat.gitbooks.io/typescript/docs/options/strictNullChecks.html
[2]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
