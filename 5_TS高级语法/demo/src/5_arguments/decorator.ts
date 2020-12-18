namespace arguments_decorator {
  /**
   * 参数装饰器
   * @param target  函数所在类的原型
   * @param methodName     方法明层
   * @param paramIndex  参数在入参的顺序
   */
  function paramsDecorator(
    target: any,
    methodName: string,
    paramIndex: number
  ) {
    console.log("target->", target);
    console.log("methodName->", methodName);
    console.log("paramIndex->", paramIndex);
    console.log(target.parseInfo);
  }

  class Test {
    parseInfo(@paramsDecorator name: string, age: number) {
      console.log(name + "-" + age);
    }
  }

  const test = new Test();
  test.parseInfo("FattyCat", 30);
}
