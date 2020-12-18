const enum Status {
  OFFLINE = 0,
  ONLINE = 1,
  DELETED = 2,
}

const StatusName: { [T in Status]: string } = {
  [Status.OFFLINE]: "不在线",
  [Status.ONLINE]: "在线",
  [Status.DELETED]: "已删除",
};

function getResult(status: Status) {
  if (status === Status.OFFLINE) {
    return "offline";
  } else if (status === Status.ONLINE) {
    return "online";
  } else if (status === Status.DELETED) {
    return "deleted";
  }
}

console.log(getResult(Status.OFFLINE));
