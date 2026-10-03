// =============================================================
// DAY 9: ADVANCED ARRAY METHODS (THE MODERN JS TOOLKIT)
// =============================================================
// In Day 7, we saw basic arrays and a quick look at map/filter.
// Today, we dig into the real heavy lifters you will write 
// constantly in React, Node.js, and data manipulation.
// =============================================================

// Let's use a realistic dataset: a list of tech products
const products = [
  { id: 1, name: "Mechanical Keyboard", price: 80, inStock: true, category: "Tech" },
  { id: 2, name: "Wireless Mouse", price: 40, inStock: true, category: "Tech" },
  { id: 3, name: "Coffee Mug", price: 15, inStock: false, category: "Kitchen" },
  { id: 4, name: "Ultra-wide Monitor", price: 350, inStock: true, category: "Tech" },
  { id: 5, name: "Desk Pad", price: 25, inStock: false, category: "Office" }
];


// -------------------------------------------------------------
// 1. .map() — TRANSFORMING DATA
// Walks through every item, runs your function, and hands back 
// a brand new array with the transformed values.
// Note: It never changes the length of the array!
// -------------------------------------------------------------
console.log("--- 1. map() ---");

// Grab just an array of product names:
const productNames = products.map((item) => item.name);
console.log("All product names:", productNames);

// Apply a 10% discount to all prices (returns new objects):
const discountedProducts = products.map((item) => ({
  ...item,
  price: item.price * 0.9
}));
console.log("Discounted first item price:", discountedProducts[0].price); // 72


// -------------------------------------------------------------
// 2. .filter() — PICKING SPECIFIC ITEMS
// Keeps only the items that return TRUE from your condition.
// -------------------------------------------------------------
console.log("\n--- 2. filter() ---");

// Only products currently in stock:
const availableItems = products.filter((item) => item.inStock);
console.log("Items in stock:", availableItems.map((i) => i.name));

// Affordable tech items (price under $50):
const budgetTech = products.filter(
  (item) => item.category === "Tech" && item.price <= 50
);
console.log("Budget tech:", budgetTech);


// -------------------------------------------------------------
// 3. .find() & .findIndex() — HUNTING FOR ONE ITEM
// - filter() returns an array of ALL matches.
// - find() stops at the VERY FIRST match and returns just that single item.
// -------------------------------------------------------------
console.log("\n--- 3. find() & findIndex() ---");

// Find product by unique ID:
const foundProduct = products.find((item) => item.id === 4);
console.log("Found item with ID 4:", foundProduct ? foundProduct.name : "Not found");

// Find index position in the array:
const mouseIndex = products.findIndex((item) => item.name === "Wireless Mouse");
console.log("Index of Wireless Mouse:", mouseIndex); // 1


// -------------------------------------------------------------
// 4. .reduce() — SQUASHING AN ARRAY INTO A SINGLE VALUE
// Great for totals, counts, or grouping data.
// Syntax: array.reduce((accumulator, currentItem) => ..., startingValue)
// -------------------------------------------------------------
console.log("\n--- 4. reduce() ---");

// Calculate the total inventory value of all products:
const totalInventoryValue = products.reduce((accumulator, item) => {
  return accumulator + item.price;
}, 0); // 0 is our starting total

console.log(`Total catalog value: $${totalInventoryValue}`);


// -------------------------------------------------------------
// 5. .some() & .every() — QUICK BOOLEAN CHECKS
// - some(): returns true if at least ONE item meets the condition.
// - every(): returns true ONLY if ALL items meet the condition.
// -------------------------------------------------------------
console.log("\n--- 5. some() vs every() ---");

// Are there any out-of-stock items?
const hasOutOfStock = products.some((item) => !item.inStock);
console.log("Any item out of stock?", hasOutOfStock); // true

// Is every product priced above $10?
const allAboveTen = products.every((item) => item.price > 10);
console.log("Are all items above $10?", allAboveTen); // true


// -------------------------------------------------------------
// 6. .slice() vs .splice() — CUTTING ARRAYS
// - slice(start, end): non-destructive! Copies a slice, leaves original alone.
// - splice(start, count): DESTRUCTIVE! Cuts items straight out of original.
// -------------------------------------------------------------
console.log("\n--- 6. slice() vs splice() ---");

const letters = ["A", "B", "C", "D", "E"];

// Safe slice: index 1 up to (not including) index 4
const slicedPortion = letters.slice(1, 4);
console.log("Sliced portion:", slicedPortion); // ["B", "C", "D"]
console.log("Original letters intact:", letters);

// Destructive splice: start at index 2, cut out 2 elements:
const removed = letters.splice(2, 2);
console.log("Splice removed:", removed);       // ["C", "D"]
console.log("Original modified:", letters);    // ["A", "B", "E"]


// -------------------------------------------------------------
// 7. .sort() — SORTING ITEMS
// Be careful: .sort() alters the original array and defaults to alphabetical!
// For numbers, always pass a comparator function: (a, b) => a - b
// -------------------------------------------------------------
console.log("\n--- 7. sort() ---");

const prices = [80, 40, 15, 350, 25];

// Sort ascending (cheapest to most expensive):
prices.sort((a, b) => a - b);
console.log("Prices ascending:", prices); // [15, 25, 40, 80, 350]

// Sort descending:
prices.sort((a, b) => b - a);
console.log("Prices descending:", prices); // [350, 80, 40, 25, 15]