// import path from "path";

import express, { Router } from "express";

// import rootDir from "../util/path";
// import adminData from "./admin";
import { getProducts } from "../controllers/products";

const router: Router = express.Router();

router.get("/", getProducts);

export default router;
