### [Median of Array][1]

#### Task

There are two sorted arrays A and B of size m and n respectively.

Find the median of the two sorted arrays (the median of the array formed by merging both the arrays ).

The overall run time complexity should be `O(log (m+n))`.

Example:

```
A: [1 4 5]
B: [2 3]
Result: 3
```


> Note: if the number of elements in the merged array is even, then the median is the average of `n / 2`th and `n/2 + 1`th element.
For example, if the array is `[1 2 3 4]`, the median is `(2 + 3) / 2.0 = 2.5`

[1]: https://www.interviewbit.com/problems/median-of-array/

#### Analysis

```
A[0] ... A[i - 1] | A[i] ... A[n - 1]
B[0] ... B[j - 1] | B[i] ... B[m - 1]
```

Let say `A` is splitted by `i` and `B` is splitted by `j`. We can "move" `i` and `j` in such way that:

`i + j == (n - i) + (m - j)`

If with some `i` and `j` the following condition becomes true:

```
B[j - 1] <= A[i] and A[i - 1] <= B[j]
```

then we found the median.

To "move" `i` and `j` we use binary search, so the overall complexity is `O(log(m + n))`.

#### Solution

```cpp
double Solution::findMedianSortedArrays(const vector<int> &A, const vector<int> &B) {

    if (A.empty()) {
        return Solution::findMedianSortedArrays(B, A);
    }

    int n = A.size();
    int m = B.size();

    int l = 0;
    int r = n;
    int s = n + m;
    double ans;

    if (s == 1) {
        return A[0];
    }

    while (1) {
        int i = (l + r + 1) / 2;
        int j = (s + 1) / 2 - i;

        if (j > m) {
            l = i + 1;
        } else if (i > 0 && j < m && A[i - 1] > B[j]) {
            r = i - 1;
        } else if (j > 0 && i < n && B[j - 1] > A[i]) {
            l = i + 1;
        } else {

            int max = INT_MIN;

            if (i > 0 && A[i - 1] > max) max = A[i - 1];
            if (j > 0 && B[j - 1] > max) max = B[j - 1];

            int min = INT_MAX;

            if (i < n && A[i] < min) min = A[i];
            if (j < m && B[j] < min) min = B[j];

            if (s % 2 == 1) ans = max;
            else ans = (min + max) * 1. / 2;
            break;
        }

    }

    return ans;
}

```
