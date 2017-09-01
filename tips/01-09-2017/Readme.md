#### [Interleaving String][1]

##### Task

Given `s1`, `s2`, `s3`, find whether `s3` is formed by the interleaving of `s1` and `s2`.

Example inputs:

```
s1 = "a"
s2 = "a"
s3 = "a"
Result: False
```

```
s1 = "aa"
s2 = "ab"
s3 = "abaa"
Result: True
```

```
s1 = "aabcc"
s2 = "dbbca"
s3 = "aadbbcbcac"
Result: True
```

```
s1 = "aabcc"
s2 = "dbbca"
s3 = "aadbbbaccc"
Result: False
```

##### Analysis

Let `F(s1, s2, s3)` be the solution for the task. It's easy to see the task could be broken down in the following way:

```python
if s1[0] == s3[0] and F(s1[1:], s2, s3[1:]) == True:
    return True
if s2[0] == s3[0] and F(s1, s2[1:], s3[1:]) == True:
    return True
return False
```

At this point it is clear we're dealing with a DP task. We are solving it using a 2-dimensional array of size `(len(s1) + 1) * (len(s2) + 1)` of booleans. If `table[i][j] == True` then it is possible to interleave `s1[:i] and s2[:j]` into a `s3[:i + j]`. The initial value is `table[0][0] = True`.



##### Solution

```python
class Solution(object):
    def isInterleave(self, s1, s2, s3):
        """
        :type s1: str
        :type s2: str
        :type s3: str
        :rtype: bool
        """
        n = len(s1)
        m = len(s2)

        if n + m != len(s3):
            return False

        table = [None] * (n + 1)

        for i in range(0, n + 1):
            table[i] = [False] * (m + 1)

        table[0][0] = True

        for i in range(0, n + 1):
            for j in range(0, m + 1):
                if table[i][j]:
                    k = i + j
                    if i != n and s1[i] == s3[k]:
                        table[i + 1][j] = True
                    if j != m and s2[j] == s3[k]:
                        table[i][j + 1] = True

        return table[n][m]

```

[1]: https://leetcode.com/problems/interleaving-string/
