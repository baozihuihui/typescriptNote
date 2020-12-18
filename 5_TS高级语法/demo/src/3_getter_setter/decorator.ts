namespace setergeter_decorator {
  /**
   * 访问器的装饰器
   * get/set 不能同时使用同一个访问起
   * get/set 中不能对 value 进行修改(简单理解 get/set 本身就是一个装饰器 已经定义了 get｜set )
   * 如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。
   * 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常。
   *
   * @param target 普通函数中对应 类的prototype
   *               静态函数中对应的是类的构造函数
   * @param key 函数的名字
   * @param descriptor 要定义或修改的属性描述符。
   *                   详情见 [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty]
   */
  function setDecorator(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("target", target);
    console.log("key", key);
  }

  class Test {
    constructor(private _name: string) {}
    get name() {
      return this._name;
    }

    @setDecorator
    set name(value: string) {
      this._name = value;
    }
  }

  const test = new Test("FattyCat");

  test.name = "FattyDog";

  console.log(test.name);
}
