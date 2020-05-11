class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
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

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        // Find the slot where this should be in
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

    // _hashTable array will never be full due to our max load factor 
    // so the function will always return a slot
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

}