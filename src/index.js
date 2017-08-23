import express from "express";
import { createWriteStream } from "fs";
import morgan from "morgan";
import favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";

import routes from "./routes/main";

const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV;
const app = express();

let directory = __dirname.replace("/src", "");
if (process.env.NODE_ENV === "production") {
    directory = __dirname.replace("/prod", "");
}

app.use(favicon(`${directory}/public/node.jpeg`));
if (env === "production") {
    app.use(morgan("common", {
        skip: (req, res) => res.statusCode < 400,
        stream: createWriteStream(
            `${__dirname.slice(0, __dirname.indexOf("prod"))}morgan.log`,
            { flags: "a" }
        )
    }));
} else {
    app.use(morgan("dev"));
}
app.use(json({ type: "*/*" }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (env === "dev") {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`)); // eslint-disable-line

module.exports = app;
