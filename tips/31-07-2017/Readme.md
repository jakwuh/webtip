LRU cache (*least recently used cache*) is a type of cache with fixed capacity which discards the least recently used item. Such type of cache is useful when:

- The system has a limited amount of memory for cache
- The system has frequently and rarely used keys while running

> I have already used this type of cache in my implementation of [*streaming server side rendering*](https://github.com/jakwuh/ssr-demo) which I had covered in [my talk at MinskJS](https://www.youtube.com/watch?v=H4GTPbf0D40).

LRU cache should support the following operations:

`get(key)` - get the value of the key if the key exists in the cache, otherwise return `undefined`.

`put(key, value)` - set or insert the value if the key is not already present. Once the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

Our task is to implement these operations in `O(1)` time complexity.

### Step 1

As we described above, LRU cache should discard the most recently used item before inserting a new one. This means we need to know somehow (and update the information on) which element was not used for a long time (in `O(1)` time). For this purpose we could use a **DoubleLinkedList** which we will call **history**, as far as a list does insert / remove in `O(1)` time assuming we have an iterator for the list item.

<details>
  <summary>DoubleLinkedList implementation</summary>
  <p>

  ```js
  export class DoubleLinkedList {
      constructor() {
          this._size = 0;
          this._head = {};
          this._tail = {};

          this.link(this._head, this._tail);
      }

      link(left, right) {
          left.right = right;
          right.left = left;
      }

      last() {
          let left = this._tail.left;

          if (left !== this._head) {
              return left;
          }
      }

      size() {
          return this._size;
      }

      erase(item) {
          --this._size;
          this.link(item.left, item.right);
      }

      unshift(item) {
          ++this._size;
          this.link(item, this._head.right);
          this.link(this._head, item);
      }
  }
  ```
  </p>
</details>

### Step 2

Lets first implement the `get` operation. From what we've learned, it should do 2 things: return the value for the key in cache if it exists and update usage information in our **history** (instance of **DoubleLinkedList**). Simply put we should retrieve the value **and** the **history** item iterator for the given **key** from a hashmap, move the iterator to the top of the list and return the value. Coding this we finally get:

```js
export class LRUCache {
    constructor(capacity) {
        this._history = new DoubleLinkedList();
        this._capacity = capacity;
        this._map = {};

        if (capacity < 1) {
            throw new Error('Capacity should be a positive value');
        }
    }

    get(key) {
        let _mapValue = this._map[key];

        if (_mapValue) {
            let [value, listItem] = _mapValue;
            this.touch(listItem);
            return value;
        }
    }
```

where `touch` is the 2-line method:

```js
touch(item) {
    this._history.erase(item);
    this._history.unshift(item);
}
```

### Step 3

Hold on! We are almost done as our last task is to implement the `put` method. The method has 3 different execution branches, which we could easily see through the code:

```js
put(key, value) {
    let {_map, _history} = this;
    let _mapValue = _map[key];

    // do we have an appropriate key already in cache?
    if (_mapValue) {

        // yes, we do have an appropriate key already in cache
        let [_, listItem] = _mapValue;

        // lets do pretty much the same as in `get` method:
        // 1. move the iterator to the head of the history
        this.touch(listItem);

        // 2. update the corresponding value for the given key
        _mapValue[0] = value;
    } else {

        // no, we do not have an appropriate key already in cache
        let size = _history.size(),
            listItem = {key};

        // do we already hit the capacity limit?
        if (size >= this._capacity) {

            // if so, we need to remove the least recently used item:
            // 1. retrieve the least recently used item
            let lastItem = _history.last();

            // 2. remove it from the history
            _history.erase(lastItem);

            // 3. remove it from the map (we need `key` property here)
            _map[lastItem.key] = undefined;
        }

        // save the new value in the map
        _map[key] = [value, listItem];
        // and move the iterator to the head of the history
        _history.unshift(listItem);
    }
}
```

### Conclusion

That's it! We have implemented a very useful and efficient data structure in just about 100 LoC. Which is pretty cool.

BTW, this task is considered to be [hard at leetcode](https://leetcode.com/problems/lru-cache/description/). Though it beats only ~50% of all other solutions by runtime. Hence, our next task will be to optimize our solution to become the best one!
