/**
 * 装饰器的使用Demo
 */

const userInfo: any = undefined;
function catchError(errMsg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      try {
        fn();
      } catch (e) {
        console.log(errMsg);
        return errMsg;
      }
    };
  };
}

class Test {
  @catchError("userInfo 异常")
  getName() {
    return userInfo.name;
  }

  @catchError("userInfo 异常")
  getAge() {
    return userInfo.age;
  }
}

const test = new Test();

test.getName();
test.getAge();
