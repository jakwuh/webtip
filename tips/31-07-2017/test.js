import test from 'ava';
import {LRUCache, DoubleLinkedList} from './index.js';

test('DoubleLinkedList size', t => {
    let list = new DoubleLinkedList();

    t.is(list.size(), 0);

    let item = {};
    list.unshift(item);
    t.is(list.size(), 1);

    list.erase(item);
    t.is(list.size(), 0);
});

test('LRUCache', t => {
    let lru = new LRUCache(5);

    lru.put(1, 1);
    lru.put(2, 2);
    lru.put(3, 3);
    lru.put(4, 4);
    lru.put(5, 5);
    lru.put(6, 6);

    t.is(lru.get(1), undefined);
    t.is(lru.get(6), 6);
});
