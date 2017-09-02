#### [Distinct Subsequences][1]

##### Task

Given a string `S` and a string `T`, count the number of distinct subsequences of `S` which equals `T`.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

Example inputs:

```
S = "ab"
T = "ab"
Result: 1
```

```
S = "rabbbit"
T = "rabbit"
Result: 3
```

##### Analysis

Let `F[i][j]` be the number of distinct subsequences of `S[:j]` which equals `T[:i]`. When building such a subsequence we can use or skip `S[j-1]`. If we skip it, then the number of possible subsequences will be `F[i][j-1]`. If we use it and `S[j-1] == T[i-1]` then the number of possible subsequences will be `F[i-1][j-1]`.  

With that we've come to the following DP recurring formula:

```
F[i][j] = F[i][j-1] + (S[j-1] == T[i-1]) * F[i-1][j-1]
F[0][j] = 1
F[i][j] = 0, i > 0
```

Which represents the solution.

##### Solution

```python
class Solution(object):
    def numDistinct(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: int
        """
        n = len(t) + 1
        m = len(s) + 1

        table = [None] * n

        table[0] = [1] * m

        for i in range(1, n):
            table[i] = [0] * m

        for i in range(1, n):
            for j in range(1, m):
                table[i][j] = table[i][j - 1] \
                + (s[j - 1] == t[i - 1]) * table[i - 1][j - 1]

        return table[n - 1][m - 1]
```

[1]: https://leetcode.com/problems/distinct-subsequences/
