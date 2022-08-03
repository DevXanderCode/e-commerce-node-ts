import { Product as ProductInterface } from "../types";

const products: ProductInterface[] = [];

class Product {
  title: string;
  constructor(t: string) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}

export default Product;
