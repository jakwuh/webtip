/**
 * When using babel, you can't extend native Error class, as it won't work as expected.
 * Assume the following ES6 code:
 */

import test from 'ava';
import co from 'co';

test('In ES6 you can derive from Error', t => {
    class CommonError extends Error {
    }

    class HTTPError extends CommonError {
    }

    let error = new HTTPError();
    t.true(error instanceof Error);
    t.true(error instanceof CommonError);
    t.true(error instanceof HTTPError);
});

/**
 * After transpilation it will become:
 */

(function () {
    'use strict';

    var _ava = require('ava');

    var _ava2 = _interopRequireDefault(_ava);

    var _co = require('co');

    var _co2 = _interopRequireDefault(_co);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    (0, _ava2.default)('But with babel you can not do that', function (t) {
        var CommonError = function (_Error) {
            _inherits(CommonError, _Error);

            function CommonError() {
                _classCallCheck(this, CommonError);

                return _possibleConstructorReturn(this, (CommonError.__proto__ || Object.getPrototypeOf(CommonError)).apply(this, arguments));
            }

            return CommonError;
        }(Error);

        var HTTPError = function (_CommonError) {
            _inherits(HTTPError, _CommonError);

            function HTTPError() {
                _classCallCheck(this, HTTPError);

                return _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).apply(this, arguments));
            }

            return HTTPError;
        }(CommonError);

        var error = new HTTPError();
        t.true(error instanceof Error);
        t.false(error instanceof CommonError);
        t.false(error instanceof HTTPError);
    });
})()

/**
 * To understand the reason of such inconsistency, have a close look at _possibleConstructorReturn function.
 * You may probably notice, that it returns either value from the super() constructor method
 * or `this`. That means the following: if our parent constructor returns a value then that value
 * will be used as a return value, meaning prototype chain will be broken. This leads to the
 * constructed error not being `instanceof` of its real constructor.
 */
