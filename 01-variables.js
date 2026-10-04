// -------------------------------------------------------------
// 1. WHAT IS A VARIABLE?
// Think of a variable like a labeled box in your computer's memory.
// You give it a name (label) and put data (value) inside it.
// -------------------------------------------------------------

// Think of a variable like a plastic storage box. 
// You slap a name tag on it so you know what's inside, 
// and toss your data into it.

// Rule of thumb: If this value will never change, lock it with 'const'.
// Your name probably doesn't change, so we keep it constant.
// The quotes "" just mean this is plain text (a string).

// 'const' stands for CONSTANT.
// Use 'const' when the value should NEVER change after you assign it.
// Here, we store a piece of text (called a "String") inside 'username'.

const myName = "Krunal";

// If something CAN change down the road, use 'let' instead.
// Age goes up every year, so we definitely want this flexible.

// 'let' allows the stored value to CHANGE (reassign) later in the code.
// Here, we store a whole number (called a "Number") inside 'userAge'.

let myAge = 21;

// This is just a true/false switch (a boolean). 
// Super handy later for things like "did the user click the button?"

// 'isLoggedIn' stores a Boolean value (either true or false).
// Booleans are used for yes/no checks and conditions.

let hasPaidBills = false;


// Let's print this stuff out to the screen or console to check our work.

// -------------------------------------------------------------
// 2. DISPLAYING VALUES
// 'console.log()' is a tool that prints text/values to your browser console or terminal.
// -------------------------------------------------------------

console.log("Hey, my name is", myName);
console.log("Current age:", myAge);
console.log("Bills paid yet?", hasPaidBills);


// -------------------------------------------------------------
// 3. UPDATING A VARIABLE
// Because 'userAge' was created with 'let', we can update its value.
// Notice we DO NOT type 'let' again when changing an existing variable.
// -------------------------------------------------------------

// Imagine a birthday happens, so the age increases by 1:

// Fast-forward a year: it's your birthday! 
// Notice we don't write 'let' again here. 
// 'let' is only for the first time you create the box. 
// Now we're just throwing a new number inside it:
myAge = 22; 

// You finally paid the electric bill, so flip the switch to true:
hasPaidBills = true;

console.log("One year later... Age is now:", myAge);
console.log("Are bills paid now?", hasPaidBills);


// ONE BIG TRAP TO AVOID:
// Don't try to change 'const'. 
// If you write: myName = "Rahul";
// JS will freak out and crash your app with an angry red error!

// -------------------------------------------------------------
// 4. WHAT NOT TO DO (COMMON MISTAKE)
// -------------------------------------------------------------

// If you try to change a 'const', JavaScript will throw an error:
// username = "Alex";  <-- ERROR: "Assignment to constant variable."