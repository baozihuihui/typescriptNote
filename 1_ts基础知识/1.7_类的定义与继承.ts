console.log('类 定义与继承 ------------------->')
// 类的定义与继承
class Person {
    name = 'haha'
    getName(){
        return this.name
    }
}

// 类的继承
class Teacher extends Person{
    // 构造函数 初始化 super() 必须第一个调用
    constructor(name:string){
        super()
        this.name = name
    }

    getTeacherName = ()=>{
        return 'heihei'
    }

    // 重写 利用super 关键字进行重写
    getName(){
        return super.getName()+' houhou';
    }
}

const teacher = new Teacher('hehe')
console.log(teacher.getName())
console.log(teacher.getTeacherName())

const person = new Person()
console.log(person.getName())

console.log('类 属性的访问类型 ------------------->')

// 类 属性的访问类型 
// public   不声明默认公有，在类的内部外部都可以被调用
// protected 只能在类的内部 和 继承的子类中调用
// private 只能在声明类的内部进行调用

class Test{
    public name = 'haha'
    public getName(){
        return this.name
    }
    protected name2 = 'hehe'
    public getName2ByPublic(){
        return this.name2
    }
    protected getName2ByProdeted(){
        return this.name2
    }
    private name3 = 'hengheng'
    public getName3ByPublic(){
        return this.getName3ByPrivate()
    }
    // 无法无法被外部使用，只能通过publci或者private方法反馈出去 但是私有变量一般不应该暴露出去
    private getName3ByPrivate(){
        return this.name3
    }

}

class Test2 extends Test{
    getName2(){
      return  this.getName2ByProdeted()
    }
    getName3(){
        // 报错 无法被访问
        // this.getName3ByPrivate()
      return   this.getName3ByPublic()
    }
}

const test2 = new Test2()
console.log(test2.getName2())
console.log(test2.getName3())

console.log('类 构造器 ------------------->')
class Test3 {
    //  传统写法
    // public name:string
    // constructor(name:string){
    //     this.name = name
    // }
    //  简化写法 直接将访问类型带上，可直接定义到类的属性上
    constructor(public name:string){}
}

const test3 = new Test3('haha')
console.log(test3.name)

class Test4 extends Test3{
    // 子类继承父类 一旦出现 constructor 第一句必须是对 super() ，调用父累构造器
    constructor(name:string,public age:number){
        super(name)
    }
}

const test4 = new Test4('hehe',18)
console.log(test4.name)
console.log(test4.age) 