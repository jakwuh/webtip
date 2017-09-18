### [Intersection of Linked Lists][1]

#### Task

Write a program to find the node at which the intersection of two singly linked lists begins.

For example, the following two linked lists:

```
A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗
B:     b1 → b2 → b3
```

begin to intersect at node `c1`.

Notes:
- If the two linked lists have no intersection at all, return null.
- The linked lists must retain their original structure after the function returns.
- You may assume there are no cycles anywhere in the entire linked structure.
- Your code should preferably run in O(n) time and use only O(1) memory.


#### Analysis

Let `min_length` be the minimum of `first_list_length` and `second_list_length`. The intersection of lists can not begin earlier than `min_length` left to the last node (true for both first and second lists). Thus we will create `pointer_first` and move it forward by `first_list_length - min_length` nodes and `pointer_second` moving it forward by `second_list_length - min_length` nodes. After that we compare `pointer_first` and `pointer_second` and move them forward until they become equal.

#### Solution

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
int len(ListNode* A) {
    int l = 0;
    while (A && A->next) {
        A = A->next;
        l++;
    }
    return l;
}

ListNode* Solution::getIntersectionNode(ListNode* A, ListNode* B) {
    int len_a = len(A);
    int len_b = len(B);

    int min_len = std::min(len_a, len_b);

    for (int i = 0; i < len_a - min_len; ++i) A = A->next;
    for (int i = 0; i < len_b - min_len; ++i) B = B->next;

    while (A && A->next && B && B->next && A != B) {
        A = A->next;
        B = B->next;
    }

    return A == B ? A : NULL;
}

```

[1]: https://www.interviewbit.com/problems/intersection-of-linked-lists/
