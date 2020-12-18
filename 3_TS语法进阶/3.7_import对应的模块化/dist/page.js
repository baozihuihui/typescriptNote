define("components", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Footer = exports.Content = exports.Header = void 0;
    var Header = /** @class */ (function () {
        function Header() {
            var element = document.createElement("div");
            element.innerHTML = "this is a header";
            document.body.append(element);
        }
        return Header;
    }());
    exports.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var element = document.createElement("div");
            element.innerHTML = "this is a Content";
            document.body.append(element);
        }
        return Content;
    }());
    exports.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var element = document.createElement("div");
            element.innerHTML = "this is a Footer";
            document.body.append(element);
        }
        return Footer;
    }());
    exports.Footer = Footer;
});
define("page", ["require", "exports", "components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Page = void 0;
    var user = { name: "haha" };
    var Page = /** @class */ (function () {
        function Page() {
            console.log(user.name);
            new components_1.Header();
            new components_1.Content();
            new components_1.Footer();
        }
        return Page;
    }());
    exports.Page = Page;
});
