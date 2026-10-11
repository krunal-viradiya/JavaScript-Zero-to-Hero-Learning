// =============================================================
// DAY 16: JAVASCRIPT ERROR HANDLING (WRITING RESILIENT CODE)
// =============================================================
// Bugs and network failures will happen in production.
// If an unhandled error occurs, JavaScript halts execution entirely.
// Error handling lets your app catch unexpected issues, log them,
// fail gracefully, and keep running without crashing.
// =============================================================


// -------------------------------------------------------------
// 1. THE CLASSIC TRY...CATCH...FINALLY BLOCK
// - try:     Code that might throw an error lives here.
// - catch:   Runs ONLY if something inside 'try' breaks.
// - finally: ALWAYS runs, whether an error occurred or not
//            (great for cleanup, closing DB connections, resetting loaders).
// -------------------------------------------------------------
console.log("--- 1. Basic try...catch...finally ---");

function parseUserData(jsonString) {
  try {
    console.log("Attempting to parse incoming JSON payload...");
    const parsed = JSON.parse(jsonString);
    console.log("Parsed successfully:", parsed);
    return parsed;
  } catch (error) {
    // 'error' is an object containing .name and .message
    console.error("Caught an error while parsing!");
    console.error(`Error Type: ${error.name} | Message: ${error.message}`);
    return null; // Safe fallback instead of crashing
  } finally {
    console.log("Cleanup: JSON parsing cycle completed.\n");
  }
}

// Valid input:
parseUserData('{"name": "Krunal", "role": "MERN Dev"}');

// Corrupted JSON (triggers catch block):
parseUserData('{"name": "Krunal", invalid_json}');


// -------------------------------------------------------------
// 2. THROWING CUSTOM ERRORS WITH 'throw new Error()'
// Don't wait for JavaScript to break on its own. Validate inputs
// and explicitly throw an error when business rules fail.
// -------------------------------------------------------------
console.log("--- 2. Throwing Custom Validation Errors ---");

function processBankWithdrawal(balance, withdrawAmount) {
  try {
    if (typeof withdrawAmount !== "number" || isNaN(withdrawAmount)) {
      throw new TypeError("Withdrawal amount must be a valid number!");
    }

    if (withdrawAmount <= 0) {
      throw new RangeError("Withdrawal amount must be greater than zero!");
    }

    if (withdrawAmount > balance) {
      throw new Error(`Insufficient funds: Requested $${withdrawAmount}, but balance is only $${balance}.`);
    }

    const remaining = balance - withdrawAmount;
    console.log(`Success: Withdrew $${withdrawAmount}. Remaining: $${remaining}`);
    return remaining;

  } catch (err) {
    console.error(`[Transaction Failed]: ${err.message}`);
  }
}

processBankWithdrawal(500, 200);   // Works
processBankWithdrawal(500, "abc"); // TypeError caught
processBankWithdrawal(500, 750);   // Custom Insufficient Funds error caught


// -------------------------------------------------------------
// 3. CREATING CUSTOM ERROR CLASSES (MERN / API PATTERN)
// In Express backends, custom error classes let you attach HTTP status
// codes (like 404 Not Found, 401 Unauthorized) directly to the error.
// -------------------------------------------------------------
console.log("\n--- 3. Custom Error Classes ---");

class DatabaseConnectionError extends Error {
  constructor(message, host) {
    super(message); // Call parent Error constructor
    this.name = "DatabaseConnectionError";
    this.host = host;
    this.statusCode = 503; // Service Unavailable
  }
}

class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.statusCode = 400; // Bad Request
  }
}

function simulateDbQuery(isConnected) {
  try {
    if (!isConnected) {
      throw new DatabaseConnectionError("MongoDB replica set is unreachable", "cluster0.mongodb.net");
    }
    console.log("Query executed successfully on database.");
  } catch (err) {
    if (err instanceof DatabaseConnectionError) {
      console.error(`DB Alert (${err.statusCode}): ${err.message} on host: ${err.host}`);
    } else {
      console.error("Unknown error:", err.message);
    }
  }
}

simulateDbQuery(false);


// -------------------------------------------------------------
// 4. ASYNC ERROR HANDLING (ASYNC / AWAIT)
// Unhandled Promise rejections will crash modern Node.js servers.
// Always pair 'await' with 'try...catch' or a global handler.
// -------------------------------------------------------------
console.log("\n--- 4. Async Error Handling ---");

async function fetchExternalUserProfile(userId) {
  try {
    console.log(`Fetching profile for user #${userId}...`);

    // Simulated async network call that fails:
    const user = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === 404) {
          reject(new Error("User record not found in remote database"));
        } else {
          resolve({ id: userId, username: "krunal_v" });
        }
      }, 500);
    });

    console.log("User retrieved:", user);

  } catch (asyncErr) {
    console.error("Async call failed gracefully:", asyncErr.message);
  } finally {
    console.log("Async request terminated.");
  }
}

fetchExternalUserProfile(404);


// -------------------------------------------------------------
// 5. STANDARD JAVASCRIPT ERROR TYPES AT A GLANCE
// - TypeError:      Wrong data type used (e.g., null.toUpperCase())
// - ReferenceError: Variable used before declaration or out of scope
// - RangeError:     Number outside valid limits (e.g., array with length -1)
// - SyntaxError:    Invalid code grammar (caught at parse time)
// -------------------------------------------------------------
console.log("\n--- 5. Error Type Breakdown ---");

try {
  let score = null;
  score.calculate(); // null has no methods!
} catch (err) {
  console.log(`Caught standard JS error: [${err.name}]: ${err.message}`);
}