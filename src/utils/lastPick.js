class Queue {
  constructor() {
    this.array = []; // Use an array to store queue elements
  }

  // Method to add an element to the back of the queue
  push(val) {
    this.array.push(val);
  }

  // Method to remove an element from the front of the queue
  pop() {
    if (this.array.length === 0) {
      console.log('Choose color'); // Handle empty queue case
    } else {
      return this.array.shift(); // Remove and return the front element
    }
  }

  // Method to get the current size of the queue
  size() {
    return this.array.length;
  }

  // Method to check if the queue is empty
  isEmpty() {
    return this.array.length === 0;
  }
}

export default Queue;
