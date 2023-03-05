"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_1 = require("express-validator/check");
// import rootDir from "../util/path";
const admin_1 = require("../controllers/admin");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
// /admin/add-product ==> Get
router.get("/add-product", middleware_1.isAuth, admin_1.getAddProduct);
// /admin/add-product ==> post
router.post("/add-product", [
    (0, check_1.body)("title")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Title should be more than 3 characters long")
        .trim(),
    // body("imageUrl").isURL().withMessage("Please enter a valid Image url."),
    (0, check_1.body)("price").isNumeric().withMessage("Please enter a valid price"),
    (0, check_1.body)("description")
        .isLength({ min: 5, max: 400 })
        .withMessage("Description should be a minimum of 5 characters and maximum of 400 characters")
        .trim(),
], middleware_1.isAuth, admin_1.postAddProduct);
// /admin/edit-product/:productId
router.get("/edit-product/:productId", middleware_1.isAuth, admin_1.getEditProduct);
//  /admin/products ==> Get
router.get("/products", middleware_1.isAuth, admin_1.getAdminProducts);
router.post("/edit-product", [
    (0, check_1.body)("title")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Title should be more than 3 characters long")
        .trim(),
    // body("imageUrl").isURL().withMessage("Please enter a valid Image url."),
    (0, check_1.body)("price").isNumeric().withMessage("Please enter a valid price"),
    (0, check_1.body)("description")
        .isLength({ min: 5, max: 400 })
        .withMessage("Description should be a minimum of 5 characters and maximum of 400 characters")
        .trim(),
], middleware_1.isAuth, admin_1.postEditProduct);
router.post("/delete-product", middleware_1.isAuth, admin_1.postDeleteProduct);
exports.default = router;
