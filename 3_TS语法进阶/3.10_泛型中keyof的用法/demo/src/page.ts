interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  constructor(private info: Person) {}
  /**
   * 原理： type NAME = "name"
   *       const a:NAME = "123" // 报错
   *       const a:NAME = "name" // 通过
   *       解释：
   *       通过指定类型是固定字符串，可以实现对值的约束
   *       keyof Person  相当于循环取出 Person 的key "name"|"age"|"gender"
   *       T extends keyof Person 等价于 T extendes "name"|"age"|"gender"
   *       也就是约束 T 的 值的 必须是以上三个字符串中的一个。
   * @param key
   */
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
  getInfo2<T extends "name" | "age" | "gender">(key: T): Person[T] {
    return this.info[key];
  }
}

const teacher = new Teacher({
  name: "FattyCat",
  age: 18,
  gender: "male",
});

const test = teacher.getInfo("name");
console.log(test);
const test2 = teacher.getInfo2("name");
console.log(test2);
