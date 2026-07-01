
import { Request} from "express";

export interface AuthenticatedAccountRequest extends Request {
  user?: {
    id: number;
    username:string
    role: string
  };
}

export interface AuthenticatedAccountRequest extends Request {
  account?: {
    id: number;
    name:string
    surname: string,
    email:string
  };
}