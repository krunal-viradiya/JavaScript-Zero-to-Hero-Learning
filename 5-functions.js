// =============================================================
// DAY 5: JAVASCRIPT FUNCTIONS
// =============================================================
// Functions are reusable mini-machines. Instead of copying and
// pasting the same 5 lines of code everywhere, you wrap them in
// a function and trigger it whenever you need it.
// =============================================================


// -------------------------------------------------------------
// 1. BASIC FUNCTION DECLARATION
// The classic way to write a function.
// -------------------------------------------------------------
console.log("--- 1. Basic Function ---");

// Defining the machine:
function sayHello() {
  console.log("Hey there! Welcome to Day 5 of JavaScript.");
}

// Running (calling/invoking) the machine:
sayHello();
sayHello(); // Call it as many times as you want


// -------------------------------------------------------------
// 2. PARAMETERS & ARGUMENTS (Passing data in)
// - Parameters: the placeholder names inside the parentheses ()
// - Arguments: the actual values you pass when you run the function
// -------------------------------------------------------------
console.log("\n--- 2. Parameters & Arguments ---");

function greetUser(userName, timeOfDay) {
  console.log(`Good ${timeOfDay}, ${userName}! Ready to code?`);
}

greetUser("Krunal", "morning");
greetUser("Alex", "evening");


// -------------------------------------------------------------
// 3. RETURNING A VALUE (Getting data back out)
// 'console.log' just shows text on screen.
// 'return' sends the calculated result back to your program
// so you can store it in a variable or use it elsewhere.
// Note: Code written after a 'return' statement is ignored!
// -------------------------------------------------------------
console.log("\n--- 3. Returning Values ---");

function calculateTotal(price, taxRate) {
  const tax = price * taxRate;
  const grandTotal = price + tax;
  return grandTotal; // Hands the answer back to whoever called it
}

// Store the returned number inside a variable:
const myBill = calculateTotal(100, 0.18); // 18% tax on 100
console.log(`Final bill amount: $${myBill}`);


// -------------------------------------------------------------
// 4. DEFAULT PARAMETERS
// What if someone forgets to pass an argument?
// Set a fallback value using '=' so the code doesn't break.
// -------------------------------------------------------------
console.log("\n--- 4. Default Parameters ---");

function applyDiscount(price, discountPercentage = 10) {
  // If discountPercentage is not passed, it defaults to 10%
  const discountAmount = price * (discountPercentage / 100);
  return price - discountAmount;
}

console.log("With default 10% discount:", applyDiscount(200));       // Uses default 10% -> 180
console.log("With custom 25% discount:", applyDiscount(200, 25));   // Overrides to 25% -> 150


// -------------------------------------------------------------
// 5. ARROW FUNCTIONS (Modern ES6 Syntax)
// Modern JS devs use arrow functions (=>) constantly.
// They are shorter and cleaner to read.
// -------------------------------------------------------------
console.log("\n--- 5. Arrow Functions ---");

// Regular syntax:
// const multiply = function(a, b) { return a * b; };

// Arrow syntax:
const multiply = (a, b) => {
  return a * b;
};

console.log("Multiply 4 * 5:", multiply(4, 5));

// SHORTCUT: If the function is just ONE line returning a value,
// you can drop the curly braces {} and the 'return' keyword entirely!
const add = (a, b) => a + b;
const square = (n) => n * n;

console.log("One-liner Add (10 + 20):", add(10, 20));
console.log("One-liner Square (7 * 7):", square(7));


// -------------------------------------------------------------
// 6. FUNCTION SCOPE (Local vs Global variables)
// Variables created INSIDE a function stay locked inside that function.
// The outside world cannot see or touch them.
// -------------------------------------------------------------
console.log("\n--- 6. Variable Scope ---");

const globalCity = "Ahmedabad"; // Anyone can access this

function checkScope() {
  const secretKey = "SuperSecret123"; // Locked inside checkScope
  console.log(`Accessing global variable inside function: ${globalCity}`);
  console.log(`Accessing local variable inside function: ${secretKey}`);
}

checkScope();

// Trying to do this outside will crash your program:
// console.log(secretKey); // ReferenceError: secretKey is not defined