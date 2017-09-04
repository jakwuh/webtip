### [Word Ladder II][1]

#### Task

Given two words (`beginWord` and `endWord`), and a dictionary's word list, find all shortest transformation sequence(s) from `beginWord` to `endWord`, such that:

- Only one letter can be changed at a time
- Each transformed word must exist in the word list. Note that `beginWord` is not a transformed word.

Example inputs:

```
beginWord = "hot"
endWord = "dog"
wordList = ["hot","dot","dog"]
Result:
[
    ["hot", "dot", "dog"]
]
```

```
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
Result:
[
   ["hit","hot","dot","dog","cog"],
   ["hit","hot","lot","log","cog"]
 ]
```

Note:
- Return an empty list if there is no such transformation sequence.
- All words have the same length.
- All words contain only lowercase alphabetic characters.
- You may assume no duplicates in the word list.
- You may assume beginWord and endWord are non-empty and are not the same.


#### Analysis

To solve the task we build a graph with words used as vertices. If one word could be transformed from another one by changing only one letter then corresponding vertices are connected with an edge. Finally, we find all shortest paths from `beginWord` to `endWord` (w/ [bfs][2]).

#### Solution

```python
def is_transformation(a, b):
    cond = False
    for i, l in enumerate(a):
        if l != b[i]:
            if cond:
                return False
            cond = True

    return True

def build_paths(parents, i):
    if i == 0:
        return [[0]]

    result = []
    for parent in parents[i]:
        for path in build_paths(parents, parent):
            result.append(path + [i])

    return result

class Solution(object):
    def findLadders(self, beginWord, endWord, wordList):
        """
        :type beginWord: str
        :type endWord: str
        :type wordList: List[str]
        :rtype: List[List[str]]
        """
        if not endWord in wordList:
            return []

        wordList.remove(endWord)
        wordList.append(endWord)

        if beginWord in wordList:
            wordList.remove(beginWord)

        words = [beginWord] + wordList
        n = len(words)
        vs = []

        for i, a in enumerate(words):
            vs.append([])
            for ind, b in enumerate(words):
                if ind != i:
                    if is_transformation(a, b):
                        vs[i].append(ind)

        queue = [0]
        parents = list([] for i in range(0, n))
        lengths = [9999999] * n
        lengths[0] = 0
        visited = [0] * n
        dest = n - 1

        while len(queue):
            i = queue.pop()

            if visited[i]:
                continue;

            if i == dest:
                continue;

            visited[i] = 1

            for ind in vs[i]:
                length = lengths[i] + 1

                if length < lengths[ind]:
                    parents[ind] = [i]
                    lengths[ind] = length
                elif length == lengths[ind]:
                    parents[ind].append(i)

                queue.insert(0, ind)

        paths = build_paths(parents, dest)

        result = []
        for path in paths:
            current = []
            for i in path:
                current.append(words[i])
            result.append(current)

        return result

```

[1]: https://leetcode.com/problems/word-ladder-ii/
[2]: https://en.wikipedia.org/wiki/Breadth-first_search
