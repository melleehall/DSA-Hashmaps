import HashMap from './Hashmap'

// 1. Create a HashMap class

function main () {
    const lotr = new HashMap()

    lotr.constructor(MAX_LOAD_RATIO = 0.5, SIZE_RATIO = 3);

    lotr.set("Hobbit", "Bilbo");
    lotr.set("Hobbit", "Frodo");
    lotr.set("Wizard", "Gandalf");
    lotr.set("Human", "Aragorn");
    lotr.set("Elf", "Legolas");
    lotr.set("Maiar", "The Necromancer");
    lotr.set("Maiar", "Sauron");
    lotr.set("RingBearer", "Gollum");
    lotr.set("LadyOfLight", "Galadriel");
    lotr.set("HalfElven", "Arwen");
    lotr.set("Ent", "Treebeard");

    // The length is 9 and two of my key/value pairs are missing 
    // (the 2 that had a duplicate key)
    console.log(lotr);

    // returns "Sauron" 
    // "The Necromancer" was replaced as the value for "Maiar"
    console.log(lotr.get("Maiar"))

    // returns "Frodo"
    // "Frodo" was replaced as the value for "Bilbo"
    console.log(lotr.get("Hobbit"))

    // After all items have been hashed, the capacity is 24.  
    // When ("Elf", "Legolas") was added, length + deleted + 1
    // was equal to 5.  The set() method checks if 5/capacity which was 
    // 8 crossed the threshold of MAX_LOAD_RATIO and it did.
    // The _resize method was called with an argument of
    // capacity (8) * SIZE_RATIO (3) = 24.
    // Resizing won't be required again until length + deleted + 1 = 13
}

main()


// 2. WhatDoesThisDo

// const WhatDoesThisDo = function(){
//     let str1 = 'Hello World.';
//     let str2 = 'Hello World.';
//     let map1 = new HashMap();
//     map1.set(str1,10);
//     map1.set(str2,20);
//     let map2 = new HashMap();
//     let str3 = str1;
//     let str4 = str2;
//     map2.set(str3,20);
//     map2.set(str4,10);

//     console.log(map1.get(str1));
//     console.log(map2.get(str3));
// }

// Create a new Hashmap (map1) and set 2 key/value pairs
// ('Hello World. ', 10) and ('Hello World. ', 20)
// Create a 2nd Hashmap (map2) and set 2 key/value pairs
// ('Hello World. ', 20) and ('Hello World. ', 10)

// In map1, the value of "Hello World" is set as 10 but 
// then gets replaced by 20 so console.log(map1.get(str1)) 
// will return 20.

// In map2, the value of "Hello World" is set as 20 but 
// then gets replaced by 10 so console.log(map2.get(str3))
// will return 10.


// 3. Demonstrate understanding of Hash maps
// 3.1 Show your hash map after the insertion of 
// keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a 
// hash map of length 11 using open addressing and 
// a hash function k mod m, where k is the key and m is the length.

// [22, 88, null, null, 4, 15, 28, 17, 59, 31, 10]

// 2) Show your hash map after the insertion of the keys 
// 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions 
// resolved by separate chaining. Let the hash table have a 
// length m = 9, and let the hash function be k mod m.

// [null, 28 --> 19 --> 10, 20, 12, null, 5, 15 --> 33, null, 17]

