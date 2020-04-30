const EventEmitter = require("events");

// Create class
class Person extends EventEmitter {
  constructor(name) {
    super();
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

// Init object
const ken = new Person("Ken");

// Event listener
ken.on("name", (n, m) =>
  console.log(`My name is ${ken.name} and the sum is`, n + m)
);

// Init event
ken.emit("name", 2, 3);
