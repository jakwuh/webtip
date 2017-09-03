### [Largest Rectangle in Histogram][1]

#### Task

Given `n` non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

![histogram](./histogram.png)

![histogram area](./histogram_area.png)

Example inputs:

```
[2,1,5,6,2,3]
Result: 10
```

```
[2,1,2]
Result: 3
```

#### Analysis

Consider bar at position `i`. To find the area of a rectangle with `heights[i]` as a minimal height we need to know the index of a first smaller bar to the right and to the left relatively to the considered bar. To find it we use a stack and the following algorithm:

1. Let `S` be an empty stack
2. Let `i` be the current index and `h` be the current height. If `h` is `>=` that the last element in `S` then simply push `h` to `S`. Otherwise while the last element in `S` is `>` `h` repeat the following: assign `S.pop()` to `x`, calculate area with `x` being a minimal height and width equal to `i - index`, where `index` is the index corresponding to `x`. While `i` < `len(heights)` increment it and repeat the step

#### Solution

```python
class Solution(object):
    def largestRectangleArea(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        heights.append(0)
        indices = []
        area = 0

        for index, current in enumerate(heights):
            while len(indices) and heights[indices[-1]] > current:
                i = indices.pop()
                area = max(area, (index - i) * heights[i])

            indices.append(index)

        return area
```

[1]: https://leetcode.com/problems/largest-rectangle-in-histogram/description/
