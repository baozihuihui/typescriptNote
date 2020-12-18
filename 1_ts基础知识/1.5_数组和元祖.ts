// 数组
// 基础类型数组
const numberArr = [1,2,3]
const numberAndStrArr :(number|string)[] = [1,'2',3]

// 对象数组
const objectArr : {name:string,age:number}[] = [{name:'haha',age:18}]
// 类型别名 type 
type objectType = {name:string,age:number}
const objectArr2 : objectType[] = [{name:'haha',age:18}]
class objectClass{
    name:string
    age:number
}
// 是一个类数组，但是ts采取鸭子校验，只要满足类声明的就可以
const objectArr3:objectClass[] = [
    new objectClass(),
    {name:'haha',age:18}
]

// 元组 tuple
const userInfo : [string,string,number] = ['firstName','secondName',18]
const userInfoList:[string,string,number][] = 
[
    ['a','b',18],
    ['a1','b1',18],
    ['a2','b2',18],
] 