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
  // id!: string;
  
  constructor(public id: string, public title:string, public imageUrl: string, public description: string, public price: number) {
  }

  save() {
    // products.push(this);
    // console.log("console log path", p);

    getProductsFromFile((products: ProductInterface[]) => {

    if (this.id){
      const existingProductIndex = products.findIndex(prod => prod?.id === this.id);
      const updatedProduct = [...products];
      updatedProduct[existingProductIndex] = this;
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        console.log("write product error", err);
      });
    }else {

      this.id = Math.random().toString(); 
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
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

  static deleteById (id: string, cb: Function) {
    console.log('delete')
    getProductsFromFile((products: ProductInterface[]) => {
      const updatedProduct = products.filter(prod => prod?.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        console.log("write product error", err);
        if (!err) {
          cb()
        }
      });
    });
  }


  static fetchAll(cb: Function) {
    getProductsFromFile(cb);
  }

  static findById(id: string, cb: Function ) {
    getProductsFromFile((products: Product[]) => {
      const product = products.find(p => p?.id === id);
      cb(product)
    })
  }
}

export default Product;
