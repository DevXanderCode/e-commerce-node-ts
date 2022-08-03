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
}
exports.default = Product;
