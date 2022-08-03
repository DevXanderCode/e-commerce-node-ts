import path from "path";
import fs from "fs";

import rootDir from "../util/path";
// import { Product as ProductInterface } from "../types";

// const products: ProductInterface[] = [];

class Product {
  title: string;
  constructor(t: string) {
    this.title = t;
  }

  save() {
    // products.push(this);
    const p = path.join(rootDir, "..", "data", "products.json");
    // console.log("console log path", p);

    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent.toString());
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("write product error", err);
      });
    });
  }

  static fetchAll() {
    return [];
    // return products;
  }
}

export default Product;
