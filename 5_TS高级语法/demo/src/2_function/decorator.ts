namespace function_decorator {
  /**
   * 函数的装饰器 仍然是一个函数
   * 装饰器的执行时间 是类创建的时间
   *
   * @param target 普通函数中对应 类的prototype
   *               静态函数中对应的是类的构造函数
   * @param key 函数的名字
   * @param descriptor 要定义或修改的属性描述符。
   *                   详情见 [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty]
   */
  function getNameDecorator(writable: boolean) {
    return function getNameDecorator(
      target: any,
      key: string,
      descriptor: PropertyDescriptor
    ) {
      console.log("target", target);
      console.log("key", key);
      descriptor.writable = writable;
    };
  }

  class Test {
    static name2: string = "FattyDog";
    constructor(private name: string) {}

    @getNameDecorator(true)
    static getName2() {
      return Test.name2;
    }

    @getNameDecorator(false)
    getName() {
      return this.name;
    }
  }

  const test = new Test("FattyCat");

  // 通过 descriptor 控制是否可以被修改
  // test.getName = () => {
  //   return Test.name2;
  // };

  // test.getName();

  Test.getName2 = () => {
    return "change statis getName2";
  };

  console.log(Test.getName2());
}
