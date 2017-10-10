### [Permutations][1]

#### Task

Given a collection of numbers, return all possible permutations.

Example:

```
Input:
[1,2,3]

Result:
[1,2,3]
[1,3,2]
[2,1,3]
[2,3,1]
[3,1,2]
[3,2,1]
```

> 1. No two entries in the permutation sequence should be the same.   
> 2. For the purpose of this problem, assume that all the numbers in the collection are **unique**.

#### Analysis

Let us think in terms of recursion. We want to place each number at the first place and then finding all permutations for the reduced set of numbers. This is, actually, the whole solution.

#### Solution

```cpp
void generate(vector<int> &current, set<int> &candidates, vector<vector<int> > &ans) {
    int n = candidates.size();

    if (n == 0) {
        ans.push_back(current);
    } else {
        vector<int> cands(candidates.begin(), candidates.end());

        for (auto it = cands.begin(); it != cands.end(); ++it) {
            auto v = current;
            v.push_back(*it);
            candidates.erase(*it);
            generate(v, candidates, ans);
            candidates.insert(*it);
        }
    }
}

vector<vector<int> > Solution::permute(vector<int> &A) {
    vector<vector<int> > ans = {};
    vector<int> current = {};
    set<int> candidates(A.begin(), A.end());
    generate(current, candidates, ans);
    return ans;
}

```

[1]: https://www.interviewbit.com/problems/permutations/
