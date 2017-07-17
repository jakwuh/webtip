import test from 'ava';
import co from 'co';

test('In ES6 you can derive from Error', t => {
    class CommonError extends Error {
    }

    class HTTPError extends CommonError {
    }

    let error = new HTTPError();
    t.true(error instanceof Error); // true
    t.true(error instanceof CommonError); // true
    t.true(error instanceof HTTPError); // true
});
