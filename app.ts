import path from "path";

import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { adminRoutes, shopRoutes } from "./routes";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
