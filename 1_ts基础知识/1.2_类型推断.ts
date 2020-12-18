// 类型注解 显示声明变量类型
const a :number = 123;

// 类型推断 不直接声明变量类型，TS会自动推断变量类型
const b = 1;
function add (a:number,b:number){
    return a+b
}
const c = add(a,b)