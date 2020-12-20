/**
 * 1、交叉类型 ( T & U )
 * 把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 **/

function mixin<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  // 将 first 的属性复制到 result
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  // 将 sccond 的属性复制到 result(过滤掉 已存在的属性)
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log("ConsoleLogger.log");
  }
}
var jim = mixin(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

/**
 * 2、联合类型
 * 一个变量可能会有多个属性 可以使用 x | y 进行表示
 */

function printValue(value: string | number): string {
  if (typeof value === "number") {
    return value + "";
  }
  return value;
}

/**
 * 3、类型保护 和 区分类型
 * 联合类型 在使用类型特性时，需要进行区分才能进行使用
 * 可以使用 类型判断 类型断言
 */

class Dog {
  dark() {}
}

class Bird {
  fly() {}
}

function getAnimale(): Dog | Bird {
  const result = null;
  return result as Dog | Bird;
}

const animal = getAnimale();

// 类型保护
// ? 1、 typeof 参见 联合类型 中判断方法

let numAndstr: number | string;
if (typeof numAndstr === "number") {
  numAndstr.toFixed(); // 这里会认为是一个数字
} else if (typeof numAndstr === "string") {
  numAndstr.includes("str"); // 这里会认为是一个字符串
}

// ? 2、 instanceof
if (animal instanceof Dog) {
  animal.dark(); // 可以调用
  // animal.fly() // 不能调用
}
// 类型断言
// ? 1、<T> 泛型约束
// (<Bird>animal).dark() // 不能调用
(<Bird>animal).fly(); //  可以调用
// ? 2、 as 断言
(animal as Dog).dark(); // as 断言
// (animal as Dog).Bird(); // 不能调用

/**
 * ? 特殊的 null|undefiend 类型 可以加 ! 后缀 进行断言
 * ? 可以从联合类型里去除了 null和 undefined
 */

function printValue3(value: string | undefined): string {
  return value!.charAt(0); // 如果需要测试 需要把 tsConfig strictNullChecks 打开
}

/**
 * 4、类型别名
 * 类型别名会给一个类型起个新名字。
 * ? 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
 * ? 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）
 **/
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
// 类型别名也可以是一个泛型
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
  name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

/**
 * 5、字符串字面量 数字字面量
 * 字符串字面量类型允许你指定字符串必须的固定值。
 * 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。
 * ? 通过结合使用这些特性，你可以实现类似枚举类型的字符串。
 * ? 还可以用于区分函数重载
 * ? keyof 实质就是 对象的 取出字面量
 **/
type Easing = "ease-in" | "ease-out" | "ease-in-out";
function print4(value: Easing);
function print4(value: string): string {
  return value;
}
print4("ease-in");
// print4("ease-beside") // 报错

/**
 * 6、可辨识联合类型
 * ? 属于高级类型类型推导
 **/

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
interface Triangle {
  kind: "circle";
  width: number;
}
// ? 一旦添加 Triangle 会导致area报错，是因为switch语法 TS 替我们做的完整性检查
// ! 还有其他方式比如将area返回类型 area(s:Shape):number
// type Shape = Square | Rectangle | Circle | Triangle;
type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}

/**
 * 8、索引类型
 * 使用索引类型，编译器就能够检查使用了动态属性名的代码。
 * 例如，一个常见的JavaScript模式是从对象中选取属性的子集。
 **/

// ? keyof Person是完全可以与 'name' | 'age'互相替换的。
// ? 第二个操作符是 T[K]， 索引访问操作符。 这意味着 person['name']具有类型 Person['name'] — 在我们的例子里则为 string类型。
// ? 简单理解就是 函数的返回值类型 是 第二个参数对应的属性的类型
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: "Jarid",
  age: 35,
};
let strings: string[] = pluck(person, ["name"]); // ok, string[]

/**
 * 9、映射类型(只能是type 才能进行这种操作)
 * 利用索引签名的方式将一个已知的类型每个属性都变为可选的或是只读的
 * 可以用 [key in keyof T]:string
 **/

interface UserInfo {
  name: string;
  age: number;
}

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadOnlyUserInfo = ReadOnly<UserInfo>;
