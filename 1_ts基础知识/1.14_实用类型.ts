/**
 * ? T｜ U 表示类型(interface 或是 typeof class|Function)。keys 指字面量(如下面的 TypeBase，或者是 keyof T)
 * ! Exclude<Keys1, Keys2> -- 从 Keys1 中剔除可以赋值给 Keys1 的类型，并返回剩下的。
 * ! Extract<Keys1, Keys2> -- 获取 T 中可以赋值给 U 的类型。
 * ! NonNullable<Keys> -- 从 T 中剔除 null 和 undefined，并返回剩下的。
 * ! ReturnType<T entends Function> -- 获取 函数返回值 对应 类型。
 * ! InstanceType<T> -- 获取构造函数类型的实例类型(基础类型 string | number | boolean | Function 都不行，因为没有构造函数)。
 * ! Partial<T> -- 将 T 中属性变为 可能存在
 * ! Readonly<T> -- 将 T 中属性变为只读
 * ! Record<Keys,T> -- 将 keys 对应的的类型变为 T
 * ! Pick<T, Keys extends keyof T> -- 从 T 中选出 属性 K 构造类型
 * ! Omit<T, Keys extends keyof T> -- 从 T 中去除 key 中 对应名称的属性
 * ! Parameters<T entends Function> -- 获取 函数类型T的 入参 对应类型构成的元组
 * ! ConstructorParameters<T extends new ()=>any > -- 获取 构造函数类型中(简单理解 class的constructor) 入参 对应类型构成的元组
 * ! Required<T>  -- 类型 T 中 所有属性变为 必填
 * ! ThisParameterType<T entends Function> --  提取函数类型的this参数的类型，如果函数类型没有this参数，则提取此参数的类型。
 * ?! OmitThisParameter<T entends Function> --
 * ?! ThisType<Type> --
 **/

type TypeBase = "a" | "b" | "c" | "d";
interface InterfaceBase {
  name: string;
  age: number;
  address?: string;
}
function f1(s: string) {
  return { a: 1, b: s };
}

function toHex(this: Number) {
  return this.toString(16);
}

class C {
  x = 0;
  y = 0;
  constructor(private value: InterfaceBase) {}
}

// 以下为演示说明
type T_Exclude = Exclude<TypeBase, "a" | "b" | "c">; // "b" | "d"
type T_Extract = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"

type T_Exclude_2 = Exclude<string | number | (() => void), Function>; // string | number
type T_Extract_2 = Extract<string | number | (() => void), Function>; // () => void

type T_NonNullable = NonNullable<string | number | undefined>; // string | number
type T_NonNullable_2 = NonNullable<
  (() => string) | string[] | null | undefined
>; // (() => string) | string[]

type T_ReturnType = ReturnType<() => string>; // string
type T_ReturnType_2 = ReturnType<(s: string) => void>; // void
type T_ReturnType_3 = ReturnType<<T>() => T>; // {}
type T_ReturnType_4 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T_ReturnType_5 = ReturnType<typeof f1>; // { a: number, b: string }
type T_ReturnType_6 = ReturnType<any>; // any
type T_ReturnType_7 = ReturnType<never>; // any
// type T17 = ReturnType<string>; // Error
// type T18 = ReturnType<Function>; // Error

type T_InstanceType = InstanceType<typeof C>; // C
type T_InstanceType_2 = InstanceType<any>; // any
type T_InstanceType_3 = InstanceType<never>; // any

// type T23 = InstanceType<string>; // Error
type T1T_InstanceType_4 = InstanceType<new () => string>; // Error
// type T23 = InstanceType<number>; // Error
// type T24 = InstanceType<Function>; // Error

type T_Partial = Partial<InterfaceBase>; // T24?.name
const T_Partial_user: T_Partial = { age: 1 }; // no name

type T_Readonly = Readonly<InterfaceBase>; // T25.name = 16  is error
const T_Readonly_user: T_Readonly = { name: "FattyCat", age: 1 };
// user2.name = 'FattyDog' // 无法分配到 "name" ，因为它是只读属性。

type T_Record = Record<TypeBase, InterfaceBase>;
type T_Record_2 = Record<keyof InterfaceBase, TypeBase>; //  InterfaceBase 没有 symbol  不能作为 keys

type T_Pick = Pick<InterfaceBase, Exclude<keyof InterfaceBase, "name">>; // { age:number }
const T_Pick_user: T_Pick = { age: 1 };

type T_Omit = Omit<InterfaceBase, Exclude<keyof InterfaceBase, "name">>; // { name:string }
const T_Omit_user: T_Omit = { name: "FattyCat" };

type T_Parameters = Parameters<typeof f1>; // [s:string]

type T_ConstructorParameters = ConstructorParameters<typeof C>; // [value: InterfaceBase]
type T_ConstructorParameters_2 = ConstructorParameters<any>; // unknown[]

type T_Required = Required<InterfaceBase>;
const T_Required_user: T_Required = {
  name: "FattyCat",
  age: 1,
  address: "xxx",
}; // address change to requires

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());
