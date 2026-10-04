// =============================================================
// DAY 6: JAVASCRIPT ARRAYS & ESSENTIAL METHODS
// =============================================================
// An Array is an ordered shopping list. Instead of making 10
// different variables for 10 items, you pack them neatly into
// square brackets [] separated by commas.
// =============================================================


// -------------------------------------------------------------
// 1. CREATING AN ARRAY & ZERO-INDEXING
// In programming, counting always starts at 0, not 1!
// Index:     0         1          2          3
// Item:   "Apple",  "Banana",  "Mango",  "Orange"
// -------------------------------------------------------------
console.log("--- 1. Creating and Reading Arrays ---");

const fruits = ["Apple", "Banana", "Mango", "Orange"];

console.log("Entire array:", fruits);
console.log("First item (index 0):", fruits[0]); // Apple
console.log("Third item (index 2):", fruits[2]); // Mango

// Total number of items:
console.log("How many fruits?", fruits.length); // 4

// Grabbing the very last item without hardcoding the index:
console.log("Last item:", fruits[fruits.length - 1]); // Orange


// -------------------------------------------------------------
// 2. UPDATING ELEMENTS
// Even if an array is defined with 'const', you CAN still change
// the items inside it! (You just can't reassign the whole variable).
// -------------------------------------------------------------
fruits[1] = "Blueberry"; // Replaces "Banana" with "Blueberry"
console.log("\nAfter update:", fruits);


// -------------------------------------------------------------
// 3. ADDING & REMOVING ITEMS (The Core 4 Methods)
// - push()  -> Add item to the END
// - pop()   -> Remove item from the END
// - unshift() -> Add item to the FRONT
// - shift()   -> Remove item from the FRONT
// -------------------------------------------------------------
console.log("\n--- 2. Push, Pop, Shift, Unshift ---");

const todoList = ["Check emails", "Write JS code"];

// Add to the back:
todoList.push("Commit to GitHub");
console.log("After push():", todoList);

// Remove the last item:
const removedTask = todoList.pop();
console.log("Removed from end:", removedTask);
console.log("After pop():", todoList);

// Add to the front:
todoList.unshift("Wake up early");
console.log("After unshift():", todoList);

// Remove from the front:
todoList.shift();
console.log("After shift():", todoList);


// -------------------------------------------------------------
// 4. FINDING THINGS (includes & indexOf)
// -------------------------------------------------------------
console.log("\n--- 3. Searching in Arrays ---");

const techStack = ["HTML", "CSS", "JavaScript", "React"];

// Check if something exists (returns true/false):
console.log("Has JavaScript?", techStack.includes("JavaScript")); // true
console.log("Has Python?", techStack.includes("Python"));         // false

// Find the index of an item:
console.log("Where is React located?", techStack.indexOf("React")); // 3
// If an item doesn't exist, indexOf returns -1:
console.log("Where is Vue located?", techStack.indexOf("Vue"));     // -1


// -------------------------------------------------------------
// 5. LOOPING OVER ARRAYS
// The modern, cleanest way to visit each item is 'for...of'.
// -------------------------------------------------------------
console.log("\n--- 4. Looping with for...of ---");

const frameworks = ["React", "Express", "Node.js"];

for (const tech of frameworks) {
  console.log(`Currently learning: ${tech}`);
}


// -------------------------------------------------------------
// 6. MODERN ARRAY POWERHOUSE: map() & filter()
// These are ES6 methods you will write hundreds of times in React.
// They don't change the original array; they return a brand-new one!
// -------------------------------------------------------------
console.log("\n--- 5. Modern map() and filter() ---");

const numbers = [10, 20, 30, 40, 50];

// map(): Transform every item (e.g., double each number)
const doubled = numbers.map((num) => num * 2);
console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubled); // [20, 40, 60, 80, 100]

// filter(): Keep only items that pass a true/false condition
const highScores = [45, 88, 92, 33, 76, 100];
const passingGrades = highScores.filter((score) => score >= 75);
console.log("Passing grades (>= 75):", passingGrades); // [88, 92, 76, 100]