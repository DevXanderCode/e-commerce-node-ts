"use strict";
// import fs from "fs";
// import path from "path";
Object.defineProperty(exports, "__esModule", { value: true });
// import rootDir from "../util/path";
// import { Product as ProductInterface } from "../types";
// import Product from "./product";
// const p = path.join(rootDir, "..", "data", "cart.json");
// const getProductsFromFile = (cb: Function) => {
//     fs.readFile(p, (err, fileContent) => {
//       // console.log("read File", fileContent, fileContent.length);
//       if (err) {
//         cb([]);
//       } else if (fileContent?.length > 0) {
//         cb(JSON.parse(fileContent?.toString()));
//       } else {
//         cb([]);
//       }
//     });
//   };
// class Cart {
//   static addProduct(id: string, productPrice: number) {
//     //Fetch previous product
//     fs.readFile(p, (err, fileContent) => {
//       let cart: { products: ProductInterface[]; totalPrice: number } = {
//         products: [],
//         totalPrice: 0,
//       };
//       if (!err) {
//         cart = JSON.parse(fileContent?.toString());
//       }
//       //Analyze the cart ==> find existing product
//       const existingProductIndex = cart.products.findIndex((prod) => prod?.id === id);
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct: ProductInterface;
//       //Add new product / increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty! += 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         Product.findById(id, (prod: ProductInterface) => {
//             updatedProduct = { ...prod,qty: 1 };
//             cart.products = [...cart.products, updatedProduct];
//             fs.writeFile(p, JSON.stringify(cart), (err) => {
//                 console.log('write cart error', err)
//               })
//         })
//       }
//      cart.totalPrice += productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log('write cart error', err)
//       })
//     });
//   }
//   static fetchAll(cb: Function) {
//     getProductsFromFile(cb);
//   }
//   static deleteProduct (id: string) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const cart = JSON.parse(fileContent.toString());
//       const updatedCart = {...cart};
//       const product = updatedCart.products.find((prod: ProductInterface) => prod?.id === id);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter((prod: ProductInterface) => prod.id !== id);
//       updatedCart.totalPrice = updatedCart.totalPrice - (product?.price * productQty);
//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log('write cart err', err)
//       })
//     })
//   }
// }
// export default Cart;
// import {
//   CreationOptional,
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
//   Model,
// } from "sequelize";
// import { Product } from "../types";
// import sequelize from "../util/database";
// class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
//   declare id: CreationOptional<number>;
// }
// Cart.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//   },
//   { sequelize, tableName: "cart" }
// );
class Cart {
}
exports.default = Cart;
