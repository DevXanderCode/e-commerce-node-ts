// import { Request as ExpressRequest } from "express";
import session from "express-session";
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
      isLoggedIn?: Boolean;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    isLoggedIn?: Boolean;
    user?: typeof User & { _id: string };
  }
}

export interface UserRequest extends Request {
  // user?: {
  //   name?: string;
  //   email?: string;
  // };
  [key: string]: any;
}
