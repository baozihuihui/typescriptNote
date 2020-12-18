"use strict";
var Components;
(function (Components) {
    // 包含命名空间
    var subComponents;
    (function (subComponents) {
        var Test = /** @class */ (function () {
            function Test() {
                console.log("subComponents test");
            }
            return Test;
        }());
        subComponents.Test = Test;
    })(subComponents = Components.subComponents || (Components.subComponents = {}));
    var Header = /** @class */ (function () {
        function Header() {
            var element = document.createElement("div");
            element.innerHTML = "this is a header";
            document.body.append(element);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var element = document.createElement("div");
            element.innerHTML = "this is a Content";
            document.body.append(element);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var element = document.createElement("div");
            element.innerHTML = "this is a Footer";
            document.body.append(element);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
/// <reference path="./components.ts"/>
var Home;
(function (Home) {
    var user = { name: "haha" };
    var Page = /** @class */ (function () {
        function Page() {
            new Components.subComponents.Test();
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
