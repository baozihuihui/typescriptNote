# tsconfig.json 说明

[官方地址](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

如果一个目录下存在一个 tsconfig.json 文件，那么它意味着这个目录是 TypeScript 项目的根目录。 tsconfig.json 文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式来编译：

## 使用 tsconfig.json

- 不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，逐级向上搜索父目录。
- 不带任何输入文件的情况下调用 tsc，且使用命令行参数--project（或-p）指定一个包含 tsconfig.json 文件的目录。

**当命令行上指定了输入文件时，tsconfig.json 文件会被忽略。**

### files

files 指定一个包含相对或绝对文件路径的列表

```language=json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ]
}
```

### include 和 exclude

属性指定一个文件 glob 匹配模式列表。 支持的 glob 通配符有：

- \* 匹配 0 或多个字符（不包括目录分隔符）
- ? 匹配一个任意字符（不包括目录分隔符）
- \*\*/ 递归匹配任意子目录

```language=json
{
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

如果一个 glob 模式里的某部分只包含*或.*，那么仅有支持的文件扩展名类型被包含在内（比如默认.ts，.tsx，和.d.ts， 如果 allowJs 设置能 true 还包含.js 和.jsx）

**_使用 "outDir"指定的目录下的文件永远会被编译器排除，除非你明确地使用"files"将其包含进来（这时就算用 exclude 指定也没用）。_**

**_使用"include"引入的文件可以使用"exclude"属性过滤。 然而，通过 "files"属性明确指定的文件却总是会被包含在内，不管"exclude"如何设置。_** 如果没有特殊指定， "exclude"默认情况下会排除 node_modules，bower_components，jspm_packages 和\<outDir\>目录。

任何被"files"或"include"指定的文件所引用的文件也会被包含进来。 A.ts 引用了 B.ts，因此 B.ts 不能被排除，除非引用它的 A.ts 在"exclude"列表中。

需要注意编译器不会去引入那些可能做为输出的文件；比如，假设我们包含了 index.ts，那么 index.d.ts 和 index.js 会被排除在外。 通常来讲，不推荐只有扩展名的不同来区分同目录下的文件。

tsconfig.json 文件可以是个空文件，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

**在命令行上指定的编译选项会覆盖在 tsconfig.json 文件里的相应选项。**

### compilerOptions

编译说明，可以忽略，为空会使用默认配置

[官方地址](https://www.tslang.cn/docs/handbook/compiler-options.html)

#### @types，typeRoots 和 types

**_注意，自动引入只在你使用了全局的声明（相反于模块）时是重要的。 如果你使用 import "foo"语句，TypeScript 仍然会查找 node_modules 和 node_modules/@types 文件夹来获取 foo 包。_**

默认所有可见的"@types"包会在编译过程中被包含进来。 node_modules/@types 文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说， ./node_modules/@types/，../node_modules/@types/和../../node_modules/@types/等等。

**如果指定了 typeRoots，只有 typeRoots 下面的包才会被包含进来。**

```language=json
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```

这个配置文件会包含所有./typings 下面的包，而不包含./node_modules/@types 里面的包。

**如果指定了 types，只有被列出来的包才会被包含进来。**

```language=json
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```

这个 tsconfig.json 文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash 和./node_modules/@types/express。/@types/。 node_modules/@types/\*里面的其它包不会被引入进来。

指定"types": []来禁用自动引入@types 包。
