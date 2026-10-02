// =============================================================
// DAY 8: JAVASCRIPT OBJECTS (KEY-VALUE PAIRS)
// =============================================================
// While an Array is just an ordered list of items, an Object
// represents a real-world entity with named properties.
// Think of it like an ID card: name, age, city, skills.
// Syntax: { key: value }
// =============================================================


// -------------------------------------------------------------
// 1. CREATING A BASIC OBJECT
// Curly braces {} define an object literal.
// -------------------------------------------------------------
console.log("--- 1. Creating and Reading Objects ---");

const developer = {
  name: "Krunal",
  role: "Full Stack Developer",
  experienceYears: 1,
  isEmployed: false
};

// Reading properties:
// Option A: Dot notation (Most common & preferred)
console.log("Developer name:", developer.name);
console.log("Role:", developer.role);

// Option B: Bracket notation (Use when property name has spaces or comes from a variable)
console.log("Years active:", developer["experienceYears"]);


// -------------------------------------------------------------
// 2. ADDING, UPDATING, & DELETING PROPERTIES
// Just like arrays, 'const' objects can have their contents modified.
// -------------------------------------------------------------
console.log("\n--- 2. Modifying Properties ---");

// Add a brand-new property:
developer.githubUsername = "krunal-viradiya";

// Update an existing value:
developer.experienceYears = 2;

// Delete a property:
delete developer.isEmployed;

console.log("Updated developer object:", developer);


// -------------------------------------------------------------
// 3. NESTED OBJECTS & ARRAYS INSIDE OBJECTS
// Real-world data (like APIs) is almost always nested.
// -------------------------------------------------------------
console.log("\n--- 3. Nested Data ---");

const userProfile = {
  id: 101,
  personalInfo: {
    fullName: "Alex Rivera",
    city: "Ahmedabad",
    country: "India"
  },
  skills: ["HTML", "CSS", "JavaScript", "React"],
  preferences: {
    darkMode: true
  }
};

// Drilling down through layers:
console.log("City:", userProfile.personalInfo.city);
console.log("Second skill:", userProfile.skills[1]); // CSS


// -------------------------------------------------------------
// 4. OBJECT METHODS & THE 'this' KEYWORD
// A function stored inside an object is called a "Method".
// 'this' refers to the object itself (owner of the method).
// -------------------------------------------------------------
console.log("\n--- 4. Object Methods ---");

const bankAccount = {
  accountHolder: "Krunal",
  balance: 5000,

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  },

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Declined: Insufficient funds!");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrew $${amount}. Remaining balance: $${this.balance}`);
  }
};

bankAccount.deposit(1200);
bankAccount.withdraw(2000);


// -------------------------------------------------------------
// 5. CHECKING & LOOPING OVER OBJECTS
// - Object.keys(): Returns an array of all keys
// - Object.values(): Returns an array of all values
// - 'in' operator: Checks if a key exists
// -------------------------------------------------------------
console.log("\n--- 5. Inspecting Objects ---");

const car = {
  brand: "Tesla",
  model: "Model 3",
  year: 2024
};

console.log("Keys:", Object.keys(car));     // ["brand", "model", "year"]
console.log("Values:", Object.values(car)); // ["Tesla", "Model 3", 2024]
console.log("Has brand property?", "brand" in car); // true


// -------------------------------------------------------------
// 6. OBJECT DESTRUCTURING (ES6 Shortcut)
// Unpacking values into standalone variables with zero boilerplate.
// You'll see this everywhere in React component props!
// -------------------------------------------------------------
console.log("\n--- 6. Modern Destructuring ---");

const laptop = {
  modelName: "MacBook Air",
  chip: "M2",
  ram: "16GB",
  storage: "512GB"
};

// Instead of: const modelName = laptop.modelName; const chip = laptop.chip;
const { modelName, chip, ram } = laptop;

console.log(`Setup: ${modelName} powered by the ${chip} chip with ${ram} RAM.`);