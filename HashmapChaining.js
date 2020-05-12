import LinkedList from './LinkedList'


class HashMapChaining {
    constructor(initialCapacity=8){
        this.length = 0;
        // hashTable will hold all of the data
        this._hashTable=[];
        this._capacity = initialCapacity;
        this._deleted=0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            return null;
        }
        let values = []
        let currentItem = this._hashTable[index].value.head;

        while (currentItem) {
            values.push(currentItem.value);
            currentItem = currentItem.next;
        }
        return values;
    };

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMapChaining.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMapChaining.SIZE_RATIO);
        }

        // Find the slot where the key/value should be stored
        // Doesn't matter if there's a collision bc we can form a LinkedList
        const index = this._findSlot(key);

        // if the slot doesn't already exist, create it
        // the value should be a new LinkedList so we we resolve collisions
        // by adding to it if another item is assigned this index
        if(!this._hashTable[index]) {
            this._hashTable[index] = {
                key,
                value: new LinkedList(),
                DELETED: false
            };
            this.length++;
        }
        // push the new value onto the LinkedList located at this index
        // in the hashTable.  If the LinkedList was just created and this
        // is its 1st item, the LinkedList component's insertLast method
        // is prepared to call insertFirst(value)
        this._hashTable[index].value.insertLast(value)
    };

    _findSlot(key) {
        const hash = HashMapChaining._hashString(key)
        const index = hash % this._capacity;
        
        // since we're going to use this location and build a linked list
        // regardless, we don't need to look for a slot that is either 
        // empty or has the same key as was passed in as the argument
        return index; 
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length bc it will get rebuilt as you add items back
        this._length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                let currentValue = slot.value.head;
                while (currentValue) {
                    this.set(slot.key, currentValue.value);
                    currentValue = currentValue.next;
                }
            }
        }
    }


    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

}

HashMapChaining.MAX_LOAD_RATIO = 0.5;
HashMapChaining.SIZE_RATIO = 3;

module.exports = HashMapChaining