import { Request } from "express";

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRequest extends Request {
  [key: string]: any;
}
