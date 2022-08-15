import path from "path";
import fs from "fs";

import rootDir from "../util/path";
import { Product as ProductInterface } from "../types";

// const products: ProductInterface[] = [];

const p = path.join(rootDir, "..", "data", "products.json");

const getProductsFromFile = (cb: Function) => {
  fs.readFile(p, (err, fileContent) => {
    // console.log("read File", fileContent, fileContent.length);
    if (err) {
      cb([]);
    } else if (fileContent?.length > 0) {
      cb(JSON.parse(fileContent?.toString()));
    } else {
      cb([]);
    }
  });
};

class Product {
  id!: string;
  
  constructor(public title:string, public imageUrl: string, public description: string, public price: number) {
  }

  save() {
    // products.push(this);
    // console.log("console log path", p);
    this.id = Math.random().toString(); 
    getProductsFromFile((products: ProductInterface[]) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
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

  static fetchAll(cb: Function) {
    getProductsFromFile(cb);
  }
}

export default Product;
