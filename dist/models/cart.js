"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("../util/path"));
const product_1 = __importDefault(require("./product"));
const p = path_1.default.join(path_2.default, "..", "data", "cart.json");
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
class Cart {
    static addProduct(id, productPrice) {
        //Fetch previous product
        fs_1.default.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0,
            };
            if (!err) {
                cart = JSON.parse(fileContent === null || fileContent === void 0 ? void 0 : fileContent.toString());
            }
            //Analyze the cart ==> find existing product
            const existingProductIndex = cart.products.findIndex((prod) => (prod === null || prod === void 0 ? void 0 : prod.id) === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = Object.assign({}, existingProduct);
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                product_1.default.findById(id, (prod) => {
                    updatedProduct = Object.assign(Object.assign({}, prod), { qty: 1 });
                    cart.products = [...cart.products, updatedProduct];
                    fs_1.default.writeFile(p, JSON.stringify(cart), (err) => {
                        console.log('write cart error', err);
                    });
                });
            }
            cart.totalPrice += productPrice;
            fs_1.default.writeFile(p, JSON.stringify(cart), (err) => {
                console.log('write cart error', err);
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
exports.default = Cart;
