// 包含 interface
export interface User {
  name: string;
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
