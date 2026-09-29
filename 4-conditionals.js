// =============================================================
// DAY 4: CONDITIONALS (MAKING DECISIONS IN CODE)
// =============================================================
// Real apps make decisions constantly:
// "If password matches, let them in. Otherwise, show an error."
// Today we control the flow of our program using conditions.
// =============================================================


// -------------------------------------------------------------
// 1. BASIC IF / ELSE
// The most straightforward fork in the road.
// -------------------------------------------------------------
const userAge = 19;

console.log("--- 1. Basic if / else ---");

if (userAge >= 18) {
  console.log("Access granted: You are eligible to vote!");
} else {
  console.log("Access denied: You must be at least 18.");
}


// -------------------------------------------------------------
// 2. ELSE IF (Handling Multiple Scenarios)
// When you have more than two outcomes, chain them together.
// JS evaluates top-to-bottom and stops at the FIRST true match.
// -------------------------------------------------------------
const examScore = 82;

console.log("\n--- 2. Grading with else if ---");

if (examScore >= 90) {
  console.log("Grade: A+ (Outstanding!)");
} else if (examScore >= 75) {
  console.log("Grade: B (Solid work!)");
} else if (examScore >= 50) {
  console.log("Grade: C (Passed)");
} else {
  console.log("Grade: F (Needs retake)");
}


// -------------------------------------------------------------
// 3. COMBINING LOGIC INSIDE CONDITIONS
// You can use && (AND) and || (OR) right inside your if statement.
// -------------------------------------------------------------
const hasTicket = true;
const isVipMember = false;
const hasSecurityClearance = true;

console.log("\n--- 3. Complex Entry Check ---");

// Person gets backstage if they have clearance AND (either a ticket OR VIP status)
if (hasSecurityClearance && (hasTicket || isVipMember)) {
  console.log("Welcome backstage!");
} else {
  console.log("Security stopped: Entry denied.");
}


// -------------------------------------------------------------
// 4. THE TERNARY OPERATOR (Clean 1-line shortcut)
// Syntax: condition ? valueIfTrue : valueIfFalse
// Great for setting a variable based on a simple yes/no condition.
// -------------------------------------------------------------
const cartTotal = 60; // in dollars

// Free shipping if order is $50 or more, else $10 delivery fee:
const shippingFee = cartTotal >= 50 ? 0 : 10;

console.log("\n--- 4. Ternary Operator ---");
console.log(`Cart total: $${cartTotal} | Shipping fee: $${shippingFee}`);


// -------------------------------------------------------------
// 5. SWITCH STATEMENT (Best for checking one value against many options)
// Cleaner than writing 10 different 'else if' blocks for the exact same variable.
// Don't forget 'break;'—without it, code falls through to the next case!
// -------------------------------------------------------------
const dayOfWeek = "Wednesday";

console.log("\n--- 5. Switch Statement ---");

switch (dayOfWeek) {
  case "Monday":
    console.log("Back to the grind. New week starts!");
    break;

  case "Wednesday":
    console.log("Midweek already—halfway to the weekend.");
    break;

  case "Friday":
    console.log("Weekend vibe starts tonight!");
    break;

  case "Saturday":
  case "Sunday":
    // You can group cases together like this:
    console.log("Enjoy the weekend!");
    break;

  default:
    // Runs if none of the cases matched:
    console.log("Just a normal workday.");
    break;
}


// -------------------------------------------------------------
// 6. TRUTHY & FALSY VALUES (JS Superpower / Trap)
// In JS, you don't always need true/false. Values can be "truthy" or "falsy".
// The only FALSY values in JS are:
// false, 0, -0, "" (empty string), null, undefined, NaN
// Everything else counts as TRUTHY!
// -------------------------------------------------------------
const enteredUsername = "krunal"; // Non-empty string = truthy

console.log("\n--- 6. Truthy / Falsy ---");

if (enteredUsername) {
  console.log(`Welcome back, ${enteredUsername}!`);
} else {
  console.log("Please provide a valid username.");
}