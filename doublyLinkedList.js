// An implementation of DoublyLinkedList is a browser history as most visited page 
// will have a prev and a next with the exception of head and tail. 
// Its faster searching a double linked list but it comes at an extra space cost.

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }
  pop() {
    if (!this.head) return undefined;
    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }
  shift() {
    if (!this.head) return undefined;
    const shifted = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shifted.next;
      this.head.prev = null; 
      shifted.next = null;
    }
    this.length--
    return shifted
  }
  unshift(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const currentHead = this.head; 
      currentHead.prev = newNode;
      newNode.next = currentHead;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index < this.lenght / 2) {
      // start from head
      let currentNode = this.head;
      let counter = 0;
      while(counter !== index) {
        currentNode = currentNode.next;
        counter++;
      }
      return currentNode;
    } else {
      // start from tail
      let currentNode = this.tail;
      let counter = this.length - 1;
      while(counter !== index) {
        currentNode = currentNode.prev;
        counter--;
      }
      return currentNode;
    }
  }
  set(index, val) {
    const node = this.get(index);
    if (node) {
      node.value = val;
    }
    return node;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) return undefined
    if (index === 0) {
       return this.unshift(val);
    }
    if (index === this.length) {
      return this.push(val);
    } else {
      const newNode = new Node(val);
      const current = this.get(index);
      const prev = this.get(index - 1);
      prev.next = newNode;
      newNode.prev = prev;
      newNode.next = current;
      current.prev = newNode;
      this.length++
      return this 
    }
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const node = this.get(index);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = null;
    node.prev = null;
    this.length--;
    return node;
  }
}

const first = new Node(12);
first.next = new Node(13);
first.next.prev = new Node(12)

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.push(99);
doublyLinkedList.push(100);
doublyLinkedList.push(102);
// console.log(doublyLinkedList, '=-=-=-=-');
// doublyLinkedList.pop();
doublyLinkedList.shift();
// console.log(doublyLinkedList, '=--=-=-=-');
// doublyLinkedList.pop();
doublyLinkedList.shift();
// console.log(doublyLinkedList, '--=-=-=-=');
doublyLinkedList.unshift(100)
// console.log(doublyLinkedList, '--=-=-=-=');
doublyLinkedList.unshift(99)
// console.log(doublyLinkedList, '--=-=-=-=');
// console.log(doublyLinkedList.get(1));
doublyLinkedList.set(10, 1000)
// console.log(doublyLinkedList.get(1), '=-=-prev');
doublyLinkedList.insert(1, 'I AM that I AM');
// console.log(doublyLinkedList.get(1), '=-=-after');
console.log(doublyLinkedList, '=-=-=-=before')
console.log(doublyLinkedList.remove(3))
console.log(doublyLinkedList, '=-=-after remove')
