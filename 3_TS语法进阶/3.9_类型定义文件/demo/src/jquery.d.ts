// 定义全局变量
// declare var $: (params: () => void) => void;

// 定义全局函数 以及函数重载
// interface JQueryInstance {
//   html: (params: string) => JQueryInstance;
// }

// declare function $(readyFunc: () => void): void;
// declare function $(selector: string): JQueryInstance;

// // 利用命名空间 对 对象进行类型定义 以及对类进行类型定义，以及命名空间的嵌套

// declare namespace $ {
//   namespace fn {
//     class init {}
//   }
// }

// 利用interface 完成函数重载
// interface JQuery {
//   (readyFunc: () => void): void;
//   (selector: string): JQueryInstance;
// }

// declare var $: JQuery;

// ES6 模块化 声明模块

declare module "jquery" {
  interface JQueryInstance {
    html: (params: string) => JQueryInstance;
  }

  function $(readyFunc: () => void): void;
  function $(selector: string): JQueryInstance;
  function File(): void;

  // 利用命名空间 对 对象进行类型定义 以及对类进行类型定义，以及命名空间的嵌套

  namespace $ {
    namespace fn {
      class init {}
    }
  }

  export = $;
}
