var http = require("http");
var url = require("url");
var fs = require("fs");

function start(onRequest) {
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.\n");
  console.log("Pleace see http://localhost:8888");
}

start(function (req, res) {
  console.log("------------------------------------------>");
  console.time("Server");
  console.log("服务请求开始：");
  var pathname =
    url.parse(req.url).pathname === "/"
      ? "/targetHtml.html"
      : url.parse(req.url).pathname;

  console.log("pathname:", pathname);

  if (pathname.includes(".html")) {
    var pathname = __dirname + pathname;
    fs.readFile(pathname, (err, data) => {
      if (err) {
        console.log(err);
      }
      const html = data
        .toString()
        .replace("{{vue-replace-random}}", Math.floor(Math.random() * 100 + 1))
        .replace(
          "{{react-replace-random}}",
          Math.floor(Math.random() * 100 + 1)
        )
        .replace(
          "{{node-replace-random}}",
          Math.floor(Math.random() * 100 + 1)
        );

      res.write(html);
      res.end();
    });
  }

  console.timeEnd("Server");
  console.log("服务响应结束。");
  console.log("<------------------------------------------");
});
