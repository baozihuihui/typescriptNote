// 基础类型 number string boolean symbol void null undefined 
let a; // 数据类型此时为 any
a = 123 ;

// 对象类型 {} class [] function

// 对函数返回值进行声明
const b = (str:string):number =>{
    return parseInt(str,10)
}

// 对函数变量b2进行声明 （）=>void 本身就声明这个变量是一个函数
const b2:(str:string)=>number = (str)=>{
    return parseInt(str,10)
}

// 多类型
let c : number|string = 123;
c = '456';

// 类型断言 在已知某种类型下，强行制定类型 或者是在聚合类型下 强行制定当前变量类型
console.log((c as string).toLocaleLowerCase())

let d : number = 123;
console.log((d as unknown as string).toLocaleLowerCase())
