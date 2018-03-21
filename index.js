const List = require('./indexed-list');
const Cache = require('./lfu-cache');
const assert = (expect, describe) => console.log((expect? '.' : 'X'),describe);
const objStringCompare = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

let list1 = new List()
assert(
  list1,
  'list1 exists'
)
assert(
  list1.decapitate() === false,
  'decapitate should return false when called with an empty list'
)
assert(
  list1.get(1) === false,
  'get should return false when called with key that has not been added'
)
list1.addToTail(1,1);
assert(
  list1.size === 1,
  'size grows when adding items'
)
assert(
  list1.head.key === 1,
  'adding the first node sets the head key'
)
assert(
  list1.head.value === 1,
  'adding the first node sets the head value'
)
assert(
  list1.tail.key === 1,
  'adding the first node sets the tail key'
)
assert(
  list1.tail.value === 1,
  'adding the first node sets the tail value'
)
assert(
  list1.get(1).value === 1,
  'get should return the value when called with a key that has been added'
)
list1.addToTail(2,2);
assert(
  list1.size === 2,
  'size grows when adding items'
)
assert(
  list1.tail.key === 2 && list1.tail.value === 2,
  'should add to the tail node'
)
assert(
  list1.head.key === 1 && list1.head.value === 1,
  'adding a node to the tail should not affect the head'
)
assert(
  list1.head.next === list1.tail && list1.tail.prev === list1.head,
  'should adjust nexts and prevs'
)
assert(
  list1.decapitate().key === 1,
  "decapitate should return the previous head's key and value"
)
assert(
  list1.size === 1,
  "decapitate should decrease size"
)
assert(
  list1.get(1) === false,
  'decapitate should remove the key associated with the head'
)
assert(
  list1.head.key === 2 && list1.head.value === 2,
  'decapitate should set the previous head\'s next as the new head'
)
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
  list1.get(1).value === 3, 
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
  list1.remove(2).value === 2, 
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
cache0.put(1,'A')
cache0.put(2,'B')
assert(
  cache0.get(1) === 'A', 
  "get 1 should return A"
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

const cache1 = new Cache(2);
cache1.put(3,1)
cache1.put(2,1)
cache1.put(2,2)
cache1.put(4,4)
assert(
  cache1.get(2) === 2,
  "two should remain"
)


console.log('-------------------')
const c3 = new Cache(10);
[
  [10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],
  [5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],
  [4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],
  [1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],
  [5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],
  [4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],
  [9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],
  [10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],
  [3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],
  [1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]
].forEach(arr => {
  arr.length > 1
    ? c3.put(arr[0],arr[1])
    : c3.get(arr[0])
})


console.log('-------------------')
const c4 = new Cache(10);
const outputs = [
  null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,
  5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,
  -1,24,null,null,18,null,null,null,null,14,null,null,18,null,null,11,null,null,
  null,null,null,18,null,null,-1,null,4,29,30,null,12,11,null,null,null,null,29,
  null,null,null,null,17,-1,18,null,null,null,-1,null,null,null,20,null,null,null,
  29,18,18,null,null,null,null,20,null,null,null,null,null,null,null
];
[
  [10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],
  [9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],
  [6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],
  [7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],
  [5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],
  [12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],
  [3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],
  [1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],
  [4,22],[7,24],[9,26],[13,28],[11,26]
].forEach((arr,i) => {
  if (arr.length > 1) {
    assert(c4.put(arr[0],arr[1]) == outputs[i], `${i}-- setting ${arr[0]} ${arr[1]}`)
  } else {
    let val = c4.get(arr[0])
    assert(val == outputs[i], `${i}-- getting ${arr[0]} : is ${val} should be ${outputs[i]}`)
  }
})