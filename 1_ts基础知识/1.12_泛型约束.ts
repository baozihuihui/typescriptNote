function test<T extends object>(obj: T, key: keyof T) {
  return obj[key];
}

const testA = { a: "1", b: "2", c: "3" };

test(testA, "a");
// test(testA, "d"); // 会报错 testA 中没有 d 这个属性
