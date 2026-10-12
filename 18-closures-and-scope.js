// =============================================================
// DAY 17: JAVASCRIPT CLOSURES & LEXICAL SCOPE
// =============================================================
// Definition: A Closure is created when an inner function "remembers"
// and continues to access variables from its outer (parent) function,
// even AFTER the outer function has finished executing and closed.
//
// In short: Functions carry a backpack of variables from where
// they were born.
// =============================================================


// -------------------------------------------------------------
// 1. SCOPES REVIEW: GLOBAL vs FUNCTION vs BLOCK
// - Global: Accessible everywhere.
// - Function: Accessible only inside the function.
// - Block ({}): 'let' & 'const' stay locked inside if/for blocks.
// -------------------------------------------------------------
console.log("--- 1. Scope Hierarchy ---");

const globalApp = "E-Commerce App"; // Global

function testScope() {
  const functionScoped = "Inside Function";

  if (true) {
    const blockScoped = "Inside Block";
    var oldVarScoped = "Function Scoped Var"; // 'var' leaks out of blocks!
    console.log(blockScoped); // Works
  }

  // console.log(blockScoped); // ReferenceError! Block scoped variables stay inside {}
  console.log(oldVarScoped);   // Works because 'var' ignores block boundaries
}

testScope();


// -------------------------------------------------------------
// 2. THE FIRST CLOSURE (BASIC MENTAL MODEL)
// Notice how 'outerFunction' finishes and returns 'innerFunction'.
// Normally, local variables die when a function returns.
// But with closures, 'outerVariable' stays alive!
// -------------------------------------------------------------
console.log("\n--- 2. Basic Closure Mechanism ---");

function createGreeting(greetingWord) {
  // 'greetingWord' lives in the lexical scope of createGreeting
  return function(userName) {
    // The inner function remembers 'greetingWord' forever
    return `${greetingWord}, ${userName}!`;
  };
}

// createGreeting finishes here, but hands back a specialized function:
const sayHello = createGreeting("Hello");
const sayNamaste = createGreeting("Namaste");

console.log(sayHello("Krunal"));   // Output: Hello, Krunal!
console.log(sayNamaste("Krunal")); // Output: Namaste, Krunal!


// -------------------------------------------------------------
// 3. DATA PRIVACY & ENCAPSULATION (EMULATING PRIVATE VARIABLES)
// Before ES6 private fields (#), closures were the ONLY way
// to create 100% private variables in JavaScript.
// -------------------------------------------------------------
console.log("\n--- 3. Private State with Closures ---");

function createCounter(initialValue = 0) {
  // 'count' is completely private! Outside code cannot touch it directly.
  let count = initialValue;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counterA = createCounter(10);
const counterB = createCounter(100);

console.log("Counter A increment:", counterA.increment()); // 11
console.log("Counter A increment:", counterA.increment()); // 12
console.log("Counter B increment:", counterB.increment()); // 101

// Notice Counter A and Counter B have totally independent private states!
console.log("Counter A current:", counterA.getCount()); // 12
console.log("Counter B current:", counterB.getCount()); // 101

// Direct tampering is impossible:
// console.log(counterA.count); // undefined (it's hidden inside the closure!)


// -------------------------------------------------------------
// 4. FUNCTION FACTORY (PRACTICAL REAL-WORLD PATTERN)
// Generating custom business logic functions on the fly.
// -------------------------------------------------------------
console.log("\n--- 4. Function Factory ---");

function calculateTax(taxRate) {
  // Returns a calculation function locked to a specific tax bracket
  return function(productPrice) {
    const tax = productPrice * taxRate;
    return productPrice + tax;
  };
}

const applyStandardTax = calculateTax(0.18); // 18% GST / VAT
const applyLuxuryTax = calculateTax(0.28);   // 28% Luxury Tax

console.log("Item with Standard Tax ($100):", `$${applyStandardTax(100)}`); // 118
console.log("Item with Luxury Tax ($100):", `$${applyLuxuryTax(100)}`);     // 128


// -------------------------------------------------------------
// 5. THE CLASSIC CLOSURE INTERVIEW TRAP
// Question: "What does this loop print?"
// -------------------------------------------------------------
console.log("\n--- 5. The setTimeout Loop Interview Trap ---");

// TRAP A: Using 'var'
// 'var' is function-scoped. By the time the 100ms timer runs,
// the single loop variable 'i' has already reached 3!
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    // console.log("With var:", i); // Would print: 4, 4, 4
  }, 100);
}

// SOLUTION B: Using 'let' (ES6 Block Scoping)
// 'let' creates a BRAND NEW binding and closure for each loop iteration!
for (let j = 1; j <= 3; j++) {
  setTimeout(() => {
    console.log(`With let (Iteration Closure): ${j}`); // Prints: 1, then 2, then 3!
  }, 150);
}