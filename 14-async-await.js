// =============================================================
// DAY 13: ASYNC / AWAIT & THE FETCH API
// =============================================================
// While Promises (.then / .catch) solved callback hell, chaining 
// multiple .then() blocks can still get messy.
// 
// ES2017 introduced 'async' and 'await':
// - It is "syntactic sugar" built directly on top of Promises.
// - It makes asynchronous code look and read like clean, sequential,
//   synchronous code.
// =============================================================


// -------------------------------------------------------------
// 1. THE CORE RULES OF ASYNC / AWAIT
// Rule 1: Placing 'async' in front of a function forces it to return a Promise.
// Rule 2: 'await' pauses function execution until the Promise resolves/rejects.
// Rule 3: 'await' can ONLY be used inside an 'async' function.
// -------------------------------------------------------------
console.log("--- 1. Basic Async / Await ---");

// A simulated database helper returning a Promise:
function fetchDatabaseRecord(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ userId: id, username: "krunal_viradiya", role: "Full Stack Engineer" });
      } else {
        reject(new Error("Invalid ID: User not found in database"));
      }
    }, 800);
  });
}

// Consuming with async / await:
async function displayUser(id) {
  // Always wrap await calls inside try...catch!
  try {
    console.log(`Querying record for ID: ${id}...`);

    // JS pauses HERE until fetchDatabaseRecord finishes:
    const user = await fetchDatabaseRecord(id);

    console.log("User record retrieved:", user);
    return user;
  } catch (error) {
    // If the promise rejects, execution jumps straight here:
    console.error("Database query failed:", error.message);
  } finally {
    console.log("Database connection closed.");
  }
}

displayUser(101);


// -------------------------------------------------------------
// 2. PARALLEL EXECUTION WITH AWAIT
// Common Mistake: Awaiting independent operations sequentially.
// If call A takes 1s and call B takes 1s, sequential awaits take 2s.
// Combining Promise.all with await runs them simultaneously in 1s!
// -------------------------------------------------------------
function getPosts() {
  return new Promise((resolve) => setTimeout(() => resolve(["Post 1", "Post 2"]), 1000));
}

function getFollowers() {
  return new Promise((resolve) => setTimeout(() => resolve(2450), 1000));
}

async function loadDashboard() {
  console.log("\n--- 2. Efficient Parallel Await ---");
  const startTime = Date.now();

  // Fire both requests at the same time:
  const [posts, followers] = await Promise.all([getPosts(), getFollowers()]);

  const duration = Date.now() - startTime;
  console.log(`Loaded ${posts.length} posts and ${followers} followers in ${duration}ms (Parallel)`);
}

loadDashboard();


// -------------------------------------------------------------
// 3. REAL-WORLD FETCH API (GET REQUEST)
// 'fetch()' is built into modern JS and Node.js (18+).
// It returns a Promise that resolves to a Response object.
// -------------------------------------------------------------
console.log("\n--- 3. Consuming Public REST API ---");

async function fetchDummyProduct() {
  try {
    // Step 1: Make HTTP network request
    const response = await fetch("https://dummyjson.com/products/1");

    // Step 2: Check if HTTP response status is OK (status code 200-299)
    // Note: fetch does NOT reject on 404 or 500 errors! You must check response.ok.
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // Step 3: Parse stream body into JSON
    const product = await response.json();

    console.log("Product Title:", product.title);
    console.log("Product Price:", `$${product.price}`);
    console.log("Product Category:", product.category);

  } catch (err) {
    console.error("Fetch request error:", err.message);
  }
}

fetchDummyProduct();


// -------------------------------------------------------------
// 4. POST REQUEST WITH FETCH (SENDING DATA TO SERVER)
// How frontend sends form data / payloads to Express or REST backends.
// -------------------------------------------------------------
async function createNewPost() {
  console.log("\n--- 4. Sending Data via POST Request ---");

  const newPostData = {
    title: "Learning MERN Stack in 2026",
    userId: 5
  };

  try {
    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST", // HTTP Method
      headers: {
        "Content-Type": "application/json" // Inform server we are sending JSON
      },
      body: JSON.stringify(newPostData) // Turn JS object into JSON string
    });

    const createdPost = await response.json();
    console.log("Server created new post with ID:", createdPost.id);
    console.log("Saved post payload:", createdPost);

  } catch (error) {
    console.error("POST request failed:", error.message);
  }
}

createNewPost();