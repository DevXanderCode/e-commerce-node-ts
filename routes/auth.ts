import { Router } from "express";
import { check, body } from "express-validator";
import {
  getLogin,
  getNewPassword,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postNewPassword,
  postReset,
  postSignup,
} from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.get("/reset", getReset);

router.get("/reset/:token", getNewPassword);

router.post("/login", postLogin);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email is forbidden");
        }
        return true;
      }),
    body(
      "password",
      "Please enter a password with at least 5 character and contains just numbers and letters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  postSignup
);

router.post("/reset", postReset);

router.post("/new-password", postNewPassword);

router.post("/logout", postLogout);

export default router;
