"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.get("/login", auth_1.getLogin);
router.get("/signup", auth_1.getSignup);
router.get("/reset", auth_1.getReset);
router.get("/reset/:token", auth_1.getNewPassword);
router.post("/login", auth_1.postLogin);
router.post("/signup", [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
        if (value === "test@test.com") {
            throw new Error("This email is forbidden");
        }
        return true;
    }),
    (0, express_validator_1.body)("password", "Please enter a password with at least 5 character and contains just numbers and letters")
        .isLength({ min: 5 })
        .isAlphanumeric(),
], auth_1.postSignup);
router.post("/reset", auth_1.postReset);
router.post("/new-password", auth_1.postNewPassword);
router.post("/logout", auth_1.postLogout);
exports.default = router;
