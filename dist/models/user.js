"use strict";
// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
});
userSchema.methods.addToCart = function (product) {
    var _a, _b, _c, _d, _e;
    const cartProductIndex = (_b = (_a = this.cart) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.findIndex((cp) => (cp === null || cp === void 0 ? void 0 : cp.productId.toString()) === (product === null || product === void 0 ? void 0 : product._id.toString()));
    let newQuantity = 1;
    const updatedCartItems = [...(_c = this === null || this === void 0 ? void 0 : this.cart) === null || _c === void 0 ? void 0 : _c.items];
    if (cartProductIndex >= 0) {
        newQuantity = ((_e = (_d = this === null || this === void 0 ? void 0 : this.cart) === null || _d === void 0 ? void 0 : _d.items[cartProductIndex]) === null || _e === void 0 ? void 0 : _e.quantity) + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
        updatedCartItems.push({
            productId: product === null || product === void 0 ? void 0 : product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};
// userSchema.methods.getCart = function getCart() {
//   const productIds = this?.cart?.items.map((item: any) => item?.productId);
//   return Product.find({ _id: { $in: productIds } })
//     .populate("userId")
//     .then((products) => {
//       // console.log("Logging cart products", JSON.stringify(products, null, 2));
//       return products?.map((p) => {
//         console.log("Logging carts PRoducts", JSON.stringify(p, null, 2));
//         return {
//           ...p,
//           quantity: this.cart.items.find((i: any) => {
//             return i?.productId.toString() === p?._id?.toString();
//           }).quantity,
//         };
//       });
//     });
//   // .catch((err) => console.log("Logging get cart products error", err));
// };
exports.default = (0, mongoose_1.model)("User", userSchema);
