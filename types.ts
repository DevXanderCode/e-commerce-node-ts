// import { Request } from "express";
import { User } from "./models";

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: User & { _id: string };
    }
  }
}

export interface UserRequest extends Request {
  // user?: {
  //   name?: string;
  //   email?: string;
  // };
  [key: string]: any;
}
