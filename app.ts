import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { adminRoutes, shopRoutes } from "./routes";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
