Function.prototype.myBind = function (thisArg, ...bindArgs) {
  const originalFn = this;

  if (typeof originalFn !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  function boundFn(...callArgs) {
    
    const isNew = this instanceof boundFn;

    return originalFn.apply(
      isNew ? this : thisArg,
      [...bindArgs, ...callArgs]
    );
  }

  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype);
  }

  return boundFn;
};
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  return `${this.name}, ${this.age}`;
};

const binded = Person.myBind(null, "Alex");
const p = new binded(30);

console.log(p.say()); 
console.log(p instanceof Person); 
