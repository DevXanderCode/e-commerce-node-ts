import path from "path";

import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
// import { create, engine } from "express-handlebars";

import { adminRoutes, shopRoutes } from "./routes";
import rootDir from "./util/path";
import { get404Page } from "./controllers/error";
// import ternary from "./util/helpers/ternary";

const app: Express = express();

// For handleBars
// app.engine(
//   "hbs",
//   engine({
//     extname: ".hbs",
//     helpers: { ternary },
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//   })
// );

// app.set("view engine", "pug");
// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
