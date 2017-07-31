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

    put(key, value) {
        let {_map, _history} = this;
        let _mapValue = _map[key];

        if (_mapValue) {
            let [_, listItem] = _mapValue;

            this.touch(listItem);
            _mapValue[0] = value;
        } else {
            let size = _history.size(),
                listItem = {key};

            if (size >= this._capacity) {
                let lastItem = _history.last();

                _history.erase(lastItem);
                _map[lastItem.key] = undefined;
            }

            _map[key] = [value, listItem];
            _history.unshift(listItem);
        }
    }

    touch(item) {
        this._history.erase(item);
        this._history.unshift(item);
    }

    createNew(capacity) {
        return new LRUCache(capacity);
    }

}
