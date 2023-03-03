"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const csurf_1 = __importDefault(require("csurf"));
const connect_flash_1 = __importDefault(require("connect-flash"));
// import { create, engine } from "express-handlebars";
const routes_1 = require("./routes");
const path_2 = __importDefault(require("./util/path"));
const error_1 = require("./controllers/error");
// import ternary from "./util/helpers/ternary";
// import sequelize from "./util/database";
const models_1 = require("./models");
dotenv.config();
const MONGODB_URI = "mongodb://localhost:27017/shop";
const app = (0, express_1.default)();
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});
const csrfProtection = (0, csurf_1.default)();
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
app.set("views", path_1.default.join(path_2.default, "..", "views"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use((0, express_session_1.default)({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
}));
app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use((req, _res, next) => {
    var _a, _b;
    if (!req.session.user) {
        return next();
    }
    models_1.User.findById((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)
        .then((userData) => {
        if (!userData) {
            return next();
        }
        req["user"] = userData;
        // new User(
        //   userData?.name,
        //   userData?.email,
        //   userData?.cart,
        //   userData?._id
        // );
        next();
    })
        .catch((err) => {
        console.log("Logging catch user error", err);
        next(new Error(err));
    });
});
app.use((0, connect_flash_1.default)());
app.use("/admin", routes_1.adminRoutes);
app.use(routes_1.shopRoutes);
app.use(routes_1.authRoutes);
app.get("/500", error_1.get500Page);
app.use(error_1.get404Page);
app.use((error, req, res, next) => {
    // res.redirect("/500");
    res.status(500).render("500", {
        pageTitle: "Error!",
        path: "/500",
        isAuthenticated: req.session.isLoggedIn,
    });
});
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
mongoose_1.default
    .connect(MONGODB_URI)
    .then((result) => {
    console.log("App Connected to Database");
    // User.findOne().then((usr) => {
    //   if (!usr) {
    //     const user = new User({
    //       name: "Alex",
    //       email: "DevXande@test.com",
    //       cart: { items: [] },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(3000, () => {
        console.log("Server listening at port 3000");
    });
})
    .catch((error) => {
    console.log("Database connection error", error);
});
