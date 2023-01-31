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
    static fetchAll() {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("products")
                .find()
                .toArray()
                .then((products) => {
                // console.log("Logging Products", products);
                return products;
            })
                .catch((err) => console.log("logging error", err));
        }
        return Promise.resolve();
    }
    static findById(prodId) {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            db.collection("products")
                .findOne({ _id: prodId })
                .then((product) => {
                console.log("single product", product);
                return product;
            })
                .catch((err) => console.log("Logging find by id error", err));
        }
        return Promise.resolve();
    }
}
exports.default = Product;
