interface Item {
  name: string;
}

// 利用 extends 对 泛型进行约束
class DataManager<T extends Item> {
  constructor(private data: T[]) {}
  getItem(index: number) {
    return this.data[index].name;
  }
}

const sourceData: Item[] = [
  { name: "haha" },
  { name: "hehe" },
  { name: "哼哼" },
];

const data = new DataManager(sourceData);

console.log(data.getItem(1));
