interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

function trainAnimal(animal: Bird | Dog) {
  // 断言 类型保护
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }

  // in 属性检测 类型保护
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// typeof 类型保护
function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}-${second}`;
  }
  return first + second;
}

class NumberObj {
  count: number;
}

// instanceof 类型保护
function add2(first: NumberObj | object, second: NumberObj | object) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
