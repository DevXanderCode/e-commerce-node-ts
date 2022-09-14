// // import path from "path";
// // import fs from "fs";

// import Cart from "./cart";
// import rootDir from "../util/path";
import { Product as ProductInterface } from "../types";
// import db from "../util/database";

// // const products: ProductInterface[] = [];

// // const p = path.join(rootDir, "..", "data", "products.json");

// // const getProductsFromFile = (cb: Function) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     // console.log("read File", fileContent, fileContent.length);
// //     if (err) {
// //       cb([]);
// //     } else if (fileContent?.length > 0) {
// //       cb(JSON.parse(fileContent?.toString()));
// //     } else {
// //       cb([]);
// //     }
// //   });
// // };

// class Product {
//   constructor(
//     public id: string,
//     public title: string,j
//     public imageUrl: string,
//     public description: string,
//     public price: number
//   ) {}

//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static deleteById(id: string) {}

//   static findById(id: string) {
//     return db.execute("SELECT * FROM products WHERE id = ?", [id]);
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   // old methods

//   // save() {
//   //   // products.push(this);
//   //   // console.log("console log path", p);

//   //   getProductsFromFile((products: ProductInterface[]) => {

//   //   if (this.id){
//   //     const existingProductIndex = products.findIndex(prod => prod?.id === this.id);
//   //     const updatedProduct = [...products];
//   //     updatedProduct[existingProductIndex] = this;
//   //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//   //       console.log("write product error", err);
//   //     });
//   //   }else {

//   //     this.id = Math.random().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), (err) => {
//   //         console.log("write product error", err);
//   //       });
//   //   }
//   //   });

//   //   // fs.readFile(p, (err, fileContent) => {
//   //   //   let products = [];
//   //   //   if (!err) {
//   //   //     products = JSON.parse(fileContent.toString());
//   //   //   }
//   //   //   products.push(this);
//   //   //   fs.writeFile(p, JSON.stringify(products), (err) => {
//   //   //     console.log("write product error", err);
//   //   //   });
//   //   // });
//   // }

//   // static deleteById (id: string, cb: Function) {
//   //   console.log('delete')
//   //   getProductsFromFile((products: ProductInterface[]) => {
//   //     const updatedProduct = products.filter(prod => prod?.id !== id);
//   //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//   //       console.log("write product error", err);
//   //       if (!err) {
//   //         Cart.deleteProduct(id);
//   //         cb()
//   //       }
//   //     });
//   //   });
//   // }

//   // static fetchAll(cb: Function) {
//   //   getProductsFromFile(cb);
//   // }

//   // static findById(id: string, cb: Function ) {
//   //   getProductsFromFile((products: Product[]) => {
//   //     const product = products.find(p => p?.id === id);
//   //     cb(product)
//   //   })
//   // }
// }

// export default Product;

// import { DataType, Model } from "sequelize-typescript";
// import { Optional } from "sequelize";
// import sequelize from "../util/database";

import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  ModelDefined,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from "sequelize";

// import {
//   Table,
//   Column,
//   Model,
//   CreatedAt,
//   UpdatedAt,
//   PrimaryKey,
//   DataTypes,
// } from "sequelize-typescript";
// import {
//   CreationOptional,
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
// } from "sequelize/types";
import sequelize from "../util/database";

// @Table({
//   timestamps: true,
// })
// class Product extends Model<ProductInterface> {
//   @PrimaryKey
//   @Column
//   id!: number;

//   @Column
//   title!: string;

//   @Column
//   price!: number;

//   @Column
//   imageUrl!: string;

//   @Column
//   description!: string;

//   @CreatedAt
//   @Column
//   createdAt!: Date;

//   @UpdatedAt
//   @Column
//   updatedAt!: Date;
// }

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare price: number;
  declare imageUrl: string;
  declare description: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "products" }
);

// const Product = sequelize.define("product", {
//   id: {
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: DataType.STRING,
//   price: {
//     type: DataType.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: DataType.STRING,
//     allowNull: false,
//   },
//   description: { type: DataType.STRING, allowNull: false },
// });

// class Product
//   extends Model<ProductAttributes, ProductAttributes>
//   implements ProductAttributes
// {
//   public id!: number;
//   public title!: string;
//   public price!: number;
//   public imageUrl!: string;
//   public description!: string;

//   // timestamps!
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Product.init(
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     title: DataType.STRING,
//     price: {
//       type: DataType.DOUBLE,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: DataType.STRING,
//       allowNull: false,
//     },
//     description: { type: DataType.STRING, allowNull: false },
//   },
//   {
//     timestamps: true,
//     sequelize: sequelize,
//     paranoid: true,
//     tableName: "products",
//   }
// );
// export interface ProductAttributes {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
//   description: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

(async () => {
  await sequelize.sync();
})();

export default Product;
