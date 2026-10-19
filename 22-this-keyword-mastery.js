// =============================================================
// DAY 21: THE 'this' KEYWORD & FUNCTION BINDING MASTERY
// =============================================================
// Golden Rule of 'this':
// In regular functions, 'this' refers to the object that CALLED
// the function (the call-site), NOT where it was defined.
//
// There are 4 fundamental rules that determine 'this':
// 1. Default Binding (Global / Undefined in strict mode)
// 2. Implicit Binding (Object method call)
// 3. Explicit Binding (call, apply, bind)
// 4. 'new' Binding (Constructor functions / Classes)
// =============================================================


// -------------------------------------------------------------
// 1. IMPLICIT BINDING (THE CALLER OBJECT)
// Look to the left of the dot at call-time: user.greet() -> 'this' is user.
// -------------------------------------------------------------
console.log("--- 1. Implicit Binding ---");

const user = {
  name: "Krunal",
  role: "MERN Engineer",
  introduce() {
    console.log(`Hello, I'm ${this.name}, working as a ${this.role}.`);
  }
};

user.introduce(); // 'this' is 'user' -> works as expected


// -------------------------------------------------------------
// 2. THE "LOSING 'this'" TRAP (CALLBACK / DETACHED METHOD)
// When you pass an object method as a callback, it gets detached
// and loses its original caller!
// -------------------------------------------------------------
console.log("\n--- 2. Detached Function Reference ---");

const detachedIntroduce = user.introduce;
// detachedIntroduce(); 
// In strict mode: TypeError: Cannot read properties of undefined (reading 'name')
// In non-strict mode: this.name becomes undefined (points to global window/global)


// -------------------------------------------------------------
// 3. EXPLICIT BINDING: call(), apply(), AND bind()
// Force a function to use a specific object as its 'this' context.
// -------------------------------------------------------------
console.log("\n--- 3. Explicit Binding (call, apply, bind) ---");

function printTechStack(primary, secondary) {
  console.log(`Developer: ${this.name} | Primary: ${primary} | Secondary: ${secondary}`);
}

const devA = { name: "Alex" };
const devB = { name: "Sarah" };

// A. .call() — Invokes immediately; passes arguments one by one:
printTechStack.call(devA, "React", "Node.js");

// B. .apply() — Invokes immediately; passes arguments as an ARRAY:
printTechStack.apply(devB, ["Python", "FastAPI"]);

// C. .bind() — Does NOT invoke immediately! Returns a brand new function
//    permanently bound to the provided object (essential for event handlers & React):
const boundToKrunal = printTechStack.bind(user, "JavaScript", "MongoDB");
boundToKrunal(); // Can be called anytime, anywhere!


// -------------------------------------------------------------
// 4. ARROW FUNCTIONS & LEXICAL 'this'
// Arrow functions do NOT have their own 'this'!
// They inherit 'this' from the enclosing (surrounding) scope where
// they were written.
// -------------------------------------------------------------
console.log("\n--- 4. Arrow Functions (Lexical this) ---");

const team = {
  teamName: "Core Web Squad",
  members: ["Krunal", "Raju", "Vikram"],

  listMembers() {
    // Inside listMembers(), 'this' is the 'team' object.
    
    // An arrow function here retains 'team' as 'this':
    this.members.forEach((member) => {
      console.log(`${member} is a member of [${this.teamName}]`);
    });
  }
};

team.listMembers();

// WARNING: Never use arrow functions as top-level object methods!
const brokenObject = {
  name: "Bad Example",
  greet: () => {
    // 'this' is NOT brokenObject! It is the global scope / empty module:
    console.log(`My name is ${this.name}`); // undefined
  }
};
brokenObject.greet();


// -------------------------------------------------------------
// 5. 'new' BINDING (CONSTRUCTORS)
// When a function is called with 'new', JS creates an empty object
// and binds 'this' directly to that newly created object.
// -------------------------------------------------------------
console.log("\n--- 5. 'new' Binding ---");

function Project(projectName, deadlineWeeks) {
  this.projectName = projectName;
  this.deadlineWeeks = deadlineWeeks;
  this.getSummary = function () {
    return `Project: ${this.projectName} (Target: ${this.deadlineWeeks} weeks)`;
  };
}

const activeProject = new Project("Full-Stack Portal", 6);
console.log(activeProject.getSummary());