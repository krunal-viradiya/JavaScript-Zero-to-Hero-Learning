// =============================================================
// DAY 12: JAVASCRIPT PROMISES (DEEP DIVE MASTERCLASS)
// =============================================================
// Real-world analogy:
// You order a pizza at a counter. They don't give you the pizza
// immediately; they give you a token/receipt.
// That receipt is a PROMISE:
// 1. Pending:   Pizza ban raha hai (baking in oven).
// 2. Fulfilled: Pizza ready ho gaya, counter se pick kar lo (resolve).
// 3. Rejected:  Dough khatam ho gaya ya jal gaya, order cancel (reject).
// =============================================================


// -------------------------------------------------------------
// 1. ANATOMY OF A PROMISE
// 'new Promise' takes an executor function with two handlers:
// - resolve(value): signals success and passes the result
// - reject(error):  signals failure and passes the error reason
// -------------------------------------------------------------
console.log("--- 1. Creating a Basic Promise ---");

const checkServerStatus = new Promise((resolve, reject) => {
  const isServerUp = true;

  setTimeout(() => {
    if (isServerUp) {
      resolve("Server status: 200 OK (Healthy)");
    } else {
      reject(new Error("Server status: 500 Internal Server Error"));
    }
  }, 500);
});

// Consuming the promise:
checkServerStatus
  .then((data) => {
    console.log("SUCCESS HANDLER:", data);
  })
  .catch((err) => {
    console.error("ERROR HANDLER:", err.message);
  })
  .finally(() => {
    // Runs no matter what (cleanup, stopping loaders/spinners)
    console.log("FINALLY: Health check completed.");
  });


// -------------------------------------------------------------
// 2. PROMISE CHAINING (SOLVING CALLBACK HELL)
// You can return a new promise or value from a .then() block,
// creating a clean top-to-bottom pipeline.
// -------------------------------------------------------------
console.log("\n--- 2. Promise Chaining Pipeline ---");

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Step 1: Fetched user record for ID ${id}`);
      resolve({ id, username: "krunal_viradiya", plan: "pro" });
    }, 1000);
  });
}

function getPermissions(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Step 2: Fetched permissions for ${user.username}`);
      resolve(["read", "write", "deploy"]);
    }, 600);
  });
}

function checkAccess(permissions) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (permissions.includes("deploy")) {
        resolve("Step 3: User authorized for server deployment! 🚀");
      } else {
        reject("Step 3: Unauthorized!");
      }
    }, 400);
  });
}

// Clean chain — no nested pyramid:
getUser(101)
  .then((user) => getPermissions(user))
  .then((permissions) => checkAccess(permissions))
  .then((result) => console.log(result))
  .catch((err) => console.error("Chain failed at some step:", err));


// -------------------------------------------------------------
// 3. PROMISE COMBINATORS (PARALLEL EXECUTION)
// Often in MERN, you need to make 3 independent database calls.
// Running them sequentially is slow. Run them in parallel!
// -------------------------------------------------------------
const fetchUsers = new Promise((res) => setTimeout(() => res(["User1", "User2"]), 800));
const fetchProducts = new Promise((res) => setTimeout(() => res(["Laptop", "Phone"]), 1200));
const fetchCategories = new Promise((res) => setTimeout(() => res(["Tech", "Office"]), 400));

// A. Promise.all()
// Runs all promises at the same time.
// Fails FAST: If even ONE promise rejects, the entire Promise.all fails.
Promise.all([fetchUsers, fetchProducts, fetchCategories])
  .then(([users, products, categories]) => {
    console.log("\n--- 3A. Promise.all (All Succeeded) ---");
    console.log("Fetched simultaneously:", { users, products, categories });
  })
  .catch((err) => console.error("Promise.all failed:", err));


// B. Promise.allSettled()
// NEVER fails! Waits for all promises to either resolve OR reject,
// and gives you an array showing the status of each.
const failingTask = new Promise((_, rej) => setTimeout(() => rej("Failed to load ads"), 300));

Promise.allSettled([fetchUsers, failingTask])
  .then((results) => {
    console.log("\n--- 3B. Promise.allSettled ---");
    results.forEach((res, i) => {
      console.log(`Task #${i + 1}: Status = ${res.status}`);
    });
  });


// C. Promise.race()
// Returns whichever promise finishes FIRST (whether it resolves or rejects).
// Great for setting API request timeouts!
const fastService = new Promise((res) => setTimeout(() => res("Fast CDN Server"), 200));
const slowService = new Promise((res) => setTimeout(() => res("Backup Server"), 900));

Promise.race([fastService, slowService]).then((winner) => {
  console.log(`\n--- 3C. Promise.race Winner: ${winner} ---`);
});


// -------------------------------------------------------------
// 4. MICROTASKS VS MACROTASKS (EVENT LOOP INTERVIEW QUESTION)
// Guess the output order:
// Synchronous > Microtasks (Promises) > Macrotasks (setTimeout)
// -------------------------------------------------------------
console.log("\n--- 4. Microtask Queue Test ---");

console.log("1: Synchronous log start");

setTimeout(() => {
  console.log("4: setTimeout (Macrotask Queue)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise .then (Microtask Queue - Priority!)");
});

console.log("2: Synchronous log end");