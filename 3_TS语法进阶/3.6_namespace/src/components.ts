namespace Components {
  // 包含 interface
  export interface User {
    name: string;
  }

  // 包含命名空间
  export namespace subComponents {
    export class Test {
      constructor() {
        console.log("subComponents test");
      }
    }
  }

  export class Header {
    constructor() {
      const element = document.createElement("div");
      element.innerHTML = "this is a header";
      document.body.append(element);
    }
  }
  export class Content {
    constructor() {
      const element = document.createElement("div");
      element.innerHTML = "this is a Content";
      document.body.append(element);
    }
  }
  export class Footer {
    constructor() {
      const element = document.createElement("div");
      element.innerHTML = "this is a Footer";
      document.body.append(element);
    }
  }
}
