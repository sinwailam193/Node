require("babel-polyfill");

if (process.env.NODE_ENV === "production") {
    require("./prod/index");
} else {
    require("babel-register");
    require("./src/index");
}
