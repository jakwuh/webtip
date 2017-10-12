### [Rearrange Array][1]

#### Task

Rearrange a given array so that `arr[i]` becomes `arr[arr[i]]` with `O(1)` extra space.

Example:

```
Input : [1, 0]
Result : [0, 1]
```

> Lets say N = size of the array. Then, following holds true:  
- All elements in the array are in the range [0, N-1]  
- N * N does not overflow for a signed integer

#### Analysis

As far as we should use `O(1)` extra space it is most likely we should transform an array in such a way that each element holds information about initial value and its future value. Here we come to the trick:

```
X = A[i] + (A[A[i]] % n) * n;
```

`A[i] < n` and that means `X % n == A[i]` and `X / n == A[A[i]]`.

#### Solution

```cpp
void Solution::arrange(vector<int> &A) {
    int n = A.size();

    for (int i = 0; i < n; ++i) {
       A[i] = A[i] + (A[A[i]] % n) * n;
    }

    for (int i = 0; i < n; ++i) {
        A[i] = A[i] / n;
    }
}
```

[1]: https://www.interviewbit.com/problems/rearrange-array/
