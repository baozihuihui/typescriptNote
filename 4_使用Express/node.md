# 使用 Express

## 问题

### express 的类型定义文件不准确，.d.ts 提供的类型无法进行错误提示

通过 interface 继承可以解决

```language="typescript"

import { Router, Request, Response } from "express";

// 继承 解决 express 声明文件描述不准确的问题
interface ReauestForGetData extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

router.post("/getData", (req: ReauestForGetData, res: Response) => {
  if (req.body.password === "123") {
    const tSDemoAnalyzer = TSDemoAnalyzer.getInstace();
    new Crowller(localTagrgetUrl, tSDemoAnalyzer);
    res.end("getData success !");
  } else {
    res.end("password error !");
  }
});

```

### 使用中间件后，中间件对于参数的变更，没有对应类型文件进行描述

通过 类型融合 继承可以解决

`custom.d.ts`

```language="typescript"
// 进行类型融合
namespace Express {
  interface Request {
    name: string;
  }
}
```

`index.ts`

```language="typescript"
// 自定义中间件 添加新属性
app.use((req: Request, res: Response, next: NextFunction) => {
  req.name = "FattyCat";
  next();
});
```

`router.ts`

```language="typescript"

router.post("/getData", (req: ReauestForGetData, res: Response) => {
  if (req.body.password === "123") {
    const tSDemoAnalyzer = TSDemoAnalyzer.getInstace();
    new Crowller(localTagrgetUrl, tSDemoAnalyzer);
    res.end("getData success !");
  } else {
      // 可以在这里直接调用到
    res.end(`${req.name} password error !`);
  }
});

```
