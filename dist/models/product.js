"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("../util/path"));
// const products: ProductInterface[] = [];
const p = path_1.default.join(path_2.default, "..", "data", "products.json");
const getProductsFromFile = (cb) => {
    fs_1.default.readFile(p, (err, fileContent) => {
        // console.log("read File", fileContent, fileContent.length);
        if (err) {
            cb([]);
        }
        else if ((fileContent === null || fileContent === void 0 ? void 0 : fileContent.length) > 0) {
            cb(JSON.parse(fileContent === null || fileContent === void 0 ? void 0 : fileContent.toString()));
        }
        else {
            cb([]);
        }
    });
};
class Product {
    // id!: string;
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        // products.push(this);
        // console.log("console log path", p);
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => (prod === null || prod === void 0 ? void 0 : prod.id) === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs_1.default.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log("write product error", err);
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs_1.default.writeFile(p, JSON.stringify(products), (err) => {
                    console.log("write product error", err);
                });
            }
        });
        // fs.readFile(p, (err, fileContent) => {
        //   let products = [];
        //   if (!err) {
        //     products = JSON.parse(fileContent.toString());
        //   }
        //   products.push(this);
        //   fs.writeFile(p, JSON.stringify(products), (err) => {
        //     console.log("write product error", err);
        //   });
        // });
    }
    static delete(id, cb) {
        console.log('delete');
        getProductsFromFile((products) => {
            const updatedProduct = products.filter(prod => (prod === null || prod === void 0 ? void 0 : prod.id) !== id);
            fs_1.default.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                console.log("write product error", err);
                if (!err) {
                    cb();
                }
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(p => (p === null || p === void 0 ? void 0 : p.id) === id);
            cb(product);
        });
    }
}
exports.default = Product;
