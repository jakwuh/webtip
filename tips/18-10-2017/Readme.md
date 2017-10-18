### [Max Continuous Series of 1s][1]

#### Task

Given an array of 1s and 0s and an integer M, which signifies number of flips allowed, find the position of zeros which when flipped will produce maximum continuous series of 1s.

Return the indices of maximum continuous series of 1s in order.

Example:

```
Input :
Array = {1 1 0 1 1 0 0 1 1 1 }
M = 1

Output :
[0, 1, 2, 3, 4]
```

If there are multiple possible solutions, return the sequence which has the minimum start index.

#### Analysis

We will store 2 pointers reflecting the following condition: at any moment there must be exactly M zeros between the first and the second pointers. Simultaneously we will track the distance between pointers to find the maximum. This is the only thing we need to give the answer.

#### Solution

```cpp
vector<int> Solution::maxone(vector<int> &A, int B) {
    auto left = A.begin();
    auto right = left;

    while (right != A.end() && (*right == 1 || B--)) right++;

    int max_len = 0;
    auto it = A.begin();

    while (left != A.end()) {

        if (std::distance(left, right) > max_len) {
            max_len = std::distance(left, right);
            it = left;
        }

        if (*left == 0 && right != A.end()) ++right;

        ++left;

        while (right != A.end() && *right == 1) ++right;

    }

    vector<int> s(max_len);
    int index = std::distance(A.begin(), it);
    for (int k = 0; k < max_len; ++k) {
        s[k] = k + index;
    }

    return s;

}

```

[1]: https://www.interviewbit.com/problems/max-continuous-series-of-1s/
