### [Subsets][1]

#### Task

Given a set of distinct integers `S`, return all possible subsets.

*Note:*

- Elements in a subset must be in the non-descending order.
- The solution set must not contain duplicate subsets.
- Also subsets should be sorted in the ascending ( lexicographic ) order.
- The list is not necessarily sorted.

#### Analysis

The key idea is to use a bitmask to represent a subset. A subset `X` contains `A[i]` if and only if `x[i] == 1`. Thus, a bitmask set `0..2^n` where `n = A.size()` represents all the possible subsets.

Example:
```
A = [1, 2, 3]

x = 000, X = []
x = 001, X = [3]
x = 010, X = [2]
x = 011, X = [2, 3]
x = 100, X = [1]
x = 101, X = [1, 3]
x = 110, X = [1, 2]
x = 111, X = [1, 2, 3]
```

Finally, we have to sort received subsets according to the task.

#### Solution

```cpp
vector<vector<int> > Solution::subsets(vector<int> &A) {
    std::sort(A.begin(), A.end());

    // 2 ^ A.size()
    int n = 1 << A.size();

    vector< vector<int> > ans;

    for (int i = 0; i < n; ++i) {
        vector<int> cur;
        for (int j = 0; j < A.size(); ++j) {
            if (1 << j & i) cur.push_back(A[j]);
        }
        ans.push_back(cur);
    }

    std::sort(ans.begin(), ans.end(), [](const vector<int>& a, const vector<int> &b) {
        auto it_a = a.begin();
        auto it_b = b.begin();
        while (it_a != a.end() && it_b != b.end() && *it_a == *it_b) {
            ++it_a;
            ++it_b;
        }
        return it_a == a.end() || (it_b != b.end() && *it_a < *it_b);
    });

    return ans;
}

```

[1]: https://www.interviewbit.com/problems/subset/
