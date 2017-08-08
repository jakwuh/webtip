#### Subscribe to our [Telegram channel](https://t.me/dailytip) to get daily updates  

---

In the [last tip][1] we learned how to create a boilerplate for a eslint plugin and defined our start point to be a `CallExpression` visitor:

```js
return {
    CallExpression: function (node) {
        // ... plugin code
    }
}
```

The initial task is to check whether `CallExpression` is a Promise `.catch` or `.then` call or not. Looking through the AST we come to the following test conditions:

- `node.callee` should be a MemberExpression
- `node.callee.property` should be either `then` or `catch`
- `node.arguments` should contain an error callback (the 1st argument if it's a `catch` block and the 2nd argument if it's a `then` block)

```js
// we are doing 2 things at once: checking whether it's a catch block and returning error callback in the case it's true
function getErrorCallback(node) {
    if (isMemberExpression(node.callee)) {
        function checkAndReturn(length, method) {
            if (node.arguments.length === length && isIdentifier(node.callee.property, method)) {
                var callback = node.arguments[length - 1];

                if (isFunctionExpression(callback)) {
                    return callback;
                }
            }
        }

        return checkAndReturn(1, 'catch') || checkAndReturn(2, 'then');
    }
}
```

Pretty well. Once we've got an error callback node then all we need is to check it's validity. This is best described by commenting out the code:

```js
CallExpression: function (node) {
    // getting error callback node, if any
    var catchNode = getErrorCallback(node);

    if (catchNode) {
        // callback is a FunctionExpression (possibly ArrowFunctionExpression)
        // so it has it contents inside .body
        var body = catchNode.body;
        // in a catch block error is the first param
        var error = catchNode.params[0];

        if (!error) {
            // no error in arguments means we ignore it
            // context.report(`node which will be underlined`, `text message`)
            return context.report(catchNode, 'You shouldn\'t ignore error inside catch block.');
        }

        if (isObjectPattern(error)) {
            // using destructuring on error param may lead to missing stack traces and other properties
            return context.report(error,
                'Don\'t use destructuring in catch block as you might miss some data (e.g. stack traces).');
        }

        if (isBlockStatement(body)) {
            // here we will check for foolish code constructions
            if (body.body.length) {
                var firstNode = body.body[0];

                if (isThrowStatement(firstNode) && identifiersEql(firstNode.argument, error)) {
                    // .catch(error => {throw error}) really doesn't make any sense...
                    return context.report(firstNode, 'Only throwing error inside catch block is no-op.');
                }

                if (isReturnStatement(firstNode) && isFoolishPromiseReject(firstNode.argument, error)) {
                    /**
                     *  .catch(error => {
                     *      return Promise.reject(error)
                     *  }) is a pointless expression
                     */
                    return context.report(firstNode.argument, 'Only rejecting Promise with error inside catch block is no-op.');
                }
            }
        } else if (isFoolishPromiseReject(body, error)) {
            // .catch(error => Promise.reject(error)) is a pointless expression
            return context.report(body, 'Only rejecting Promise with error inside catch block is no-op.');
        } else {
            body = catchNode;
        }

        var resolver = buildResolver(body, traverser);

        traverser.traverse(body, {
            enter: function (node, parent) {
                // we are to store parents on our own
                node.parent = parent;

                if (isThrowStatement(node) && nodeContainsError(node.argument, error) && sameScope(body, node)) {
                    resolver.addPath(node);
                }
                if (isCallExpression(node) && isLogger(node, error) && sameScope(body, node)) {
                    resolver.addPath(node);
                }
            }
        });

        if (!resolver.isValid()) {
            context.report(catchNode, 'Throw or log ' + error.name + ' inside catch block.');
        }
    }
}
```

The difficulty here is that a `catch` block could have a few even nested conditional branches. We have to check all of them to ensure an error is logged (or thrown downside) in any case. This is solved by building a tree out of conditional branches and then checking if all leaves of it are marked as valid. This is done in a `buildResolver` function (implicitly, though), which we will not consider now.

[Source repo][2]

That's it! Now our `catch` blocks will become much more clear.

[1]: (/tips/07-08-2017/Readme.md)
[2]: https://github.com/jakwuh/eslint-plugin-promise-catch
