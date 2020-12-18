// 泛型 generic 泛指的类型

function join(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}-${second}`;
  }
}

function join2<T>(first: T, second: T) {
  return `${first}-${second}`;
}

// join2(1,'2') // 会报错
join2("1", "2"); // return  1-2
join2(1, 2); // return 1-2

function map<T>(param: T[]) {
  return param;
}

// map<number>(["123"]); // 会报错 因为指定是一个 number数组

map<string>(["123"]); // return ['123']

function join3<T, P>(first: T, second: P) {
  return `${first}-${second}`;
}

// join3<string,number>(1,1) // 会报错，因为指定第一个参数的类型是 string
join3<string, number>("1", 2); // return 1-2
// 也可以利用类型推断，不在调用时声明泛型具体类型
join3("1", 2); // return 1-2
