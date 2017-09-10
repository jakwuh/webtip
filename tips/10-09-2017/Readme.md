### [Single Number][1]

While working hard to prepare [#CSSMinskJS][2] conference (see the photo at the end of the post) I relax by solving algorithmic tasks. We have actually done it! The conference was pretty awesome. I will have a separate post devoted to the inside and outside parts of it.

#### Task

Given an array of integers, every element appears twice except for one. Find that single one.

*Note: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?*

#### Analysis

I guess just saying `x ^ x = 0` would be enough to solve the task because obviously we have:  
```
a[1] ^ a[1] ^ ... a[i-1] ^ a[i-1] ^ a[i] ^ a[i+1] ^ a[i+1] ^ ... ^ a[j] ^ a[j] = a[i]
```

#### Solution

```cpp
int Solution::singleNumber(const vector<int> &A) {
    int x = A[0];
    for (int i = 1; i < A.size(); ++i) {
        x ^= A[i];
    }
    return x;
}
```

![#CSSMinskJS](./photo.jpg)
*(At the [#CSSMinskJS][2] conference)*

[1]: https://www.interviewbit.com/problems/single-number/
[2]: https://www.instagram.com/explore/tags/cssminskjs/
