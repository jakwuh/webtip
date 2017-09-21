### [Shortest Unique Prefix][1]

#### Task

Find shortest unique prefix to represent each word in the list.

Example:

```
Input: [zebra, dog, duck, dove]
Output: {z, dog, du, dov}
where we can see that
zebra = z
dog = dog
duck = du
dove = dov
```

Note: assume that no word is prefix of another. In other words, the representation is always possible.

#### Analysis

First, we create a multimap containing prefixes of length 1 with appropriate words:

```
MultiMap:
a -> [ack]
m -> [mod, mobile]
z -> [zebra, zack]

Answer: []
```

Then we iterate through each key and check the following condition: if there is only one value associated with a key then the key is the shortest unique prefix for an appropriate word.

At the second iteration we use prefixes of length 2:

```
MultiMap:
mo -> [mod, mobile]
za -> [zack]
ze -> [zebra]

Answer: [ack]
```

Finally we have:

```
MultiMap:
mod -> [mod]
mob -> [mobile]

Answer: [ack, zack, zebra]
```


#### Solution

```cpp

vector<string> Solution::prefix(vector<string> &A) {
    std::multimap<string, string> m;
    std::map<string, string> ans;

    for (auto &word : A) {
        m.insert(make_pair(string(1, word[0]), word));
    }

    while (!m.empty()) {
        auto pair = m.begin();

        if (m.count(pair->first) == 1) {
            ans[pair->second] = pair->first;
            m.erase(pair);
        } else {
            auto key = pair->first;
            auto range = m.equal_range(key);
            size_t len = key.size() + 1;
            std::multimap<string, string> mc;
            for (auto it = range.first; it != range.second; ++it) {
                mc.insert(make_pair(it->second.substr(0, len), it->second));
            }
            m.erase(range.first, range.second);
            for (auto &it: mc) {
                m.insert(std::move(it));
            }
        }
    }

    std::vector<string> v(A.size());
    for (size_t i = 0; i < A.size(); ++i) {
        v[i] = ans[A[i]];
    }

    return v;
}

```

[1]: https://www.interviewbit.com/problems/shortest-unique-prefix/
