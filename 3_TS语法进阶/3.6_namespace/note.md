# namespace

## 作用

用于代码分割，防止变量污染

## 示例

```language=typescript
namespace User{
    // 需要暴露的 interface
    export interface UserType{
        name:string
    }

    // 不想暴露的类
    class User<T extends UserType >{
        constructor(private user:T){
            conosle.log('Home->User')
        }
        show(){
            console.log(this.user.name)
        }
    }

    // 需要被外部引用的类 前边需要加 exports
    export function showA(user:UserType){
        const user = new User(user);
        user.show();
    }
}
```

## 多文件整合

每个文件对应一个模块，那个模块间互相引用就变成了命名空间的引用。
可以通过以下方式展示依赖，但是并没有代码级别的作用。

```language=typescript
/// \<reference path="./components.ts"/>
```

### Demo1

**_user.ts_**

```language=typescript
namespace User{
    // 需要暴露的 interface
    export interface UserType{
        name:string
    }

    // 不想暴露的类
    class User<T extends UserType >{
        constructor(private user:T){
            conosle.log('Home->User')
        }
        show(){
            console.log(this.user.name)
        }
    }

    // 需要被外部引用的类 前边需要加 exports
    export function showUser(user:UserType){
        const user = new User(user);
        user.show();
    }
}
```

**_home.ts_**

```language=typescript
/// \<reference path="./user.ts"/>
namespace Home{
    export class Home(){
        constructor(){
        const user:User.UserType = { name:'FattyCat' };
        User.showUser(user);
        }
    }
}
```

## 别名

另一种简化命名空间操作的方法是使用 import q = x.y.z 给常用的对象起一个短的名字。

**不要与用来加载模块的 import x = require('name')语法弄混了，这里的语法是为指定的符号创建一个别名。**

你可以用这种方法为任意标识符创建别名，也包括导入的模块中的对象。

### Demo2

```labguage=typescript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
```
