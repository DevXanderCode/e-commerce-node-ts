import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

const router: Router = express.Router();

router.get(
  "/add-product",
  (req: Request, res: Response, next: NextFunction) => {
    res.send(
      "<form action='/product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    );
  }
);

router.post("/product", (req: Request, res: Response, next: NextFunction) => {
  console.log("request body", req.body);
  res.redirect("/");
});

export default router;
