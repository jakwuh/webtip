### [Scramble String][1]

While I'm working on the 2nd part of [the JSDoc type checker][2] let's solve one more task from [leetcode][3].

#### Task

Given a string `s1`, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.

Below is one possible representation of `s1` = "great":

```
    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
```

To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node "gr" and swap its two children, it produces a scrambled string "rgeat".

```
    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
```

We say that "rgeat" is a scrambled string of "great".

Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string "rgtae".

```
    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
```
We say that "rgtae" is a scrambled string of "great".

Given two strings `s1` and `s2` of the same length, determine if `s2` is a scrambled string of `s1`.

Example inputs:
```
s1: "abcd"
s2: "bdac"
Result = False
```

```
s1: "abcd"
s2: "bacd"
Result = True
```

#### Analysis

> To be honest I didn't like the task very much because of solution being not as elegant as I want it to be

The solution is rather straight forward and could be represented in a few simple steps:

Given two strings `s1` and `s2`:

1. Check if they are equal. If so, return `True`
2. Check if they consist of the same letters. If no, return `False`
3. If there is a partition of a size `i`, such that `isScramble(s1[:i], s2[:i]) and isScramble(s1[i:], s2[i:])` or `isScramble(s1[:i], s2[-i:]) and isScramble(s1[i:], s2[:-i])` return `True`. Otherwise return `False`.

#### Solution

```python
class Solution(object):
    def isScramble(self, s1, s2):
        if s1 == s2:
            return True

        letters = collections.defaultdict(lambda: 0)

        for letter in s1:
            letters[letter] += 1

        for letter in s2:
            letters[letter] = max(0, letters[letter] - 1)

        if not sum(letters.values()) == 0:
            return False

        for i in range(1, len(s1)):
            if self.isScramble(s1[0:i], s2[0:i]) and self.isScramble(s1[i:], s2[i:]):
                return True
            if self.isScramble(s1[0:i], s2[-i:]) and self.isScramble(s1[i:], s2[0:-i]):
                return True

        return False
```

[1]: https://leetcode.com/problems/scramble-string/description/
[2]: https://github.com/jakwuh/webtip/tree/master/tips/07-09-2017/Readme.md
[3]: https://leetcode.com
