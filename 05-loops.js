// =============================================================
// DAY 5: JAVASCRIPT LOOPS (AUTOMATING REPETITION)
// =============================================================
// Why loops? Imagine printing numbers from 1 to 100.
// Writing 100 console.logs by hand is painful.
// Loops let you write code once and run it as many times as you need.
// =============================================================


// -------------------------------------------------------------
// 1. THE CLASSIC 'FOR' LOOP
// Use this when you know EXACTLY how many times to repeat.
// Structure: for (start; condition; step)
// -------------------------------------------------------------
console.log("--- 1. Classic for loop ---");

// Let's count from 1 to 5:
for (let i = 1; i <= 5; i++) {
  console.log(`Step ${i}: Keep pushing forward!`);
}

// Counting backwards (Countdown timer):
console.log("\nRocket launch countdown:");
for (let count = 3; count > 0; count--) {
  console.log(`${count}...`);
}
console.log("Blast off! 🚀");


// -------------------------------------------------------------
// 2. THE 'WHILE' LOOP
// Runs as long as a condition stays TRUE.
// Best used when you don't know the exact count in advance
// (like waiting for a battery to drain or a user to guess a number).
// -------------------------------------------------------------
console.log("\n--- 2. While loop ---");

let battery = 100;

// Drain battery by 25% each cycle until dead:
while (battery > 0) {
  console.log(`Phone battery at: ${battery}%`);
  battery -= 25; // DON'T FORGET THIS step, or loop will run forever!
}
console.log("Phone turned off. Please charge!");


// -------------------------------------------------------------
// 3. THE 'DO...WHILE' LOOP
// Guarantees the code block runs AT LEAST ONCE,
// even if the condition is false right from the start.
// -------------------------------------------------------------
console.log("\n--- 3. Do...While loop ---");

let attempts = 0;

do {
  console.log(`Attempt #${attempts + 1}: Connecting to server...`);
  attempts++;
} while (attempts < 1); // Runs once even though attempts immediately reaches 1


// -------------------------------------------------------------
// 4. BREAK & CONTINUE (CONTROLLING THE LOOP)
// - 'break': slams the brakes and exits the loop immediately.
// - 'continue': skips ONLY the current round and jumps to the next.
// -------------------------------------------------------------
console.log("\n--- 4. break & continue ---");

console.log("Using 'continue' to skip unlucky number 13:");
for (let roomNumber = 11; roomNumber <= 15; roomNumber++) {
  if (roomNumber === 13) {
    continue; // Skip printing 13, move straight to 14
  }
  console.log(`Room assigned: ${roomNumber}`);
}

console.log("\nUsing 'break' to stop searching:");
for (let seat = 1; seat <= 10; seat++) {
  if (seat === 4) {
    console.log("Found an empty seat at #4! Stopping the search.");
    break; // Exit the loop entirely
  }
  console.log(`Checking seat #${seat}... taken.`);
}


// -------------------------------------------------------------
// 5. CAUTION: THE INFINITE LOOP TRAP
// Always make sure your loop has a way to finish!
// If you write:
// while (true) { console.log("Crash!"); }
// Your browser tab or terminal will freeze and run out of memory.
// -------------------------------------------------------------