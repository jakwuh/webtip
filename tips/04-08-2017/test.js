import test from 'ava';
import {StateMachine} from './index';

let spec = [
    ["aa", "a", false],
    ["aa", "aa", true],
    ["aaa", "aa", false],
    ["aa", "a*", true],
    ["aa", ".*", true],
    ["ab", ".*", true],
    ["aab", "c*a*b", true],
    ["a", "b*..*.a", false],
    ["aaa", "ab*a*c*a", true],
    ["abcd", "d*", false],
];

spec.forEach(([string, pattern, expected]) => {

    test(t => {
        t.is(new StateMachine(pattern).match(string), expected);
    });

});
