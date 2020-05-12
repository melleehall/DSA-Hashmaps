import HashMap from './Hashmap'

// 1. Create a HashMap class

function main () {
    const lotr = new HashMap()

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

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

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

// 3.2 Show your hash map after the insertion of the keys 
// 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions 
// resolved by separate chaining. Let the hash table have a 
// length m = 9, and let the hash function be k mod m.

// [null, 28 --> 19 --> 10, 20, 12, null, 5, 15 --> 33, null, 17]

// 4. Remove duplicates
// Implement a function to delete all duplicated characters in 
// a string and keep only the first occurrence of each character. 
// For example, if the input is string “google”, the result 
// after deletion is “gole”. Test your program with a sentence 
// as well such as "google all that you think can think of".


function removeDupes(str) {
    const arr = str.split('')
    const dupelessObj = {}
  
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i]
      if (!dupelessObj[value]) {
        dupelessObj[value] = value;
      }
    }
  
    return Object.keys(dupelessObj).join('')
  }
  
  // Expected output gole
  console.log(removeDupes('google'))
  // Expected output gole a th yuink c f
  console.log(removeDupes('google all that you think can think of'))



// 5. Any permutation a palindrome

// Write an algorithm to check whether any permutation of 
// a string is a palindrome. Given the string "acecarr", 
// the algorithm should return true, because the letters 
// in "acecarr" can be rearranged to "racecar", which is a 
// palindrome. In contrast, given the word "north", 
// the algorithm should return false, because there's no way 
// to rearrange those letters to be a palindrome.

function isPalindrome(str) {
    console.log(str)
    const palHash = new HashMap()
  
    for (let i = 0; i < str.length; i++) {
      try {
        let value = palHash.get(str[i])
        value++;
        palHash.set(str[i].toString(), value)
      }
      catch(error){
        palHash.set(str[i].toString(), 1)
      }
    }
  
    let one = 0;
    let odd = 0;
  
    for (let i = 0; i < str.length; i++) {
      let charCount = palHash.get(str[i])
      if (charCount === 1) {
        one++;
      } else if (charCount !== 1 && charCount % 2 !== 0) {
        odd++;
      }
    }
    console.log(one)
    console.log(odd)
    if (one <= 1 && odd === 0) {
      return true
    } else {
      return false
    }
}
  

// Expect True
console.log(isPalindrome('acecarr'))
// Expect True
console.log(isPalindrome('saippuakivikauppias'))
// Expect True [lffanalff]
console.log(isPalindrome('lfanafflf'))
// Expect False
console.log(isPalindrome('north'))

// One edge case issue with the function is that it does not handle situations where one === 0 but there is an odd # of one char
// Expect False but should be true
//   console.log(isPalindrome('melllem'))


// 6. Anagram grouping

// Write an algorithm to group a list of words into anagrams. 
// For example, if the input was 
// ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], 
// the output should be: 
// [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].

function anagramGrouping(arr) {
    const groupedArr = [];
    const anaHash = new HashMap();
  
    // 1st build the hash map w/ each array item as a key and its sorted version as a value
    for (let i = 0; i < arr.length; i++) {
      let sortedStr = arr[i].split('').sort().join('')
      anaHash.set(arr[i], sortedStr)
    }
  
    // we will iterate over the loop until all items have been sorted and removed
    while (arr.length > 0) {
      // The 1st item in the array begins the sub group
      let anaGroup = [arr[0]]
  
      // iterate over each item in the input array beginning at index 1
      for (let i = 1; i < arr.length; i++) {
        // get() the sorted value of the item we are looking for matches for from the hashmap 
        let sortedValue = anaHash.get(arr[0])
  
        // compare the sorted value to the sorted value of all other items in the input array and it matches, push it onto the groupedArray
        if (anaHash.get(arr[i]) === sortedValue) {
          // if a match, push onto array of anagrams
          anaGroup.push(arr[i])
          }
        }
        // remove all strings that were a match from the array 
        arr = arr.filter(function(item) {
          return !anaGroup.includes(item); 
        })
        // push the anagram group onto the groupedArray that will ultimately be returned
        groupedArr.push(anaGroup)
  
        // reset anaGroup to an empty array to begin the next iteration
        anaGroup = []
        
      }
      return groupedArr
  }
  
  // Expected output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
  console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))
  // Expected output: [ [ 'noon', 'nnoo', 'oonn' ], [ 'crash', 'shrac' ], [ 'god', 'dog' ] ]
  console.log(anagramGrouping(['noon', 'crash', 'nnoo', 'oonn', 'god', 'dog', 'shrac']))