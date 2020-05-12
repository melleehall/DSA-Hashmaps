class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        // the head indicates the beginning of the list
        // the head always contains the 1st node
        // an empty list is represented by "null"
        this.head = null;
    }

    // O(1) - inserting at only 1 place, the 1st position, regardless of list length
    insertFirst(item) {
        this.head = new _Node(item, this.head)
    }

    // O(n) - you have to iterate over all nodes individually in sequence until you reach the end
    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
                }
                tempNode.next = new _Node(item, null);
            }
    }

    find(item) {
        // start at the head
        let currNode = this.head;
        // if the list is empty
        if (!this.head) {
            return null;
        }
        // check for the item
        while (currNode.value !== item) {
            // return null if by the end of the list the item has not been located
            if (currNode.next === null) {
                return null;
            }
            // otherwise keep looking
            else {
                currNode = currNode.next;
            }
        }
        // found it
        return currNode;
    }

    remove(item) {
        // if list if empty
        if (!this.head) {
            return null;
        }

        // if node to be removed is head, make next node head
        // O(1) - the best case
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        // Start at the head
        let currNode = this.head;
        // keep track of previous
        let previousNode = this.head;

        // O(n) - average and worst case, iterate over each node to find the one you want to remove
        while ((currNode !== null) && (currNode.value !== item)) {
            // save the previous node
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('item not found');
            return;
        }
        previousNode.next = currNode.next;
    }
}

module.exports = LinkedList;