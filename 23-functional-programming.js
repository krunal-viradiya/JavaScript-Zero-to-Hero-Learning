// =============================================================
// DAY 22: FUNCTIONAL PROGRAMMING IN JAVASCRIPT
// =============================================================
// Functional Programming (FP) treats computation as the evaluation
// of mathematical functions and avoids changing-state and mutable data.
// 
// Why FP matters in 2026:
// - React state management (Redux, Zustand) demands pure reducers.
// - Pure functions eliminate hidden bugs and make testing effortless.
// =============================================================


// -------------------------------------------------------------
// 1. PURE FUNCTIONS VS SIDE EFFECTS
// A function is "Pure" if:
// 1. Same input ALWAYS produces the exact same output (Deterministic).
// 2. Produces NO side effects (doesn't modify global variables,
//    doesn't mutate args, doesn't do I/O or DOM manipulation directly).
// -------------------------------------------------------------
console.log("--- 1. Pure Functions vs Side Effects ---");

// IMPURE EXAMPLE:
let globalTaxRate = 0.18;
function calculateImpureTotal(subtotal) {
  // Impure because it relies on external mutable state:
  return subtotal + (subtotal * globalTaxRate);
}

// PURE EQUIVALENT:
function calculatePureTotal(subtotal, taxRate) {
  // Pure: Depends strictly on provided arguments and alters nothing outside:
  return subtotal + (subtotal * taxRate);
}

console.log("Pure Total ($100 @ 18%):", calculatePureTotal(100, 0.18)); // 118


// -------------------------------------------------------------
// 2. IMMUTABILITY (NEVER MUTATE RAW DATA)
// Instead of modifying existing objects/arrays in place, return
// a fresh copy containing the requested changes.
// -------------------------------------------------------------
console.log("\n--- 2. Immutability in Action ---");

const originalUser = {
  id: 101,
  username: "krunal_v",
  skills: ["JavaScript", "React"]
};

// BAD (Mutation / Side Effect):
// originalUser.role = "Lead"; // Alters original reference!

// GOOD (Immutable update using Spread):
const updatedUser = {
  ...originalUser,
  role: "Full Stack Engineer",
  skills: [...originalUser.skills, "Node.js"] // New array reference
};

console.log("Original User (Untouched):", originalUser);
console.log("Updated User (New Copy):", updatedUser);


// -------------------------------------------------------------
// 3. HIGHER-ORDER FUNCTIONS (HOFs)
// A function that does at least one of the following:
// - Takes one or more functions as arguments (e.g., map, filter).
// - Returns another function as its result.
// -------------------------------------------------------------
console.log("\n--- 3. Higher-Order Functions ---");

function withExecutionTimer(actionFn) {
  return function (...args) {
    const start = performance.now();
    const result = actionFn(...args);
    const end = performance.now();
    console.log(`[Timer] '${actionFn.name}' executed in ${(end - start).toFixed(4)}ms`);
    return result;
  };
}

function processLargeDataset(size) {
  let sum = 0;
  for (let i = 0; i < size; i++) sum += i;
  return sum;
}

const timedProcessor = withExecutionTimer(processLargeDataset);
console.log("Processed Sum:", timedProcessor(1000000));


// -------------------------------------------------------------
// 4. FUNCTION CURRYING
// Converting a function with multiple arguments: f(a, b, c)
// into a sequence of functions each taking ONE argument: f(a)(b)(c)
// Great for configuring reusable base utilities.
// -------------------------------------------------------------
console.log("\n--- 4. Function Currying ---");

// Normal multi-argument function:
// const discount = (rate, price) => price - price * rate;

// Curried function:
const applyDiscount = (rate) => (price) => price - price * rate;

// Create reusable specialized functions:
const tenPercentOff = applyDiscount(0.10);
const twentyPercentOff = applyDiscount(0.20);

console.log("Laptop ($1000) with 10% off:", `$${tenPercentOff(1000)}`); // 900
console.log("Monitor ($400) with 20% off:", `$${twentyPercentOff(400)}`);  // 320


// -------------------------------------------------------------
// 5. FUNCTION COMPOSITION (PIPELINING)
// Composition combines multiple small single-purpose functions
// into a larger processing pipeline:
// pipe(f, g, h)(x) -> executes f, then g, then h.
// -------------------------------------------------------------
console.log("\n--- 5. Function Composition / Pipeline ---");

const trimString = (str) => str.trim();
const normalizeToLower = (str) => str.toLowerCase();
const slugify = (str) => str.replace(/\s+/g, "-");

// Simple Pipe utility: passes data left-to-right through functions
const pipe = (...functions) => (initialValue) =>
  functions.reduce((currentValue, currentFn) => currentFn(currentValue), initialValue);

const createUrlSlug = pipe(
  trimString,
  normalizeToLower,
  slugify
);

const blogTitle = "  Mastering JavaScript in 2026 For Full Stack Devs  ";
console.log("Input Title:", blogTitle);
console.log("Generated Slug:", createUrlSlug(blogTitle));
// Output: "mastering-javascript-in-2026-for-full-stack-devs"