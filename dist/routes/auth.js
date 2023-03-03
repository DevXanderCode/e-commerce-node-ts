"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("../controllers/auth");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get("/login", auth_1.getLogin);
router.get("/signup", auth_1.getSignup);
router.get("/reset", auth_1.getReset);
router.get("/reset/:token", auth_1.getNewPassword);
router.post("/login", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
        return models_1.User.findOne({ email: value }).then((userDoc) => {
            if (!userDoc) {
                return Promise.reject("Invalid email");
            }
            return true;
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .custom((value, { req }) => {
        return models_1.User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                return (0, bcryptjs_1.compare)(value, user === null || user === void 0 ? void 0 : user.password).then((doMatch) => {
                    if (!doMatch) {
                        return Promise.reject("Invalid Password");
                    }
                    return true;
                });
            }
            return true;
        });
    })
        .trim(),
], auth_1.postLogin);
router.post("/signup", [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email is forbidden");
        // }
        // return true;
        return models_1.User.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
                return Promise.reject("E-Mail exist already, please pick a different one.");
            }
            return true;
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password", "Please enter a password with at least 5 character and contains just numbers and letters")
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
    (0, express_validator_1.body)("confirmPassword")
        .trim()
        .custom((value, { req }) => {
        var _a;
        if (value !== ((_a = req.body) === null || _a === void 0 ? void 0 : _a.password)) {
            throw new Error("Passwords have to match");
        }
        return true;
    }),
], auth_1.postSignup);
router.post("/reset", auth_1.postReset);
router.post("/new-password", auth_1.postNewPassword);
router.post("/logout", auth_1.postLogout);
exports.default = router;
