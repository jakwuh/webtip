### [Matrix Median][1]

#### Task

Given a `N` cross `M` matrix of positive integers in which each row is sorted, find the overall median of the matrix. Assume `N` * `M` is odd. No extra memory is allowed.

For example:

```
Matrix:
[1, 3, 5]
[2, 6, 9]
[3, 6, 9]

A: [1, 2, 3, 3, 5, 6, 6, 9, 9]

Result: 5
```

#### Analysis

As far as no extra memory is allowed we will do a binary search on the hole possible range of medians. First we will try to find the median in a range `[1, INT_MAX]`. We will go through each row and calculate with a binary search how many elements of it are lower, equal or upper `(1 + INT_MAX) / 2`. The complexity for processing one row is `O(log(m))`, the complexity for making one iteration is `O(n log(m))`. Finally, we'll get the median after a maximum of `log_2(INT_MAX)` iterations (due to usage of binary search). So, the overall complexity is `O(log(INT_MAX) n log(m))`.

#### Solution

```cpp
int find(vector<vector<int> > &A, int low, int high) {
    int lower_count = 0;
    int upper_count = 0;
    int M = (1ll + high + low) / 2;

    for (auto &row : A) {
        auto left = std::lower_bound(row.begin(), row.end(), M);
        auto right = std::upper_bound(row.begin(), row.end(), M);
        lower_count += std::distance(row.begin(), left);
        upper_count += std::distance(right, row.end());
    }

    int n = A.size();
    int m = A[0].size();

    int equal_count = n * m - upper_count - lower_count;
    int median_index = (n * m) / 2;

    if (median_index < lower_count) {
        return find(A, low, M - 1);   
    } else if (median_index >= lower_count + equal_count) {
        return find(A, M + 1, high);
    } else {
        return M;
    }
}

int Solution::findMedian(vector<vector<int> > &A) {
    return find(A, 1, INT_MAX);
}
```


[1]: https://www.interviewbit.com/problems/matrix-median/
