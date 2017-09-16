### [Find Median from Data Stream][1]

#### Task

Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.

Examples:  
`[2,3,4]` - the median is `3`  
`[2,3]` - the median is `(2 + 3) / 2 = 2.5`

Design a data structure that supports the following two operations:

`void addNum(int num)` - add an integer number from the data stream to the data structure.  
`double findMedian()` - return the median of all elements so far.

For example:

```
addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3)
findMedian() -> 2
```

#### Analysis

If we slice an ordered list in the middle, then the median will be the last element of the left part or the first element of the right part. The last element of the left part is the maximum element of that part and the first element of the right part is the minimum element of that part. Thus, the solution is to keep two heaps: minimum heap for the largest elements and maximum heap for the smallest elements. This gives us `O(log(n))` *insert* and `O(1)` *find* time complexity.

#### Solution

```python
class MedianFinder(object):

    def __init__(self):
        self.maxHeap = []
        self.minHeap = []

    def addNum(self, num):
        if not self.minHeap or num >= self.minHeap[0]:
            heapq.heappush(self.minHeap, num)
        else:
            heapq.heappush(self.maxHeap, -num)

        diff = len(self.minHeap) - len(self.maxHeap)

        if diff == 2:
            item = heapq.heappop(self.minHeap)
            heapq.heappush(self.maxHeap, -item)
        elif diff == -2:
            item = heapq.heappop(self.maxHeap)
            heapq.heappush(self.minHeap, -item)

    def findMedian(self):
        comparison = cmp(len(self.minHeap), len(self.maxHeap))

        if comparison == 0:
            return (self.minHeap[0] - self.maxHeap[0]) / 2.
        elif comparison < 0:
            return -self.maxHeap[0]
        else:
            return self.minHeap[0]
```

[1]: https://leetcode.com/problems/find-median-from-data-stream/description/
