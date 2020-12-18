namespace props_decorator {
  /**
   * 属性的访问器
   * 可以通过返回 descriptor 替换掉原属性的descriptor内容
   * 通过 target[key] 的方式无法修改实例上的属性，修改的是原型上的属性
   * @param target 原型
   * @param key    字段名称
   */

  function nameDecorator(target: any, key: string): any {
    console.log("target", target);
    console.log("key", key);
    let oldValue = "";
    const descriptor: PropertyDescriptor = {
      get: () => {
        return oldValue;
      },
      set: (newValue) => {
        oldValue = oldValue + "set" + newValue;
      },
    };
    return descriptor;
  }

  function nameDecorator2(target: any, key: string): any {
    target[key] = "FattyAnimal";
  }

  class Test {
    // @nameDecorator2
    @nameDecorator
    name = "FattyCat";

    constructor() {}
  }

  const test = new Test();

  test.name = "|";
  console.log(test.name);
  test.name = "|";
  console.log(test.name);

  // console.log((test as any).__proto__.name); // nameDecorator2 替换的实例原型上的属性

  // test.name = "FattyDog";
}
