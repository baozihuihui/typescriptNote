function test<T>(arg: T): T {
  return arg;
}

interface Test1 {
  <T>(arg: T): T;
}

interface Test2<T> {
  (arg: T): T;
}

let test1: Test1 = test;
let test2: Test2<number> = test;

test1("123"); // 不报错
// test2("123"); // 会报错
