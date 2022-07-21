import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  next();
});

app.use("/add-product", (req: Request, res: Response, next: NextFunction) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
  );
});

app.post("/product", (req: Request, res: Response, next: NextFunction) => {
  console.log("request body", req.body);
  res.redirect("/");
});

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Hello from Express js</h1>");
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
