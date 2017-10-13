### [Nearest Smaller Element][1]

#### Task

Given an array, find the nearest smaller element `G[i]` for every element `A[i]` in the array such that the element has an index smaller than `i`.

More formally,

`G[i]` for an element `A[i]` = an element `A[j]` such that:  
- `j` is maximum possible AND
- `j` < `i` AND
- `A[j]` < `A[i]`  

Elements for which no smaller element exist, consider next smaller element as -1.

Example:

```
Input: [4, 5, 2, 10, 8]
Result: [-1, 4, -1, 2, 2]

Input: [3, 2, 1]
Result: [-1, -1, -1]
```

#### Analysis

To store the smallest elements we create stack. To save the invariant we use the following piece of code before inserting `A[i]`:

```cpp
while (!s.empty() && s.top() >= A[i]) s.pop();
```

#### Solution

```cpp
vector<int> Solution::prevSmaller(vector<int> &A) {
    stack<int> s;
    vector<int> v(A.size());

    for (int i = 0; i < A.size(); ++i) {

        while (!s.empty() && s.top() >= A[i]) s.pop();

        if (s.empty()) {
            v[i] = -1;
        } else {
            v[i] = s.top();
        }

        s.push(A[i]);
    }

    return v;
}
```

[1]: https://www.interviewbit.com/problems/nearest-smaller-element/
