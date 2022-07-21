import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { adminRoutes, shopRoutes } from "./routes";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
