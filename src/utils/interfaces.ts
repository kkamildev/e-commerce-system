
import { Request} from "express";

export interface AuthenticatedUserRequest extends Request {
  user?: {
    id: number;
    username:string
    role: string
  };
}

export interface AuthenticatedAccountRequest extends Request {
  account?: {
    id: string;
    name:string
    surname: string,
    email:string
  };
}