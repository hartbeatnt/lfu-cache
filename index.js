const List = require('./indexed-list');
const Cache = require('./lfu-cache');
const assert = (expect, describe) => console.log((expect? '.' : 'X'),describe);
const objStringCompare = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

let list1 = new List()
assert(list1, 'list1 exists')
assert(list1.decapitate() === false, 'decapitate should return false when called with an empty list')
assert(list1.get(1) === false, 'get should return false when called with key that has not been added')
list1.addToTail(1,1);
assert(list1.size === 1, 'size grows when adding items')
assert(list1.head.key === 1, 'adding the first node sets the head key')
assert(list1.head.value === 1, 'adding the first node sets the head value')
assert(list1.tail.key === 1, 'adding the first node sets the tail key')
assert(list1.tail.value === 1, 'adding the first node sets the tail value')
assert(list1.get(1) === 1, 'get should return the value when called with a key that has been added')
list1.addToTail(2,2);
assert(list1.size === 2, 'size grows when adding items')
assert(list1.tail.key === 2 && list1.tail.value === 2, 'should add to the tail node')
assert(list1.head.key === 1 && list1.head.value === 1, 'adding a node to the tail should not affect the head')
assert(list1.head.next === list1.tail && list1.tail.prev === list1.head, 'should adjust nexts and prevs')
assert(objStringCompare(list1.decapitate(), {key:1, value:1}), "decapitate should return the previous head's key and value")
assert(list1.size === 1, "decapitate should decrease size")
assert(list1.get(1) === false, 'decapitate should remove the key associated with the head')
assert(list1.head.key === 2 && list1.head.value === 2, 'decapitate should set the previous head\'s next as the new head')
list1.addToTail(1,1)
assert(
  list1.head.next.key === 1, 
  "adding a second node sets the head's next"
)
list1.addToTail(3,3)
assert(
  list1.size === 3, 
  "size should readjust when adding new entries"
)
list1.addToTail(1,3)
assert(
  list1.get(1) === 3, 
  "adding a key that was previously added updates the value"
)
assert(
  list1.head.next.key === 3, 
  "adding a key that was previously added moves the node to the end of the list"
)
assert(
  list1.size === 3, 
  "size should not readjust when adding an entry that is already present"
)
assert(
  list1.remove(2) === 2, 
  "removing a key returns the value"
)
assert(
  list1.head.key === 3, 
  "removing the head should set the old head's next as the new head"
)
list1.remove(1)
assert(
  list1.tail.key === 3, 
  "removing the tail should set the old tail's prev as the new tail"
)
list1.decapitate()
assert(
  list1.size === 0, 
  "should be no size left after removing everything"
)
assert(
  Object.keys(list1.index).every(idx => !list1[idx]) == true, 
  "should be nothing left to index"
)



console.log('-----------------')
let cache0 = new Cache(2);
assert(
  cache0, 
  'cache0 exists'
)
cache0.put(1,1)
cache0.put(2,2)
assert(
  cache0.get(1) === 1, 
  "get 1 should return 1"
)
cache0.put(3,3)
assert(
  cache0.get(2) === -1, 
  "get 2 should be overwritten"
)
assert(
  cache0.get(3) === 3, 
  "get 3 should return 3"
)
cache0.put(4,4)
assert(
  cache0.get(1) === -1, 
  "get 1 should be overwritten"
)
assert(
  cache0.get(3) === 3, 
  "get 3 should return 3"
)
assert(
  cache0.get(4) === 4, 
  "get 4 should return 4"
)
