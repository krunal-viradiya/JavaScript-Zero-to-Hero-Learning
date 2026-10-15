// =============================================================
// DAY 19: THE JAVASCRIPT EVENT LOOP & CONCURRENCY MODEL
// =============================================================
// JavaScript is single-threaded: it has exactly ONE Call Stack
// and executes one line of code at any given millisecond.
//
// The Event Loop is the engine mechanism that coordinates
// synchronous code, asynchronous timers, network responses,
// and Promises so the browser or server never freezes.
// =============================================================


// -------------------------------------------------------------
// ARCHITECTURAL OVERVIEW:
//
//  1. CALL STACK:
//     Where active function execution occurs (LIFO: Last In, First Out).
//
//  2. WEB APIs / NODE APIs:
//     Background threads managing asynchronous timers, fetch calls,
//     and filesystem/DOM listeners outside the JS engine.
//
//  3. MICROTASK QUEUE (Highest Priority):
//     Promises (.then, .catch, .finally), queueMicrotask(), async/await.
//
//  4. MACROTASK / TASK QUEUE (Standard Priority):
//     setTimeout, setInterval, setImmediate (Node.js), I/O events.
//
//  5. THE EVENT LOOP RULE:
//     When Call Stack is empty:
//     a. Drain the ENTIRE Microtask Queue first.
//     b. Pick the OLDEST task from the Macrotask Queue and push it to stack.
//     c. Repeat indefinitely.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 1. CLASSIC EXECUTION ORDER (INTERVIEW CORE)
// Predict the console output order:
// -------------------------------------------------------------
console.log("--- 1. Execution Order Demonstration ---");

console.log("1: Synchronous script start");

// Macrotask (scheduled via Web API timer)
setTimeout(() => {
  console.log("5: setTimeout callback (Macrotask Queue)");
}, 0);

// Microtask (high-priority Promise job)
Promise.resolve()
  .then(() => {
    console.log("3: Promise resolution 1 (Microtask Queue)");
  })
  .then(() => {
    console.log("4: Promise resolution 2 (Microtask Queue)");
  });

console.log("2: Synchronous script end");

// Console Output Order: 1 -> 2 -> 3 -> 4 -> 5
// Why: Even with a 0ms delay, setTimeout enters the Macrotask Queue.
// The Event Loop must drain all Microtasks before touching any Macrotask.


// -------------------------------------------------------------
// 2. EXPLICIT MICROTASKS VIA queueMicrotask()
// Used when you need an async execution guarantee before any
// rendering or timer interrupts, without allocating a Promise object.
// -------------------------------------------------------------
setTimeout(() => {
  console.log("\n--- 2. queueMicrotask vs setTimeout ---");

  setTimeout(() => {
    console.log("Macrotask: Secondary setTimeout completed");
  }, 0);

  queueMicrotask(() => {
    console.log("Microtask: Executed directly via queueMicrotask()");
  });

  console.log("Synchronous: Direct call inside timer callback");
}, 100);


// -------------------------------------------------------------
// 3. ASYNC / AWAIT UNDER THE HOOD
// 'await' splits a function:
// - Code before 'await' executes synchronously.
// - Code after 'await' is packaged into the Microtask Queue.
// -------------------------------------------------------------
setTimeout(() => {
  console.log("\n--- 3. Async/Await Inside the Event Loop ---");

  async function flowTest() {
    console.log("A: Inside async function (Synchronous phase)");
    
    // Pauses flowTest and registers the rest of the function as a microtask:
    await Promise.resolve();

    console.log("C: Resumed after await (Microtask Queue)");
  }

  flowTest();

  console.log("B: Main script execution (Synchronous phase)");
}, 250);

// Console Output Order: A -> B -> C


// -------------------------------------------------------------
// 4. PREVENTING CALL STACK STARVATION
// Because JS is single-threaded, a blocking synchronous loop prevents
// the Event Loop from ever reaching the queues or rendering UI.
// -------------------------------------------------------------
function starvationWarning() {
  console.log("\n--- 4. Concurrency Guardrails ---");
  console.log("Long loops or intensive CPU computations freeze the Call Stack.");
  console.log("Offload CPU work to Web Workers (browser) or Worker Threads (Node.js).");
}

starvationWarning();