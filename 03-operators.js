// =============================================================
// DAY 3: JAVASCRIPT OPERATORS
// =============================================================
// Operators are simply the symbols we use to calculate, compare,
// and make decisions with our data.
// =============================================================


// -------------------------------------------------------------
// 1. ARITHMETIC OPERATORS (Basic Math)
// The everyday math you already know from school.
// -------------------------------------------------------------
let a = 10;
let b = 3;

console.log("--- 1. Basic Math ---");
console.log("Addition (10 + 3):", a + b);        // 13
console.log("Subtraction (10 - 3):", a - b);     // 7
console.log("Multiplication (10 * 3):", a * b);  // 30
console.log("Division (10 / 3):", a / b);        // 3.3333...

// Modulus (%) gives you the REMAINDER after division.
// Super useful for checking if a number is even or odd!
console.log("Remainder / Modulus (10 % 3):", a % b); // 1 (because 3*3=9, remainder 1)

// Exponentiation (**) means "to the power of"
console.log("Power (10 ** 3):", a ** b);         // 1000 (10 * 10 * 10)


// -------------------------------------------------------------
// 2. SHORTCUT ASSIGNMENT OPERATORS
// Save yourself from typing the variable name twice.
// -------------------------------------------------------------
let score = 50;

score += 10; // Same as writing: score = score + 10; (Now 60)
score -= 5;  // Same as writing: score = score - 5;  (Now 55)
score *= 2;  // Same as writing: score = score * 2;  (Now 110)

console.log("\n--- 2. Updated Score ---");
console.log("Final calculated score:", score);


// -------------------------------------------------------------
// 3. COMPARISON OPERATORS (Always return true or false)
// Used whenever you need to check: "Is X bigger than Y?"
// -------------------------------------------------------------
let age = 18;

console.log("\n--- 3. Comparisons ---");
console.log("Is age > 18?", age > 18);   // false (18 is not strictly greater than 18)
console.log("Is age >= 18?", age >= 18); // true (greater than OR equal to)
console.log("Is age < 25?", age < 25);   // true


// -------------------------------------------------------------
// CRITICAL CONCEPT: == vs === (Equality check)
// Golden rule: ALWAYS use === (strict equality). Forget == exists.
// -------------------------------------------------------------
let num = 5;          // type: number
let strNum = "5";     // type: string

// Loose equality (==) tries to force types to match behind your back:
console.log("Loose equality (5 == '5'):", num == strNum);   // true (sloppy!)

// Strict equality (===) checks BOTH value and data type:
console.log("Strict equality (5 === '5'):", num === strNum); // false (safe & accurate!)

// Not equal to:
console.log("Strict NOT equal (5 !== '5'):", num !== strNum); // true


// -------------------------------------------------------------
// 4. LOGICAL OPERATORS (Combining decisions)
// && (AND) -> BOTH sides must be true
// || (OR)  -> At least ONE side must be true
// !  (NOT) -> Flips true to false, or false to true
// -------------------------------------------------------------
let hasDrivingLicense = true;
let isSober = true;
let hasCar = false;

console.log("\n--- 4. Logical Decisions ---");

// AND (&&): Can drive only if licensed AND sober
let canDrive = hasDrivingLicense && isSober;
console.log("Can legally drive?", canDrive); // true

// OR (||): Needs either a car OR access to public transport
let hasMetroPass = true;
let canTravel = hasCar || hasMetroPass;
console.log("Can travel to work?", canTravel); // true (because metro pass is true)

// NOT (!): Flips the switch
let isRaining = false;
console.log("Is it sunny? (!isRaining):", !isRaining); // true