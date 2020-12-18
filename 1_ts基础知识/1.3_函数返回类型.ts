// 函数返回类型
// 普通数据类型
function a(): number {
  return 123;
}
// void 函数不允许有返回值
function b(): void {
  console.log("23");
  // return 123  不允许返回数据 但是可以有单纯的 return 结束
}
// never 函数永远不会执行结束
function c(): never {
  throw new Error();

  // while(true){}
}
// 函数解构入参 变量声明
function d({ first, second }: { first: string; second: string }) {
  return first + second;
}
const dd = d({ first: "a", second: "b" });
