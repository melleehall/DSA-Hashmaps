class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    // Best & average-case performance is O(1) and worse case is O(n)
    // if collision takes place.
    set(key, value) {
        // First check if load ratio is creater than given maximum
        // and if so, resize.
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        // Find the slot where this key should be
        const index = this._findSlot(key);

        if(!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }

    // Instead of actually deleting an item, just put a deleted marker
    // in the slot to avoid confusion with items that are located in 
    // a different slot to collision
    // Clear out all deleted items when you resize though
    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    // _hashTable array will never be full due to our max load factor 
    // so the function will always return a slot.
    // Best & average-case performance is O(1) assuming the hash 
    // function is good and load ratio is suitable minimizing chances
    // of collision and keeping need to iterate low.
    // Worse case is O(n) since you have to linearly search each slot.
    _findSlot(key) {
        // finds the correct slot for a given key using the private 
        // hashString() function to calculate the hash of the key
        const hash = HashMap._hashString(key);
        // uses the modulus to find a slot for the key within the current capacity
        const start = hash % this._capacity;

        // loops through the array stopping when it finds the slot with 
        // a matching key or an empty slot
        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    // Not really resizing - actually recreating the has map from
    // scratch with larger capacity.
    // Best and average case are O(n) since each set call is O(1)
    // in the best and average case
    // Worst case is O(n^n) since each set call is O(n) in the worst case
    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length bc it will get rebuilt as you add items back
        this._length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    // famous djb2 algorithm - takes a string and hashes it
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

}

module.exports = HashMap