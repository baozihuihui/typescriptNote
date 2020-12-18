/// <reference path="./components.ts"/>
namespace Home {
  const user: Components.User = { name: "haha" };

  export class Page {
    constructor() {
      new Components.subComponents.Test();
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
