// =============================================================
// DAY 2: JAVASCRIPT DATA TYPES
// =============================================================
// Bottom line: What kind of data can we actually store in JS?
// JavaScript breaks these down into two main flavors:
// 1. Primitive types (simple, single values)
// 2. Non-primitive types (grouped/complex values like Objects & Arrays)
//
// Today, let's nail down the core Primitive types you'll use daily.
// =============================================================


// -------------------------------------------------------------
// 1. STRING (Plain text)
// Anything wrapped inside single quotes '', double quotes "", 
// or backticks `` counts as a string.
// -------------------------------------------------------------
const myName = "Krunal";
const greeting = `Hey there, welcome to Day 2!`;

console.log("String example:", myName);


// -------------------------------------------------------------
// 2. NUMBER (Decimals, whole numbers, positives, negatives)
// Unlike other languages (like C or Java), JS doesn't care if it's 
// an integer or a decimal float. Everything is just a 'number'.
// -------------------------------------------------------------
let myAge = 21;
let itemPrice = 49.99;
let coldTemp = -8; // Negative numbers are totally fine too

console.log("Number example:", itemPrice);


// -------------------------------------------------------------
// 3. BOOLEAN (True or False)
// Pure on/off switches. You will use these constantly for checks:
// "Is the user logged in?", "Did they accept terms?", etc.
// -------------------------------------------------------------
let isLearningCode = true;
let hasPaidBill = false;

console.log("Boolean example:", isLearningCode);


// -------------------------------------------------------------
// 4. UNDEFINED (The box exists, but you forgot to fill it)
// If you declare a variable but never give it a value, 
// JavaScript automatically shrugs and marks it as 'undefined'.
// -------------------------------------------------------------
let myNextProject; // No value assigned yet
console.log("Undefined example:", myNextProject); // Prints: undefined


// -------------------------------------------------------------
// 5. NULL (Intentionally left blank)
// Difference between null and undefined:
// - undefined = JS saying "Nobody put anything in this box yet."
// - null = You explicitly saying "I am keeping this box empty on purpose."
// -------------------------------------------------------------
let couponCode = null; // No coupon right now, empty by design
console.log("Null example:", couponCode);


// -------------------------------------------------------------
// 6. BIGINT (For ridiculously huge numbers)
// Standard numbers can safely go up to ~9 quadrillion.
// If you ever deal with crypto, timestamps, or huge math, tack an 'n' 
// onto the end to make it a BigInt.
// -------------------------------------------------------------
const hugeCryptoNumber = 9007199254740991000n;
console.log("BigInt example:", hugeCryptoNumber);


// -------------------------------------------------------------
// 7. SYMBOL (A completely unique token)
// Even if you create two symbols with the exact same label, 
// JS treats them as 100% unique. Mostly used for advanced object keys.
// -------------------------------------------------------------
const secretId = Symbol("userId");
console.log("Symbol example:", secretId);


// =============================================================
// PRO TIP: The 'typeof' operator
// Whenever you get confused about what kind of data you're 
// holding, ask JS directly using 'typeof'.
// =============================================================
console.log("\n--- Checking Types using typeof ---");
console.log("Type of myName:", typeof myName);             // "string"
console.log("Type of myAge:", typeof myAge);               // "number"
console.log("Type of isLearningCode:", typeof isLearningCode); // "boolean"
console.log("Type of myNextProject:", typeof myNextProject);   // "undefined"

// A FAMOUS JAVASCRIPT QUIRK / BUG:
// If you run 'typeof null', it says "object"!
// This is a legacy bug from the very first version of JS in 1995.
// They never fixed it to avoid breaking older websites.
console.log("Type of null (famous JS quirk):", typeof null);   // "object"