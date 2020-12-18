// getter setter => Proxy get\set代理
// get \ set 关键字声明的函数，在类的外部可以当成一个属性来获取 
console.log('-------------------------> set \ get ')
class Demo {

    constructor(private _name:string){}

    get name(){
        return this._name + '_byGetter'
    }

    set name(name:string){
        this._name = name.split('_')[0]
    }
}

const demo1 = new Demo('hengheng')
console.log(demo1.name)
demo1.name = 'haha_bySetter'
console.log(demo1.name)

console.log('-------------------------> static \ 单例模式 ')
// static 关键字 会讲对应内容挂在到类上，直接使用类来访问，而不是类的实例。 也就是构造函数的静态方法
// 实现单例模式
class Demo2{
    private static instace:Demo2
    private constructor (private _name:string){}
    static getInstance(){
        if(!this.instace){
            this.instace = new Demo2('single')
        }
        return this.instace
    }
    get name(){
        return this._name+'_byGetter'
    }

    set name(name:string){
         this._name = name+'_dirty'
    }
}

const demo2 = Demo2.getInstance()
const demo3 = Demo2.getInstance()
console.log(demo2 === demo3)
demo2.name='demo2'
console.log(demo3.name)

