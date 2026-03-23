export interface SubTopic {
    title: string;
    content: string;
}

export interface JSLesson {
    title: string;
    subtopics: SubTopic[];
    task: string;
    hint: string;
    initialCode: string;
}

export const jsLessonsData: Record<string, JSLesson> = {
    "201": {
        title: "JavaScript Fundamentals - Lesson 1",
        subtopics: [
            {
                title: "Topic 1: JavaScript as a Multi-Paradigm Language",
                content: `Now, let us begin with understanding JavaScript as a multi-paradigm language.

JavaScript is a versatile language.
This means it does not force you to follow only one way of writing programs.

Instead, it supports multiple programming paradigms, which allows developers to choose the approach that best fits their needs.

JavaScript supports three major paradigms.

First, Functional Programming.
Here, functions are treated as the primary building blocks of code.
The focus is on pure functions, immutability, and avoiding side effects.

Second, Procedural Programming.
In this approach, code is written as a series of step-by-step instructions.
Each step performs a task to achieve a desired outcome.

Third, Object-Oriented Programming, also called OOP.
In this paradigm, code is organized around objects and classes.
Objects encapsulate data and behavior, and concepts such as inheritance, encapsulation, and polymorphism are promoted.

So, JavaScript allows functional, procedural, and object-oriented styles - all within the same language.

This completes the first topic.`
            },
            {
                title: "Topic 2: Program vs. Process",
                content: `Next, let us clearly distinguish between a program and a process.

A program is a static set of instructions.
It is the code written by a developer and stored on disk.

A process, on the other hand, is a program under execution.
It represents the dynamic state of that code while it is running.

So, a program is static, and a process is dynamic.

This distinction is important and foundational.`
            },
            {
                title: "Topic 3: Variables",
                content: `Now we move to variables, which are fundamental in programming.

A variable is a container used to store data values.

Variables are mutable, meaning their values can be updated and reused during the execution of a program.

Now let us look at naming rules for variables.

Allowed characters include:
- Letters from a-z and A-Z
- The underscore (_)
- The dollar sign ($)
- Camel case, such as myVariableName

Now, what is not allowed?

Variables:
- Cannot start with a digit
- Cannot contain special characters like -, !, @, #
- Cannot contain spaces
- Cannot be keywords, meaning reserved words in JavaScript

Example:
let name = "hazik";
name = "iqram"; // Variable updated

Here, the variable name is first assigned one value and then updated with another.

This demonstrates mutability.`
            },
            {
                title: "Topic 4: Keywords",
                content: `Keywords are reserved words in JavaScript.
They have special meanings and cannot be used as variable names.

Some examples include:
let, const, var, return, if, else, for, while

These words are part of the language itself.`
            },
            {
                title: "Topic 5: Data Types in JavaScript",
                content: `JavaScript supports several types of values that can be stored in variables.

Primitive data types are atomic in nature.
They represent single, simple values and do not depend on other types.

Number represents both integers and floating-point numbers.
Examples include 10, -3, 3.6, 3.1415, 100, 1000.

String represents textual data.
They can be enclosed in single quotes, double quotes, or backticks.
Examples include "HAZIK", "iqram", and "wasim".

Boolean values represent logical entities.
They have only two possible values: true and false.
These themselves are keywords.

Undefined is automatically assigned to variables that are declared but not assigned a value.
It means the variable exists but has not been given a value yet.

Example:
let age; // age is undefined

Null represents the intentional absence of a value.
It is an assigned value indicating emptiness.

The difference is important:
- undefined means no value has been assigned
- null means a value has been deliberately set to empty

Example:
let a; // a is undefined
let b = 10;
b = null; // b is intentionally empty

Non-primitive data types are Objects.
Objects store collections of data using key-value pairs.

Example:
let user = {
  name: "ahmad",
  age: 23,
  post: {
    createdAt: "Jun 12, 2033",
    text: "my first post"
  },
  gender: "Male"
};`
            },
            {
                title: "Topic 6: Data Type Examples and console.log",
                content: `Now let us observe how these values are used.

Example:
let marks = 100;
let name = "iqram";
let age;
let company = null;
let salary = undefined;
let isStudent = false;

We then use console.log to print values.
This helps us inspect data during execution.

Objects can also be logged directly, showing all their properties.`
            },
            {
                title: "Topic 7: Special Characters (Escape Sequences)",
                content: `Special characters, also known as escape sequences, are used inside strings to represent characters that are difficult to type directly.

\\n represents a newline.
\\t represents a tab space.

Example:
console.log("Line1\\nLine2");
console.log("Column1\\tColumn2");`
            },
            {
                title: "Topic 8: Introduction to Operators",
                content: `Operators are tools that allow us to perform actions on values, called operands.

Operators are categorized based on the number of operands they take:

Binary operators work on two operands (a + b, x === y).
Unary operators work on a single operand (a++, !isTrue).
Ternary operators work on three operands (condition ? a : b).

Operators can perform calculations, assignments, comparisons, or even bit-level operations.`
            },
            {
                title: "Topic 9: Arithmetic Operators",
                content: `Arithmetic operators perform basic math operations:

- Addition
- Subtraction
- Multiplication
- Division
- Modulus
- Exponentiation

In 10 + 3, 10 and 3 are operands and + is the operator.`
            },
            {
                title: "Topic 10: Assignment Operators",
                content: `Assignment operators assign or update variable values.

Operators like +=, -=, *=, /=, and %= update the variable using its existing value.

Each has an equivalent longer form, such as a = a + 2.`
            },
            {
                title: "Topic 11: Relational / Comparison Operators",
                content: `Comparison operators compare two values and return a boolean result.

They include <, >, <=, and >=.

The output is always true or false.`
            },
            {
                title: "Topic 12: Logical Operators",
                content: `Logical operators evaluate boolean logic.

- && returns true if both values are true
- || returns true if at least one value is true
- ! inverts the value

These operators are widely used in conditions and validation.`
            },
            {
                title: "Topic 13: Short-Circuiting",
                content: `Logical operators short-circuit to optimize evaluation.

- && returns the first falsy value or the last truthy one
- || returns the first truthy value or the last falsy one

This prevents unnecessary execution.`
            },
            {
                title: "Topic 14: Falsy Values in JavaScript",
                content: `The falsy values are:
false, 0, -0, "", null, undefined, and NaN

Everything else is truthy.`
            },
            {
                title: "Topic 15: Type Coercion in Logical Expressions",
                content: `JavaScript automatically converts values to boolean when required.
This is called type coercion.

Truthy and falsy checks in conditionals demonstrate this behavior.`
            },
            {
                title: "Topic 16: Special Numbers in JavaScript",
                content: `JavaScript includes special numeric values such as:
-0, NaN, Infinity, and -Infinity

These handle numerical edge cases gracefully.`
            },
            {
                title: "Topic 17: Bitwise Operators",
                content: `Bitwise operators work at the bit level.
JavaScript converts numbers to 32-bit binary, performs the operation, and converts them back.

Example:
let result = 5 & 7;
console.log(result);`
            },
            {
                title: "Topic 18: typeof Operator",
                content: `The typeof operator returns the type of a value as a string.

A special case exists:
typeof null returns "object", which is a legacy bug.`
            },
            {
                title: "Topic 19: typeof vs instanceof",
                content: `typeof checks the type of a value.
instanceof checks whether an object belongs to a specific class.

Each has different use cases and limitations.`
            },
            {
                title: "Topic 20: Equality Operators",
                content: `JavaScript has two equality operators.

== performs abstract equality, which includes type coercion.
=== performs strict equality, which checks both type and value.

Abstract equality can lead to unexpected results due to hidden coercion steps.

Strict equality avoids coercion and is safer.

Best practice is to default to === unless coercion is explicitly required.`
            },
            {
                title: "Topic 21: Unary Operators",
                content: `Unary operators act on a single operand. They are concise and often used for incrementing/decrementing values, changing signs, or determining data types.`
            },
            {
                title: "Topic 22: Postfix Increment / Decrement",
                content: `When the operator comes after the variable, the original value is used first, and then the variable is updated.

Example:
let a = 10;
let y = a++; // y gets 10, then a becomes 11
console.log(a); // 11
console.log(y); // 10`
            },
            {
                title: "Topic 23: Prefix Increment / Decrement",
                content: `When the operator comes before the variable, the variable is updated first, and then the updated value is used.

Example:
let a = 9;
let y = ++a; // a becomes 10, then y gets 10
console.log(a); // 10
console.log(y); // 10`
            },
            {
                title: "Topic 24: Unary Plus and Unary Minus",
                content: `Unary plus attempts to convert its operand to a number.
If the conversion is successful, it returns the numeric representation.

Example:
let x = "22";
let y = +x; // 22
console.log(typeof y); // "number"

Unary minus converts and negates the value.

Example:
let x = "22";
let y = -x; // -22

Unary plus can also convert booleans:
let boolVal = +true; // 1`
            },
            {
                title: "Topic 25: What If Conversion Fails?",
                content: `If the operand cannot be converted into a valid number, the result is NaN.

Example:
let str = "hello";
console.log(+str); // NaN
console.log(-str); // NaN`
            },
            {
                title: "Topic 26: typeof Operator Examples",
                content: `The typeof operator returns a string indicating the data type.

Examples:
let num = 42;
console.log(typeof num); // "number"

let str = "JavaScript";
console.log(typeof str); // "string"

let bool = true;
console.log(typeof bool); // "boolean"

let obj = {};
console.log(typeof obj); // "object"

let func = function() {};
console.log(typeof func); // "function"

let undef;
console.log(typeof undef); // "undefined"

console.log(typeof null); // "object" (historical quirk)
`
            },
            {
                title: "Topic 27: Ternary Operator (Conditional Expression)",
                content: `The ternary operator is the only operator in JavaScript that takes three operands.

Syntax:
condition ? expressionIfTrue : expressionIfFalse

Examples:
let age = 20;
let canVote = (age >= 18) ? "Yes, can vote" : "No, cannot vote";

let temperature = 25;
let weather = (temperature > 30) ? "Hot" : "Moderate";

let x = (true) ? (2 + 3) : (2 - 3);
console.log(x); // 5

let a = 5;
let b = (a > 10) ? (a * 2) : (a + 1);
console.log(b); // 6`
            },
            {
                title: "Topic 28: Ternary Operator vs. if-else (Rule of Thumb)",
                content: `Both the ternary operator and if-else statements are used for conditional logic.

Example comparison:
let isLoggedIn = true;
let statusMessage = isLoggedIn ? "Welcome back!" : "Please log in.";
console.log(statusMessage);

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in.");
}

Rule of thumb:
Use the ternary operator for quick, simple conditional assignments where you need to choose between two values.
For more complex logic, multiple actions, or nested conditions, use if-else statements.`
            }
        ],
        task: "Review JS fundamentals: paradigms, variables, data types, and operators.",
        hint: "Use console.log and typeof to inspect values. Prefer === for comparisons.",
        initialCode: `let score = 100;
let user = "hazik";
let age;
let company = null;
let isStudent = false;

console.log(typeof score, typeof user, typeof age, typeof company, typeof isStudent);

let a = 10;
let b = 3;
console.log(a + b, a % b, a > b, a === b);`
    },
    "202": {
        title: "Loops and Functions in JavaScript",
        subtopics: [
            {
                title: "For Loops",
                content: `The for loop is used when you know how many times to iterate:

for (initialization; condition; increment) {
    // code to execute
}

for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

For...of Loop (for iterables):
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit);
}

For...in Loop (for object properties):
const person = { name: "John", age: 30 };
for (const key in person) {
    console.log(key + ": " + person[key]);
}`
            },
            {
                title: "While and Do-While Loops",
                content: `While Loop - Executes while condition is true:

let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

Do-While Loop - Executes at least once:

let num = 0;
do {
    console.log(num);
    num++;
} while (num < 5);

Loop Control:
• break - Exit the loop immediately
• continue - Skip current iteration

for (let i = 0; i < 10; i++) {
    if (i === 5) break;    // Stops at 5
    if (i === 3) continue; // Skips 3
    console.log(i);
}`
            },
            {
                title: "Functions",
                content: `Functions are reusable blocks of code:

Function Declaration:
function greet(name) {
    return "Hello, " + name + "!";
}

Function Expression:
const greet = function(name) {
    return "Hello, " + name + "!";
};

Arrow Functions (ES6):
const greet = (name) => "Hello, " + name + "!";

// With multiple statements:
const calculate = (a, b) => {
    const sum = a + b;
    return sum * 2;
};

Default Parameters:
function greet(name = "Guest") {
    return "Hello, " + name;
}

Rest Parameters:
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5); // 15`
            }
        ],
        task: "Practice writing loops and functions to iterate over data and create reusable code blocks.",
        hint: "Arrow functions provide a concise syntax. Use 'for...of' for arrays and 'for...in' for objects.",
        initialCode: `// Practice loops
for (let i = 1; i <= 5; i++) {
    console.log("Iteration:", i);
}

// Practice functions
const multiply = (a, b) => a * b;
console.log("5 x 3 =", multiply(5, 3));

// Try: Create a function that sums an array
const numbers = [1, 2, 3, 4, 5];`
    },
    "203": {
        title: "Introduction to Arrays and Objects",
        subtopics: [
            {
                title: "Arrays",
                content: `Arrays are ordered collections of items:

Creating Arrays:
const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];

Accessing Elements (0-indexed):
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "cherry"

Array Methods:
• push() - Add to end
• pop() - Remove from end
• shift() - Remove from beginning
• unshift() - Add to beginning
• slice() - Extract portion
• splice() - Add/remove elements
• concat() - Merge arrays
• indexOf() - Find index
• includes() - Check if exists

fruits.push("orange");    // ["apple", "banana", "cherry", "orange"]
fruits.pop();             // ["apple", "banana", "cherry"]

Array Length:
console.log(fruits.length); // 3`
            },
            {
                title: "Objects",
                content: `Objects store key-value pairs:

Creating Objects:
const person = {
    name: "John",
    age: 30,
    city: "New York",
    isStudent: false
};

Accessing Properties:
• Dot notation: person.name
• Bracket notation: person["name"]

console.log(person.name);     // "John"
console.log(person["age"]);   // 30

Modifying Objects:
person.age = 31;              // Update
person.country = "USA";       // Add new property
delete person.isStudent;      // Remove property

Object Methods:
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    // Shorthand method syntax
    subtract(a, b) {
        return a - b;
    }
};

Object.keys(person);   // ["name", "age", "city"]
Object.values(person); // ["John", 30, "New York"]
Object.entries(person); // [["name","John"], ["age",30], ...]`
            },
            {
                title: "Array Higher-Order Methods",
                content: `Modern JavaScript provides powerful array methods:

map() - Transform each element:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

filter() - Keep elements that pass test:
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

reduce() - Reduce to single value:
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

find() - Find first matching element:
const users = [{id: 1, name: "John"}, {id: 2, name: "Jane"}];
const john = users.find(u => u.name === "John");

forEach() - Execute for each element:
numbers.forEach(n => console.log(n));

some() / every() - Test conditions:
numbers.some(n => n > 3);  // true (at least one)
numbers.every(n => n > 0); // true (all)

Chaining Methods:
const result = numbers
    .filter(n => n > 2)
    .map(n => n * 2)
    .reduce((a, b) => a + b, 0);`
            }
        ],
        task: "Practice creating and manipulating arrays and objects using various methods.",
        hint: "Use map() to transform, filter() to select, and reduce() to aggregate array data.",
        initialCode: `// Arrays
const fruits = ["apple", "banana", "cherry"];
console.log("First fruit:", fruits[0]);

// Objects
const person = {
    name: "John",
    age: 30
};
console.log("Name:", person.name);

// Try: Use map to double these numbers
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);`
    },
    "204": {
        title: "Coercion in JavaScript",
        subtopics: [
            {
                title: "Type Coercion Basics",
                content: `Type coercion is JavaScript's automatic conversion of values from one type to another.

Two Types of Coercion:

1. Implicit Coercion (Automatic)
JavaScript automatically converts types during operations.

"5" + 3       // "53" (number to string)
"5" - 3       // 2 (string to number)
"5" * "2"     // 10 (both to numbers)
true + 1      // 2 (boolean to number)

2. Explicit Coercion (Manual)
You deliberately convert types.

String(123)   // "123"
Number("456") // 456
Boolean(1)    // true

String Coercion:
• Any value + string = string
• String() function

Number Coercion:
• Arithmetic operators (except +)
• Number() function
• parseInt(), parseFloat()

Boolean Coercion:
• Logical operators
• Boolean() function`
            },
            {
                title: "Truthy and Falsy Values",
                content: `In JavaScript, values have inherent "truthiness":

Falsy Values (evaluate to false):
• false
• 0 and -0
• "" (empty string)
• null
• undefined
• NaN

Everything else is truthy!

Truthy Values Include:
• "0" (string with zero)
• "false" (string)
• [] (empty array)
• {} (empty object)
• function() {}

Practical Uses:

// Default values
const name = userName || "Guest";

// Conditional checks
if (items.length) {
    // Array has items
}

// Nullish coalescing (ES2020)
const value = input ?? "default";
// Only uses default for null/undefined

// Optional chaining
const street = user?.address?.street;`
            },
            {
                title: "Equality and Comparison",
                content: `Understanding == vs ===:

Loose Equality (==):
Performs type coercion before comparison.

5 == "5"     // true
0 == false   // true
null == undefined  // true
"" == false  // true

Strict Equality (===):
No type coercion, types must match.

5 === "5"    // false
0 === false  // false
null === undefined  // false

Best Practice: Always use === unless you specifically need type coercion.

Object Comparison:
Objects are compared by reference, not value!

const a = { x: 1 };
const b = { x: 1 };
const c = a;

a === b  // false (different references)
a === c  // true (same reference)

// To compare values:
JSON.stringify(a) === JSON.stringify(b) // true`
            }
        ],
        task: "Understand how JavaScript coerces types and the difference between == and ===.",
        hint: "Always use === for comparisons unless you specifically need type coercion with ==.",
        initialCode: `// Type Coercion Examples
console.log("5" + 3);    // String concatenation
console.log("5" - 3);    // Numeric subtraction
console.log("5" == 5);   // Loose equality
console.log("5" === 5);  // Strict equality

// Truthy/Falsy
console.log(Boolean(""));      // falsy
console.log(Boolean("hello")); // truthy
console.log(Boolean(0));       // falsy
console.log(Boolean([]));      // truthy (empty array!)`
    },
    "205": {
        title: "Scopes in JavaScript",
        subtopics: [
            {
                title: "Global and Local Scope",
                content: `Scope determines where variables are accessible:

Global Scope:
Variables declared outside any function/block.

var globalVar = "I'm global";
let globalLet = "Also global";

function test() {
    console.log(globalVar); // Accessible
}

Local/Function Scope:
Variables inside a function.

function myFunction() {
    var localVar = "I'm local";
    console.log(localVar); // Accessible
}
// console.log(localVar); // Error!

Variables are looked up through the scope chain:
• First, current scope
• Then, parent scope
• Continue up to global scope`
            },
            {
                title: "Block Scope (let and const)",
                content: `Block scope was introduced with let and const in ES6.

Block Scope:
Variables are only accessible within their block { }.

if (true) {
    let blockLet = "block scoped";
    const blockConst = "also block scoped";
    var notBlockScoped = "function scoped";
}

// console.log(blockLet);    // Error!
// console.log(blockConst);  // Error!
console.log(notBlockScoped); // Works! (var is not block scoped)

Loop Example:

for (let i = 0; i < 3; i++) {
    // i only exists here
}
// console.log(i); // Error!

for (var j = 0; j < 3; j++) {
    // j leaks out
}
console.log(j); // 3 (var is not block scoped)

This is why let and const are preferred over var.`
            },
            {
                title: "Hoisting",
                content: `Hoisting is JavaScript's behavior of moving declarations to the top.

Variable Hoisting:

console.log(myVar); // undefined (not error!)
var myVar = "Hello";

// Interpreted as:
var myVar;
console.log(myVar); // undefined
myVar = "Hello";

let/const are hoisted but NOT initialized:

console.log(myLet); // ReferenceError!
let myLet = "Hello";

This is called the "Temporal Dead Zone" - the time between hoisting and initialization.

Function Hoisting:

// Works! Functions are fully hoisted
sayHello();

function sayHello() {
    console.log("Hello!");
}

// But NOT function expressions:
// sayBye(); // Error!
const sayBye = function() {
    console.log("Bye!");
};

Best Practice: Declare variables at the top of their scope to avoid confusion.`
            }
        ],
        task: "Understand variable scoping and hoisting behavior in JavaScript.",
        hint: "Use let and const for block scoping. Remember that var is function-scoped and hoisted.",
        initialCode: `// Scope demonstration
let globalVar = "I'm global";

function testScope() {
    let localVar = "I'm local";
    console.log(globalVar);  // Can access global
    console.log(localVar);   // Can access local
}

testScope();
console.log(globalVar);  // Works
// console.log(localVar); // Would error!

// Block scope
if (true) {
    let blockVar = "Block scoped";
    console.log(blockVar);
}
// blockVar not accessible here`
    },
    "206": {
        title: "Higher Order Functions and Callbacks",
        subtopics: [
            {
                title: "What are Higher Order Functions?",
                content: `A Higher Order Function is a function that:
• Takes a function as an argument, OR
• Returns a function

JavaScript treats functions as "first-class citizens" - they can be:
• Assigned to variables
• Passed as arguments
• Returned from functions

Example - Function as Argument:

function greet(callback) {
    const name = "John";
    callback(name);
}

function sayHello(name) {
    console.log("Hello, " + name);
}

greet(sayHello); // "Hello, John"

Example - Function Returning Function:

function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15`
            },
            {
                title: "Callbacks in Depth",
                content: `A callback is a function passed as an argument to another function.

Synchronous Callbacks:
Execute immediately in order.

const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(num) {
    console.log(num);
});

// With arrow function
numbers.map(n => n * 2);

Asynchronous Callbacks:
Execute later, after some operation completes.

setTimeout(function() {
    console.log("Executed after 2 seconds");
}, 2000);

// File reading (Node.js example concept)
readFile("data.txt", function(error, data) {
    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Data:", data);
    }
});

Common Built-in Higher Order Functions:
• Array.prototype.map()
• Array.prototype.filter()
• Array.prototype.reduce()
• Array.prototype.forEach()
• Array.prototype.find()
• Array.prototype.sort()`
            },
            {
                title: "Callback Hell and Solutions",
                content: `Callback Hell occurs when you have many nested callbacks:

// Callback Hell Example
getUser(userId, function(user) {
    getOrders(user.id, function(orders) {
        getOrderDetails(orders[0].id, function(details) {
            getProductInfo(details.productId, function(product) {
                console.log(product);
            });
        });
    });
});

Problems:
• Hard to read (pyramid of doom)
• Difficult to maintain
• Error handling is messy

Solutions:

1. Named Functions
function handleUser(user) {
    getOrders(user.id, handleOrders);
}
function handleOrders(orders) {
    getOrderDetails(orders[0].id, handleDetails);
}
// etc.

2. Promises (covered in next lesson)
3. Async/Await (covered later)

These solutions make asynchronous code more readable and maintainable.`
            }
        ],
        task: "Practice creating and using higher order functions and callbacks.",
        hint: "Higher order functions either take functions as arguments or return functions.",
        initialCode: `// Higher Order Function Example
function operateOnArray(arr, operation) {
    const result = [];
    for (let item of arr) {
        result.push(operation(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];

// Pass a callback to double each number
const doubled = operateOnArray(numbers, n => n * 2);
console.log("Doubled:", doubled);

// Try: Create a callback to square each number
const squared = operateOnArray(numbers, n => n * n);
console.log("Squared:", squared);`
    },
    "207": {
        title: "Promises in JavaScript",
        subtopics: [
            {
                title: "Introduction to Promises",
                content: `A Promise represents a value that may be available now, later, or never.

Promise States:
• Pending - Initial state, not yet fulfilled or rejected
• Fulfilled - Operation completed successfully
• Rejected - Operation failed

Creating a Promise:

const myPromise = new Promise((resolve, reject) => {
    // Async operation
    const success = true;
    
    if (success) {
        resolve("Operation successful!");
    } else {
        reject("Operation failed!");
    }
});

Using Promises:

myPromise
    .then(result => {
        console.log(result); // Success handler
    })
    .catch(error => {
        console.log(error); // Error handler
    })
    .finally(() => {
        console.log("Always runs");
    });`
            },
            {
                title: "Promise Chaining",
                content: `Promises can be chained for sequential async operations:

fetch("/api/user")
    .then(response => response.json())
    .then(user => fetch("/api/posts/" + user.id))
    .then(response => response.json())
    .then(posts => {
        console.log("User posts:", posts);
    })
    .catch(error => {
        console.log("Error:", error);
    });

Key Points:
• Each .then() returns a new Promise
• Return values are passed to next .then()
• Errors propagate to the nearest .catch()
• .finally() always executes

Returning Values:

fetchUser()
    .then(user => {
        return user.id; // Passed to next then
    })
    .then(id => {
        console.log("User ID:", id);
    });

Returning Promises:

fetchUser()
    .then(user => {
        return fetchPosts(user.id); // Returns Promise
    })
    .then(posts => {
        console.log(posts);
    });`
            },
            {
                title: "Promise Utility Methods",
                content: `JavaScript provides utility methods for working with multiple Promises:

Promise.all():
Waits for ALL promises to resolve.

const promise1 = fetch("/api/users");
const promise2 = fetch("/api/posts");
const promise3 = fetch("/api/comments");

Promise.all([promise1, promise2, promise3])
    .then(([users, posts, comments]) => {
        console.log("All data received");
    })
    .catch(error => {
        console.log("One failed:", error);
    });

Promise.race():
Resolves with first settled promise.

Promise.race([slowApi(), fastApi()])
    .then(result => {
        console.log("First to complete:", result);
    });

Promise.allSettled():
Waits for all, regardless of success/failure.

Promise.allSettled([promise1, promise2])
    .then(results => {
        results.forEach(r => {
            console.log(r.status); // "fulfilled" or "rejected"
        });
    });

Promise.any():
Resolves with first successful promise.

Promise.resolve() / Promise.reject():
Create immediately resolved/rejected promises.

Promise.resolve("Instant value");
Promise.reject(new Error("Instant error"));`
            }
        ],
        task: "Understand and practice using Promises for handling asynchronous operations.",
        hint: "Use .then() for success, .catch() for errors, and chain promises for sequential operations.",
        initialCode: `// Creating a Promise
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

console.log("Starting...");

wait(1000)
    .then(() => {
        console.log("1 second passed");
        return wait(1000);
    })
    .then(() => {
        console.log("2 seconds passed");
    });

// Simulating API call
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ name: "John", age: 30 });
    }, 500);
});

fetchData().then(data => console.log("Data:", data));`
    },
    "208": {
        title: "Closures",
        subtopics: [
            {
                title: "Understanding Closures",
                content: `A closure is a function that remembers its outer scope even after the outer function has returned.

Basic Example:

function outer() {
    let count = 0; // Private variable
    
    return function inner() {
        count++;
        return count;
    };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

The inner function "closes over" the count variable, maintaining access to it even after outer() has finished executing.

Key Concepts:
• Functions create closure over their lexical scope
• Variables are not copied, they are referenced
• Each call to outer() creates a new closure`
            },
            {
                title: "Practical Use Cases",
                content: `Closures are used for:

1. Data Privacy / Encapsulation:

function createBankAccount(initial) {
    let balance = initial; // Private
    
    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) return "Insufficient funds";
            balance -= amount;
            return balance;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
account.deposit(50);  // 150
account.withdraw(30); // 120
// account.balance - undefined (private!)

2. Function Factories:

function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

3. Memoization:

function memoize(fn) {
    const cache = {};
    return function(arg) {
        if (cache[arg]) return cache[arg];
        cache[arg] = fn(arg);
        return cache[arg];
    };
}`
            },
            {
                title: "Common Closure Pitfalls",
                content: `Loop Closure Problem:

// Common mistake with var:
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // Prints 3, 3, 3
    }, 1000);
}

Why? By the time setTimeout runs, the loop has finished and i is 3.

Solutions:

1. Use let (block scope):
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // Prints 0, 1, 2
    }, 1000);
}

2. IIFE (Immediately Invoked Function Expression):
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j); // Prints 0, 1, 2
        }, 1000);
    })(i);
}

Memory Considerations:
• Closures keep references alive
• Can cause memory leaks if not careful
• Set closure references to null when done`
            }
        ],
        task: "Understand closures and how they maintain access to outer scope variables.",
        hint: "Closures remember variables from their creation context, even after the outer function returns.",
        initialCode: `// Closure Example - Counter
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1

// Try: Create a closure that tracks todo items
function createTodoList() {
    const todos = [];
    return {
        add: (item) => todos.push(item),
        getAll: () => [...todos],
        count: () => todos.length
    };
}`
    },
    "209": {
        title: "Iterators and Generators",
        subtopics: [
            {
                title: "Iterators",
                content: `An Iterator is an object that provides a way to access elements sequentially.

Iterator Protocol:
An object is an iterator when it implements a next() method that returns { value, done }.

function createIterator(array) {
    let index = 0;
    return {
        next: function() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            }
            return { value: undefined, done: true };
        }
    };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

Built-in Iterables:
• Arrays
• Strings
• Maps
• Sets

const str = "Hello";
const strIterator = str[Symbol.iterator]();`
            },
            {
                title: "Generators",
                content: `Generators are special functions that can pause and resume execution.

Syntax: Use function* and yield keyword.

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

Generators are Iterators:
You can use for...of with generators.

function* colors() {
    yield "red";
    yield "green";
    yield "blue";
}

for (const color of colors()) {
    console.log(color);
}

yield* delegates to another generator:

function* combined() {
    yield* [1, 2, 3];
    yield* [4, 5, 6];
}
// Produces: 1, 2, 3, 4, 5, 6`
            },
            {
                title: "Practical Generator Patterns",
                content: `Generators are useful for:

1. Infinite Sequences:

function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const numbers = infiniteSequence();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
// Can continue forever

2. ID Generator:

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const genId = idGenerator();
console.log(genId.next().value); // 1
console.log(genId.next().value); // 2

3. Lazy Evaluation:

function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5

4. Passing Values Back:

function* twoWay() {
    const x = yield "First";
    const y = yield "Second: " + x;
    return x + y;
}

const gen = twoWay();
console.log(gen.next());        // { value: "First", done: false }
console.log(gen.next(10));      // { value: "Second: 10", done: false }
console.log(gen.next(20));      // { value: 30, done: true }`
            }
        ],
        task: "Learn about iterators and generators for creating custom iteration behavior.",
        hint: "Use function* and yield to create generators. They're great for lazy evaluation and infinite sequences.",
        initialCode: `// Generator Example
function* countUp(limit) {
    for (let i = 1; i <= limit; i++) {
        yield i;
    }
}

const counter = countUp(5);
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2

// Using for...of
for (const num of countUp(3)) {
    console.log("For..of:", num);
}

// Try: Create a generator for even numbers`
    },
    "210": {
        title: "Async/Await",
        subtopics: [
            {
                title: "Introduction to Async/Await",
                content: `Async/Await is syntactic sugar over Promises, making async code look synchronous.

Async Functions:
Declared with async keyword, always return a Promise.

async function fetchData() {
    return "Hello"; // Automatically wrapped in Promise
}

fetchData().then(data => console.log(data)); // "Hello"

Await Keyword:
Pauses execution until Promise resolves.

async function getUser() {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user;
}

// Equivalent with Promises:
function getUser() {
    return fetch("/api/user")
        .then(response => response.json());
}

Await can only be used inside async functions (or at top-level in modules).`
            },
            {
                title: "Error Handling",
                content: `Use try/catch for error handling in async functions:

async function fetchData() {
    try {
        const response = await fetch("/api/data");
        
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error; // Re-throw if needed
    } finally {
        console.log("Fetch attempt completed");
    }
}

// Using the async function:
async function main() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.log("Error handled in main");
    }
}

// Or with .catch():
fetchData().catch(error => console.log(error));`
            },
            {
                title: "Parallel Execution",
                content: `Running async operations in parallel:

Sequential (slow):
async function sequential() {
    const user = await fetchUser();    // Wait
    const posts = await fetchPosts();  // Then wait
    const comments = await fetchComments(); // Then wait
    return { user, posts, comments };
}

Parallel (fast):
async function parallel() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(),
        fetchPosts(),
        fetchComments()
    ]);
    return { user, posts, comments };
}

Promise.all vs Sequential:
• Use sequential when operations depend on each other
• Use Promise.all when operations are independent

Handling errors with Promise.all:

async function safeParallel() {
    try {
        const results = await Promise.all([
            fetch("/api/a"),
            fetch("/api/b"),
            fetch("/api/c")
        ]);
        return results;
    } catch (error) {
        // One failure fails all
        console.log("At least one failed:", error);
    }
}

// For partial failures, use Promise.allSettled()
const results = await Promise.allSettled([...]);`
            },
            {
                title: "Advanced Patterns",
                content: `Async Iteration:

async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        await delay(1000);
        yield i;
    }
}

async function main() {
    for await (const num of asyncGenerator()) {
        console.log(num);
    }
}

Retry Pattern:

async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetch(url);
        } catch (error) {
            if (i === retries - 1) throw error;
            await delay(1000 * (i + 1)); // Exponential backoff
        }
    }
}

Concurrent with Limit:

async function processInBatches(items, batchSize = 3) {
    const results = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => processItem(item))
        );
        results.push(...batchResults);
    }
    return results;
}

Top-level await (ES2022):
In modules, you can use await at the top level.

// module.js
const data = await fetchData();
export default data;`
            }
        ],
        task: "Master async/await for writing clean asynchronous code.",
        hint: "Use async/await for readable async code. Use Promise.all() for parallel operations.",
        initialCode: `// Simulating async operations
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchUserData() {
    console.log("Fetching user...");
    await delay(1000);
    return { name: "John", id: 1 };
}

async function fetchPosts(userId) {
    console.log("Fetching posts for user", userId);
    await delay(1000);
    return ["Post 1", "Post 2", "Post 3"];
}

// Using async/await
async function main() {
    try {
        const user = await fetchUserData();
        console.log("User:", user);
        
        const posts = await fetchPosts(user.id);
        console.log("Posts:", posts);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();`
    }
};


