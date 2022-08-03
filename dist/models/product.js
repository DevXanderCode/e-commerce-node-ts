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
        console.log("read File", fileContent, fileContent.length);
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
    constructor(t) {
        this.title = t;
    }
    save() {
        // products.push(this);
        // console.log("console log path", p);
        getProductsFromFile((products) => {
            products.push(this);
            fs_1.default.writeFile(p, JSON.stringify(products), (err) => {
                console.log("write product error", err);
            });
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
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
exports.default = Product;
