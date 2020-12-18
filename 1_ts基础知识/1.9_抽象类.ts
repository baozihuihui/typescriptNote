// class 中 readonly
// 提供一个只读的类属性
//  1、利用 private 和 get
class Demo {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
}

// 2、利用 readonly
class Demo2 {
  public readonly name: string;
  constructor(name) {
    this.name = name;
  }
}

const demo1 = new Demo("heihei");
console.log(demo1);
// demo1.name = 'haha' // 会报错

const demo2 = new Demo2("haha");
console.log(demo2.name);
// demo2.name = 'heihei' // 会报错

//  抽象类 抽象类无法被实例化 只能被继承
abstract class Demo3 {
  private id: string;
  width: number; // 抽象类可以有自己的属性
  // 也可以有具体的实现
  getId() {
    if (!this.id) {
      this.id = Math.random().toString(36).substr(0, 7);
    }
    return this.id;
  }
  // 也可以有抽象函数约束子类必须实现对应方法
  abstract getArea(): number;
}

class Demo4 extends Demo3 {
  constructor(width: number) {
    super();
    this.width = width;
  }
  getArea() {
    return this.width ** 2;
  }
}

class Demo5 extends Demo3 {
  constructor(width: number) {
    super();
    this.width = width;
  }
  getArea() {
    return Math.PI * this.width ** 2;
  }
}

console.log("---- new Demo4");
const demo4 = new Demo4(4);
console.log(demo4.getId());
console.log(demo4.getArea());
console.log(demo4.getId());

console.log("---- new Demo5");
const demo5 = new Demo5(4);
console.log(demo5.getId());
console.log(demo5.getArea());
console.log(demo5.getId());
