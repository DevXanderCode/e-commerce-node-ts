import path from "path";

import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
// import { create, engine } from "express-handlebars";

import { adminRoutes, shopRoutes } from "./routes";
import rootDir from "./util/path";
import { get404Page } from "./controllers/error";
// import ternary from "./util/helpers/ternary";
import sequelize from "./util/database";
import { User, Product } from "./models";
import { UserRequest } from "./types";

dotenv.config();

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
// app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req: UserRequest, _res: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user!;
      next();
    })
    .catch((err) => console.log("Logging catch user error", err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    // console.log("sequelize result", result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Alex", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen("3000", () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
