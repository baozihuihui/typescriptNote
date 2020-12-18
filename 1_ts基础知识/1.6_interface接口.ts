//  intserface
// interface 与 type 不同，type 是将某个类型定义一个别名，这个类型可以是一个基础类型，但是interface是一个集合。
//同时type可以通过&将多个interface进行聚合

// 函数类型
interface FunctionInteface {
  (src: string, sub: string): boolean;
}

let funcA: FunctionInteface;

funcA = (src: string, sub: string) => {
  let result = src.search(sub);
  return result > -1;
};

interface Person {
  name: string;
  readonly secondName?: string; // readonly 只读  ? 表示可能存在
  age: number;
  [propName: string]: any; // 未明确定义参数 变量存在未定义的属性和数据类型
}

interface Class {
  className: string;
}

// 声明一个函数接口
interface ReturnWord {
  (world: string): string;
}
// interface 的 继承 继承可以有多个 但是多个interface不能同名不同数据类型的属性
interface Teacher extends Person, Class {
  teach: ReturnWord; // 声明一个私有函数
}

// interface 的实现 implements 可以有多个 但是 实现的
class teacer1 implements Teacher {
  name = "houhou";
  className = "初一1班";
  age = 28;
  teach = (word: string) => {
    return word;
  };
}

class student implements Person, Class {
  name = "hahah";
  className = "初一1班";
  age = 18;
}

const printUserName: (person: Person) => void = (person) => {
  console.log(person.name);
};

const setUserName = (person: Person, name: string): void => {
  person.name = name;
};

const setUserSecondName = (person: Person, name: string): void => {
  //  person.secondName = '123'   会报错，提示这个字段是readonly
};

const person: Person = {
  name: "haha",
  age: 18,
  sex: "meal", // interface中未明确声明的属性
};

printUserName(person);
setUserName(person, "heihei");
