import { Header, Content, Footer, User } from "./components";

const user: User = { name: "haha" };

export class Page {
  constructor() {
    console.log(user.name);
    new Header();
    new Content();
    new Footer();
  }
}
