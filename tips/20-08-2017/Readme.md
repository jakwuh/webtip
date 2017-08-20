#### [Minimum Window Substring][1]

##### Task

Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity `O(n)`.

Example inputs:

```
S = "ADOBECODEBANC"
T = "ABC"
Result: "BANC"
```

```
S = "a"
T = "aa"
Result: "" (no solution)
```

```
S = "aa"
T = "a"
Result: "a"
```

##### Analysis

First, we create a string `tape` made by concatenating a pattern string `T` and a test string `S`:

```
S = "ADOBECODEBANC"
T = "ABC"
tape = "ABCADOBECODEBANC"
```

Then we store two pointers, left and right, and iterate with them through the string:

```
|ABC|ADOBECODEBANC
```

On each iteration we perform the following operation:

1. Lets suppose the left pointer points to a symbol `x`.
2. Check if we have enough `x` symbols among the left and right pointers. If its count is more than we need, then move the left pointer forward and stop the iteration. Otherwise, move the right pointer forward.
3. If it is not possible to move both pointers forward then stop the algorithm.

For storing how much symbols do we need and how much symbols current segment between pointers has, we use an array of length 256 (because the maximum index in ASCII is 255) and track the count during iterations. Alternatively, a hashmap could be used.


##### Solution

```python
class Solution(object):
    def minWindow(self, s, t):
        if not t or not s:
            return ''

        tape = t + s
        tape_len = len(tape)
        pattern_len = len(t)
        left_cursor = min_left_cursor = 0
        right_cursor = min_right_cursor = pattern_len - 1

        counts = [0] * 256
        current_counts = [0] * 256

        for c in t:
            counts[ord(c)] += 1
            current_counts[ord(c)] += 1

        while True:
            left_char = ord(tape[left_cursor])

            if current_counts[left_char] == 0:
                left_cursor += 1
            elif current_counts[left_char] > counts[left_char]:
                left_cursor += 1
                current_counts[left_char] -= 1
            else:
                if min_left_cursor < pattern_len or right_cursor - left_cursor < min_right_cursor - min_left_cursor:
                    min_left_cursor = left_cursor
                    min_right_cursor = right_cursor

                right_cursor += 1

                if right_cursor >= tape_len:
                    break

                right_char = ord(tape[right_cursor])

                if counts[right_char] > 0:
                    current_counts[right_char] += 1

        if min_left_cursor < pattern_len:
            return ''

        return tape[min_left_cursor:min_right_cursor + 1]
```

[1]: https://leetcode.com/problems/minimum-window-substring/description/
