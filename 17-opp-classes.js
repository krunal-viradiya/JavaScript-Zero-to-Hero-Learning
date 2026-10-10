// =============================================================
// DAY 15: OBJECT-ORIENTED JAVASCRIPT (ES6 CLASSES)
// =============================================================
// A Class is a blueprint or factory mold.
// Instead of creating individual objects by hand over and over,
// you write a Class once, and then instantiate as many unique
// objects ("instances") as you need using the 'new' keyword.
// =============================================================


// -------------------------------------------------------------
// 1. BASIC CLASS SYNTAX & THE CONSTRUCTOR
// The 'constructor()' method runs automatically whenever you 
// create a new instance with 'new'.
// -------------------------------------------------------------
console.log("--- 1. Basic Class & Instances ---");

class User {
  constructor(name, email) {
    // 'this' refers to the specific instance being created
    this.name = name;
    this.email = email;
    this.isActive = true;
  }

  // Instance Method (reusable across all instances):
  displayProfile() {
    return `User: ${this.name} | Contact: ${this.email} | Active: ${this.isActive}`;
  }

  deactivateAccount() {
    this.isActive = false;
    console.log(`Account for ${this.name} deactivated.`);
  }
}

// Instantiating users from the blueprint:
const user1 = new User("Krunal Viradiya", "krunal@example.com");
const user2 = new User("Alex Rivera", "alex@example.com");

console.log(user1.displayProfile());
console.log(user2.displayProfile());


// -------------------------------------------------------------
// 2. INHERITANCE (EXTENDS & SUPER)
// Child classes inherit properties and methods from parent classes.
// - 'extends': links child to parent.
// - 'super()': calls parent constructor to set up inherited properties.
// -------------------------------------------------------------
console.log("\n--- 2. Class Inheritance ---");

class AdminUser extends User {
  constructor(name, email, permissions) {
    // 1. Call parent constructor with name and email:
    super(name, email);

    // 2. Add extra properties specific to Admin:
    this.role = "Administrator";
    this.permissions = permissions;
  }

  // Method overriding (specialized version for Admin):
  displayProfile() {
    // We can reuse the parent method using super.displayProfile()
    return `${super.displayProfile()} | Role: ${this.role} | Permissions: [${this.permissions.join(", ")}]`;
  }

  deleteDatabaseRecord(recordId) {
    console.log(`Admin ${this.name} deleted record #${recordId} from database.`);
  }
}

const admin = new AdminUser("Super Admin", "admin@root.com", ["read", "write", "drop_db"]);
console.log(admin.displayProfile());
admin.deleteDatabaseRecord(9021);


// -------------------------------------------------------------
// 3. ENCAPSULATION & PRIVATE FIELDS (#)
// Modern JS supports private fields using the '#' prefix.
// Private fields cannot be accessed or modified from outside the class!
// -------------------------------------------------------------
console.log("\n--- 3. Private Fields & Encapsulation ---");

class BankAccount {
  // Private field (locked inside the class):
  #balance;

  constructor(accountHolder, initialDeposit) {
    this.accountHolder = accountHolder;
    this.#balance = initialDeposit;
  }

  // Controlled public method to add funds:
  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be positive!");
      return;
    }
    this.#balance += amount;
    console.log(`Deposited $${amount}. New Balance: $${this.#balance}`);
  }

  // Controlled public method to withdraw funds:
  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Transaction declined: Insufficient funds!");
      return;
    }
    this.#balance -= amount;
    console.log(`Withdrew $${amount}. Remaining Balance: $${this.#balance}`);
  }

  // Getter method (read-only access to private state):
  getBalance() {
    return `$${this.#balance}`;
  }
}

const myAccount = new BankAccount("Krunal", 1000);
myAccount.deposit(500);
myAccount.withdraw(200);

console.log("Current Balance:", myAccount.getBalance());

// Trying to access or modify a private field directly will throw a syntax error:
// console.log(myAccount.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class


// -------------------------------------------------------------
// 4. GETTERS & SETTERS (get / set)
// Provide fine-grained control when reading or updating a property.
// -------------------------------------------------------------
console.log("\n--- 4. Getters and Setters ---");

class TemperatureSensor {
  constructor(celsius) {
    this._celsius = celsius; // '_' convention signals internal use
  }

  // Getter: computed on the fly when accessed like a property
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  // Setter: validates before applying changes
  set celsius(newTemp) {
    if (newTemp < -273.15) {
      console.log("Error: Below absolute zero is impossible!");
      return;
    }
    this._celsius = newTemp;
  }
}

const sensor = new TemperatureSensor(25);
console.log("Reading in Fahrenheit:", sensor.fahrenheit); // 77

sensor.celsius = 30; // Triggers setter validation
console.log("Updated Fahrenheit:", sensor.fahrenheit); // 86


// -------------------------------------------------------------
// 5. STATIC METHODS & PROPERTIES
// Static methods belong to the CLASS itself, not instances!
// You call them directly on the Class name (e.g., Math.max, Array.isArray).
// -------------------------------------------------------------
console.log("\n--- 5. Static Utility Methods ---");

class MathHelpers {
  static PI = 3.14159;

  static calculateCircleArea(radius) {
    return this.PI * radius * radius;
  }
}

// Call directly on the Class without creating an instance with 'new':
console.log("Circle Area with radius 5:", MathHelpers.calculateCircleArea(5));