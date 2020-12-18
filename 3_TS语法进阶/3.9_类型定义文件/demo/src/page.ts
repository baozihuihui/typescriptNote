import $ from "jquery";

$(() => {
  // 函数定义
  $("body").html("<div>123</div>");

  // 类的定义 以及类的嵌套
  new $.fn.init();
});
