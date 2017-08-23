#### [First Missing Positive][1]

##### Task

Given an unsorted integer array, find the first missing positive integer.

Example inputs:

```
in: [1, 2, 0]
out: 3
```

```
in: [3, 4, -1, 1]
out: 2
```

```
in: [1]
out: 2
```

An algorithm should run in `O(n)` time and use constant space.

##### Analysis

The idea is to place each number in its place. That is, `1` should be placed at `nums[0]` and `5` should be placed at `nums[4]`. If there is no appropriate place for a number, ignore it (e.g. `-3`).

##### Solution

```python
class Solution(object):
    def firstMissingPositive(self, nums):
        l = len(nums)
        i = 0

        while i < l:
            val = nums[i]

            if val == i + 1 or not 0 < val <= l:
                i += 1
            elif nums[val - 1] == val:
                nums[i] = -1
                i += 1
            else:
                nums[i] = nums[val - 1]
                nums[val - 1] = val

        for i, val in enumerate(nums):
            if i != val - 1:
                return i + 1

        return l + 1

```

[1]: https://leetcode.com/problems/first-missing-positive/description/
