// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// 类的实现不能包含有 constructor的部分，因为构造器数据静态类型，会在检查中跳过，导致缺少一个new的实例部分的实现
// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) {}
// }

/**
 * 因此，我们应该直接操作类的静态部分。
 * 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。
 * 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。
 */

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(public h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
