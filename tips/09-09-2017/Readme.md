### [Candy][1]

"What a simple task" - I thought and took **8**(!) attempts to complete the task. Simple, but not easy, indeed.

#### Task

There are N children standing in a line. Each child is assigned a rating value.

You are giving candies to these children subjected to the following requirements:

- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

What is the minimum candies you must give?

#### Analysis

##### 1.  First,  
there is a straight forward solution for this task which uses `O(n)` memory and works in linear time. The algorithm is following:
1. Iterate from left to right and give 1 candy to each child unless its rating is bigger than the previous one (`[i-1]`). If so, give him 1 candy more than the previous child has been given.
2. Iterate from right to left and leave child's candies count unchanged unless its rating is bigger than the previous one (`[i+1]`). If so, give him 1 candy more that the previous child has been given if the count will be bigger than the current child's candies count otherwise leave it unchanged.

##### 2. Second,
we could definitely perform better. If we make the only iteration from left to right, then it is unclear how many candies should we give to a child because we are not aware of the following ratings' sequence. Here we come to the general statements of the solution:

Assume we are iterating from left to right. Let:
- `curr` be the rating of a current child
- `prev` be the rating of the previous child.
- `pprev` be the rating of the prior to the previous child
- `last_c` be the number of candies of the previous child

1) If `curr` > `prev` then current child should receive more candies that previous child. However, if `pprev` >= `prev` then previous child should receive exactly 1 candy (the possible minimum). Hence while iterating from left to right we should track the number of non-strictly descending children's ratings and at this point we should decrease the final candies sum by `(last_c - 1) * number_of_the_most_recent_not_strictly_descending_ratings`
2) If `curr` < `prev` then current child should receive less candies than previous child. Thus, if `last_c > 1` then we simply give him 1 candy less. Otherwise, we have to increase the number of candies for children with the most recent strictly descending ratings by 1 and by that increase `last_c` by 1 also. As you might guess we need to track `number_of_the_most_recent_strictly_descending_ratings` as well.

See the 2nd solution to find out how to track `number_of_the_most_recent_strictly_descending_ratings`(`dec_c_up`) and `number_of_the_most_recent_not_strictly_descending_ratings`(`dec_c_down`).

#### Solution

##### 1. `O(n)` memory, `O(n)` time
```python
def simple_candy(ratings):
    n = len(ratings)
    candies = [1] * n

    for index in range(1, n):
        prev = ratings[index - 1]
        current = ratings[index]

        if current > prev:
            candies[index] = candies[index - 1] + 1

    for index in range(n - 2, -1, -1):
        prev = ratings[index + 1]
        current = ratings[index]

        if current > prev:
            candies[index] = max(candies[index], candies[index + 1] + 1)

    return sum(candies)
```

##### 2. `O(1)` memory, `O(n)` time

```python
def candy(ratings):
    if not ratings:
        return 0

    dec_c_up = 1
    dec_c_down = 1
    sum_c = 1
    last_c = 1

    for index, current_rating in enumerate(ratings[1:]):
        prev_rating = ratings[index]

        if current_rating > prev_rating:
            if dec_c_down > 1 and last_c > 1:
                sum_c -= (dec_c_down - 1) * (last_c - 1)
                last_c = 2
            else:
                last_c += 1

            dec_c_up = dec_c_down = 1
        elif current_rating == prev_rating:
            dec_c_down += 1
            dec_c_up = 1
        else:
            if last_c == 1:
                sum_c += dec_c_up
            else:
                last_c -= 1

            dec_c_up += 1
            dec_c_down += 1

        sum_c += last_c

    return sum_c - (dec_c_down - 1) * (last_c - 1)
```

[1]: https://leetcode.com/problems/candy/description/
