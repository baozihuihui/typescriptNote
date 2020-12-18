namespace class_simpledecorator {
  /**
   * 类的装饰器
   * 装饰器本质是一个函数
   * 装饰器使用 @ 进行标记
   * 类的装饰器 接收参数为类的构造器
   * 装饰器执行时间是类的创建事件，不是类被实例化的事件。
   * 装饰器的执行顺序与标记顺序相反，自下向上，自右向左进行执行
   */

  function testDecorator(constructor: any) {
    constructor.prototype.getName = () => {
      console.log("FattyCat");
    };
    console.log(`testDecorator`);
  }

  function testDecorator1(constructor: any) {
    console.log(`testDecorator1`);
  }

  /**
   * 装饰器可以是一个可执行的函数，可以接收参数，并返回一个新的函数作为装饰器
   * @param flag
   */
  function testDecorator2(flag: boolean) {
    if (flag) {
      return function (constructor: any) {
        console.log("testDecorator2");
      };
    } else {
      return () => {};
    }
  }

  @testDecorator2(true)
  @testDecorator1
  @testDecorator
  class Test {}

  const test = new Test();

  // (test as any).getName();
}
