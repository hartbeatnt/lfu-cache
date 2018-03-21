const IndexedList = require('./indexed-list');

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.lists = new IndexedList();
    this.keyMap = {};
    this.size = 0;
  }

  get(key) {
    let index = this.keyMap[key];
    if (!index && index !== 0) return -1;
    let node = this.lists.get(index);
    let value = node.value.remove(key).value;
    if (!node.next) {
      this.lists.addToTail(index + 1, new IndexedList())
    } else if (node.next.key !== index + 1){
      this.lists.addAfterKey(index, index + 1, new IndexedList())
    }
    node.next.value.addToTail(key, value)
    this.keyMap[key]++;
    if (!node.value.size){ 
      this.lists.remove(index)
    };
    return value;
  }

  put(key, value) {
    if (this.capacity < 1) return;
    let prevList = this.keyMap[key];
    if(prevList || prevList === 0) {
      this.lists.get(prevList).value.addToTail(key, value);
      this.get(key)
    } else {
      if (this.size >= this.capacity) {
        let removed = this.lists.head.value.decapitate();
        if (!this.lists.head.value.size){
          this.lists.decapitate();
        }
        this.keyMap[removed.key] = null;
        this.size--;
      }
      if (!this.lists.get(0)) { 
        this.lists.addToHead(0, new IndexedList());
      }
      this.lists.get(0).value.addToTail(key, value);
      this.keyMap[key] = 0;
      this.size++;
    }
  }
};

module.exports = LFUCache;