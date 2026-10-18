// =============================================================
// DAY 20: JAVASCRIPT PROTOTYPES & PROTOTYPAL INHERITANCE
// =============================================================
// Unlike Java or C++ which use classical class-based inheritance,
// JavaScript is prototype-based.
//
// Every object in JS has an internal link to another object called
// its "Prototype". When you look up a property or method on an object,
// JS searches the object first. If not found, it traverses UP the
// "Prototype Chain" until it reaches null (Object.prototype).
// =============================================================


// -------------------------------------------------------------
// 1. UNDERSTANDING [[Prototype]] AND __proto__
// Every plain object inherits methods like .toString() and
// .hasOwnProperty() from the master Object.prototype.
// -------------------------------------------------------------
console.log("--- 1. The Prototype Chain Base ---");

const developer = {
  name: "Krunal",
  role: "MERN Stack Engineer"
};

// Accessing the hidden prototype link:
console.log("Developer prototype:", Object.getPrototypeOf(developer));

// Even though we never wrote .hasOwnProperty on 'developer', it exists
// because it is found up the chain on Object.prototype:
console.log("Has 'role' property directly?", developer.hasOwnProperty("role")); // true
console.log("Prototype of Object.prototype:", Object.getPrototypeOf(Object.prototype)); // null (Chain ends here)


// -------------------------------------------------------------
// 2. CONSTRUCTOR FUNCTIONS & .prototype
// Before ES6 'class', constructor functions combined with '.prototype'
// were used to share methods across thousands of objects without
// duplicating memory.
// -------------------------------------------------------------
console.log("\n--- 2. Constructor Functions & Shared Prototypes ---");

function TechGadget(name, price) {
  // Instance-specific properties (created new on every object):
  this.name = name;
  this.price = price;
}

// Attach methods to the prototype so every instance shares ONE copy in memory:
TechGadget.prototype.getDetails = function () {
  return `${this.name} costs ₹${this.price}`;
};

TechGadget.prototype.applyDiscount = function (percent) {
  this.price -= this.price * (percent / 100);
  return `Discount applied! New price: ₹${this.price}`;
};

const gadget1 = new TechGadget("Mechanical Keyboard", 4500);
const gadget2 = new TechGadget("Gaming Mouse", 2200);

console.log(gadget1.getDetails());
console.log(gadget2.getDetails());

// Both instances point to the exact same function reference in memory:
console.log("Do both share the same method in memory?", gadget1.getDetails === gadget2.getDetails); // true


// -------------------------------------------------------------
// 3. OBJECT.CREATE() (CLEAN PROTOTYPAL INHERITANCE)
// Object.create(proto) creates a new empty object whose prototype
// is explicitly set to the object passed in.
// -------------------------------------------------------------
console.log("\n--- 3. Direct Inheritance with Object.create ---");

const vehicleBase = {
  wheels: 4,
  honk() {
    return `${this.model} says: Beep beep!`;
  }
};

// Create a new car that inherits directly from vehicleBase:
const sportsCar = Object.create(vehicleBase);
sportsCar.model = "Porsche 911";
sportsCar.topSpeed = "310 km/h";

console.log(sportsCar.honk()); // Inherited method from vehicleBase
console.log("Inherited wheels count:", sportsCar.wheels); // 4
console.log("Own property check (model):", sportsCar.hasOwnProperty("model")); // true
console.log("Own property check (wheels):", sportsCar.hasOwnProperty("wheels")); // false (inherited)


// -------------------------------------------------------------
// 4. POLYFILLING: HOW ARRAY METHODS WORK UNDER THE HOOD
// When you call [].map() or [].filter(), you are calling functions
// defined on Array.prototype.
// Let's create our own custom array method to see how it works!
// -------------------------------------------------------------
console.log("\n--- 4. Extending Array Prototype (Custom Polyfill) ---");

// Adding a custom method to all JavaScript arrays:
Array.prototype.myCustomDoubler = function () {
  const result = [];
  // 'this' refers to the array calling the method:
  for (let i = 0; i < this.length; i++) {
    result.push(this[i] * 2);
  }
  return result;
};

const numbers = [5, 10, 15, 20];
console.log("Original array:", numbers);
console.log("Doubled via prototype method:", numbers.myCustomDoubler()); // [10, 20, 30, 40]


// -------------------------------------------------------------
// 5. ES6 CLASS TO PROTOTYPE COMPARISON
// The modern 'class' keyword is simply a cleaner syntax for prototypes.
// -------------------------------------------------------------
console.log("\n--- 5. Class vs Prototype Equality ---");

class ServerApp {
  constructor(port) {
    this.port = port;
  }
  start() {
    return `Server listening on port ${this.port}`;
  }
}

const server = new ServerApp(5000);

// Proof that 'class' is just a function with a prototype:
console.log("Type of ServerApp:", typeof ServerApp); // "function"
console.log("Method location:", ServerApp.prototype.hasOwnProperty("start")); // true