import path from "path";

import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import mongoDbStore from "connect-mongodb-session";
// import { create, engine } from "express-handlebars";

import { adminRoutes, shopRoutes, authRoutes } from "./routes";
import rootDir from "./util/path";
import { get404Page } from "./controllers/error";
// import ternary from "./util/helpers/ternary";
// import sequelize from "./util/database";
import { User, Product, Order, OrderItem } from "./models";
import { UserRequest } from "./types";
import { mongoConnect } from "./util/database";

dotenv.config();

const MONGODB_URI = "mongodb://localhost:27017/shop";

const app: Express = express();
const MongoDBStore = mongoDbStore(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

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
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req: Request, _res: Response, next: NextFunction) => {
  User.findById(req.session?.user?._id)
    .then((userData: any) => {
      req["user"] = userData;
      // new User(
      //   userData?.name,
      //   userData?.email,
      //   userData?.cart,
      //   userData?._id
      // );

      next();
    })
    .catch((err) => console.log("Logging catch user error", err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404Page);

// Associations
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     // console.log("sequelize result", result);
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Alex", email: "test@test.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen("3000", () => {
//       console.log("Listening on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// mongoConnect(() => {
//   app.listen("3000", () => {
//     console.log("Listening on port 3000");
//   });
// });

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("App Connected to Database");
    User.findOne().then((usr) => {
      if (!usr) {
        const user = new User({
          name: "Alex",
          email: "DevXande@test.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000, () => {
      console.log("Server listening at port 3000");
    });
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });
