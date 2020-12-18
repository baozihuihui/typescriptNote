namespace class_decorator {
  /**
   * 通过直接接收构造器无法直接修改类上的属性。
   * 为类添加的函数，也不能在TS中得到正确的提示，且函数无法得到正确的this指针
   * @param constructor 构造器
   */
  function testDecorator1(constructor: any) {
    constructor.prototype.name1 = "FattyAnimal";
    constructor.prototype.getName = () => {
      console.log("FattyCat");
      // console.log(this.name); // 无法访问 this指针
    };
    console.log(`testDecorator`);
  }

  /**
   * 利用类的增强的装饰器
   * 返回一个类的派生子类，用于对Test的继承和修改
   * 可以为原类添加属性函数
   * 并可以对属性进行复制，且这个复制在原类构造器后执行，也就是属性会被派生子类进行覆盖
   * 但是仍不能解决 添加属性无法被识别的问题
   * @param constructor  一个可以被实例化的构造函数
   */
  function testDecorator2<T extends new (...args: any[]) => any>(
    constructor: T
  ) {
    return class extends constructor {
      private name = "FattyDog"; // 因为编译后 ts 代码没有 变量类型的概念，所以这个private与public 互相融合了
      private name2 = "FattyAnimal";
      getName() {
        return this.name;
      }
    };
  }

  // @testDecorator1
  // @testDecorator2
  // class Test {
  //   public name: string;
  //   constructor(name: string) {
  //     console.log(1);
  //     this.name = name;
  //     console.log(this.name);
  //     console.log(2);
  //   }
  // }
  // const test = new Test("FattyCat");
  // console.log(test.name2); // testDecorator2 仍然无法识别添加的属性
  // (test as any).getName(); // testDecorator 使用getName 方法

  /**
   * 通过函数调用返回一个新的类的装饰器
   * 这个装饰器仍然会覆盖基类属性，且最后执行
   * 但注意返回新的类 不能操作 私有属性 会导致 子类与父类出现属性冲突，导致属性不可访问
   * 注意 内部匿名函数只需要声明泛型和入参情况，出参是无法说明的，如果仍保持泛型，则还是会导致TS解释失败
   */
  function testDecorator3() {
    return function <T extends new (...args: any[]) => any>(constructor: T) {
      return class extends constructor {
        name = "FattyDog";
        name2 = "FattyAnimale";
        getName() {
          return this.name;
        }
      };
    };
  }

  const Test = testDecorator3()(
    class {
      name: string;
      constructor(name: string) {
        console.log(1);
        this.name = name;
        console.log(this.name);
        console.log(2);
      }
    }
  );

  const test = new Test("FattyCat");

  console.log(test);
  console.log(test.name);
  console.log(test.name2);
  console.log(test.getName());
}
