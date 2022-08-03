"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = [];
class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        products.push(this);
    }
    static fetchAll() {
        return products;
    }
}
exports.default = Product;
