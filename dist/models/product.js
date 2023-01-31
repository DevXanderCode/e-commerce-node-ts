"use strict";
// // import path from "path";
// // import fs from "fs";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    save() {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("products")
                .insertOne(this)
                .then((result) => console.log("Logging result", result))
                .catch((err) => console.log(err));
        }
        return Promise.resolve();
    }
}
exports.default = Product;
