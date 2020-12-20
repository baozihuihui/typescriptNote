// ! 表示 继承
function test<T extends object>(obj: T, key: keyof T) {
  return obj[key];
}

const testA = { a: "1", b: "2", c: "3" };

test(testA, "a");
// test(testA, "d"); // 会报错 testA 中没有 d 这个属性

// ! 类型推断条件语句

// 检查 A 与 B 是否相同
type IsEqualType<A, B> = A extends B ? (B extends A ? true : false) : false;

type NumberEqualsToString = IsEqualType<number, string>; // false
type NumberEqualsToNumber = IsEqualType<number, number>; // true

// !infer 表示在 extends 条件语句中待推断的类型变量(对推断变量的重命名)
// ? infer P 表示待推断的函数参数，
// ? 如果 T 能赋值给(param : infer p) => any, 则结果是(param: infer P) => any类型中的参数 P,否则为T
// ! 注意 这里的 T 是一个函数类型 有能推断的可能性，如果是普通类型就没有了

type ParamType<T> = T extends (param: infer p) => any ? p : T;

interface INealyang {
  name: "Nealyang";
  age: "25";
}

interface INealyang2 {
  (user: INealyang): any;
}

class Nealyang3 {
  constructor(user: INealyang) {}
}

type Func = (user: INealyang) => void;

type T_ParamType_1 = ParamType<Func>; // Param = INealyang
type T_ParamType_2 = ParamType<INealyang2>; // Param = INealyang
type T_ParamType_4 = ParamType<Nealyang3>; // Param = INealyang
type T_ParamType_5 = ParamType<string>; // string
