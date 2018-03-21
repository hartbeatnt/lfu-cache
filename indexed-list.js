class IndexedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.index = {};
    this.size = 0;
  }

  addToTail(key, value) {
    let node = { key, value };
    if (this.index[key]) {
      this.remove(key);
    }
    this.index[key] = node;
    if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
    } else {
      node.prev = null;
      this.head = node;
    }
    node.next = null;
    this.tail = node;
    this.size++;
  }

  addToHead(key, value) {
    let node = { key, value };
    if (this.index[key]) {
      this.remove(key);
    }
    this.index[key] = node;
    if (this.head) {
      node.next = this.head;
      this.head.prev = node;
    } else {
      node.next = null;
      this.tail = node;
    }
    node.prev = null;
    this.head = node;
    this.size++;
  }

  addAfterKey(prevKey, key, value) {
    let node = { key, value };
    let neighbor = this.get(prevKey);
    if (this.index[key]) {
      this.remove(key);
    }
    this.index[key] = node;
    node.next = neighbor.next;
    node.next.prev = node;
    node.prev = neighbor;
    neighbor.next = node;
  }

  decapitate() {
    let node = this.head;
    if (!node) return false;
    this.index[node.key] = null;
    if (node.next) {
      this.head = node.next;
      this.head.prev = null;
    } else {
      this.head = null;
    }
    this.size--;
    return node;
  }

  get(key) {
    let node = this.index[key];
    if(!node) return false;
    return node;
  }

  remove(key) {
    let node = this.index[key];
    if(!node) return false;
    this.index[key] = null;
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    this.size--;
    return node;
  }
}

module.exports = IndexedList;